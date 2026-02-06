// Simple API client with detailed error handling

const BASE_URL = 'https://jsonplaceholder.typicode.com';

async function request(path) {
  try {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      throw new Error('No internet connection. Please check your Wi‑Fi / network.');
    }

    const response = await fetch(`${BASE_URL}${path}`);
    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `Request failed with status ${response.status} ${response.statusText}: ${text || 'No body'}`
      );
    }
    return await response.json();
  } catch (err) {
    // Re-throw with a clear message, do not swallow
    throw new Error(`Network error while calling ${path}: ${err.message}`);
  }
}

export async function fetchUsers() {
  return request('/users');
}

export async function fetchPosts() {
  return request('/posts');
}

