import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { extname } from 'node:path';
import { Low } from 'lowdb';
import { DataFile, JSONFile } from 'lowdb/node';
import JSON5 from 'json5';
import chalk from 'chalk';
import { App } from '@tinyhttp/app';
import { cors } from '@tinyhttp/cors';
import { Eta } from 'eta';
import { json } from 'milliparsec';
import sirv from 'sirv';

import { parseWhere } from './node_modules/json-server/lib/parse-where.js';
import { isItem, Service } from './node_modules/json-server/lib/service.js';

const DB_FILE = 'db.json';
const PORT = Number.parseInt(process.env.PORT || '3005', 10);
const HOST = process.env.HOST || 'localhost';

if (!existsSync(DB_FILE)) {
  // create empty db file if missing
  writeFileSync(DB_FILE, '{}');
}

// Handle empty string JSON file
if (readFileSync(DB_FILE, 'utf-8').trim() === '') {
  writeFileSync(DB_FILE, '{}');
}

// Set up database
let adapter;
if (extname(DB_FILE) === '.json5') {
  adapter = new DataFile(DB_FILE, {
    parse: JSON5.parse,
    stringify: JSON5.stringify,
  });
} else {
  adapter = new JSONFile(DB_FILE);
}

const db = new Low(adapter, {});
await db.read();

// Helpers copied from json-server app (simplified)
const eta = new Eta({ views: new URL('./node_modules/json-server/views', import.meta.url).pathname });
const RESERVED_QUERY_KEYS = new Set(['_sort', '_page', '_per_page', '_embed', '_where']);

function parseListParams(req) {
  const queryString = req.url.split('?')[1] ?? '';
  const params = new URLSearchParams(queryString);
  const filterParams = new URLSearchParams();

  for (const [key, value] of params.entries()) {
    if (!RESERVED_QUERY_KEYS.has(key)) {
      filterParams.append(key, value);
    }
  }

  let where = parseWhere(filterParams.toString());
  const rawWhere = params.get('_where');
  if (typeof rawWhere === 'string') {
    try {
      const parsed = JSON.parse(rawWhere);
      if (typeof parsed === 'object' && parsed !== null) {
        where = parsed;
      }
    } catch {
      // ignore
    }
  }

  const pageRaw = params.get('_page');
  const perPageRaw = params.get('_per_page');
  const page = pageRaw === null ? undefined : Number.parseInt(pageRaw, 10);
  const perPage = perPageRaw === null ? undefined : Number.parseInt(perPageRaw, 10);

  return {
    where,
    sort: params.get('_sort') ?? undefined,
    page: Number.isNaN(page) ? undefined : page,
    perPage: Number.isNaN(perPage) ? undefined : perPage,
    embed: req.query?._embed,
  };
}

function withBody(action) {
  return async (req, res, next) => {
    const { name = '' } = req.params;
    if (isItem(req.body)) {
      res.locals.data = await action(name, req.body);
    }
    next?.();
  };
}

function withIdAndBody(action) {
  return async (req, res, next) => {
    const { name = '', id = '' } = req.params;
    if (isItem(req.body)) {
      res.locals.data = await action(name, id, req.body);
    }
    next?.();
  };
}

// Create service and app
const service = new Service(db);
const app = new App();

// Static files
app.use(sirv('public', { dev: true }));

// CORS
app.use((req, res, next) =>
  cors({
    allowedHeaders: req.headers['access-control-request-headers']
      ?.split(',')
      .map((h) => h.trim()),
  })(req, res, next)
);
app.options('*', cors());

// Body parser (IMPORTANT): increase payload limit for base64 images
app.use(
  json({
    payloadLimit: 20 * 1024 * 1024, // 20MB
  })
);

app.get('/', (_req, res) => res.send(eta.render('index.html', { data: db.data })));

app.get('/:name', (req, res, next) => {
  const { name = '' } = req.params;
  const { where, sort, page, perPage, embed } = parseListParams(req);
  res.locals.data = service.find(name, { where, sort, page, perPage, embed });
  next?.();
});

app.get('/:name/:id', (req, res, next) => {
  const { name = '', id = '' } = req.params;
  res.locals.data = service.findById(name, id, req.query);
  next?.();
});

app.post('/:name', withBody(service.create.bind(service)));
app.put('/:name', withBody(service.update.bind(service)));
app.put('/:name/:id', withIdAndBody(service.updateById.bind(service)));
app.patch('/:name', withBody(service.patch.bind(service)));
app.patch('/:name/:id', withIdAndBody(service.patchById.bind(service)));
app.delete('/:name/:id', async (req, res, next) => {
  const { name = '', id = '' } = req.params;
  res.locals.data = await service.destroyById(name, id, req.query?._dependent);
  next?.();
});

app.use('/:name', (req, res) => {
  const { data } = res.locals;
  if (data === undefined) {
    res.sendStatus(404);
  } else {
    if (req.method === 'POST') res.status(201);
    res.json(data);
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    [
      chalk.bold(`JSON Server (custom) started on PORT :${PORT}`),
      chalk.gray('Press CTRL-C to stop'),
      chalk.gray(`Watching ${DB_FILE}...`),
      '',
      chalk.bold('Endpoints:'),
      chalk.gray(`http://${HOST}:${PORT}/genres`),
      chalk.gray(`http://${HOST}:${PORT}/movies`),
    ].join('\n')
  );
});

