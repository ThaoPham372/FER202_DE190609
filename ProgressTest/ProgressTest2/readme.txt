Project Name: fer202-02 (ProgressTest2)
Subject Code: FER202 - FALL 2025

Installed packages:
- react
- react-dom
- react-router-dom
- react-bootstrap
- bootstrap
- axios
- json-server (dev dependency or global to run backend)

How to run:
1. Run JSON server in one terminal:
   npx json-server db.json --port 3001

2. Run the React application in another terminal:
   npm install
   npm run dev

Note: 
- Using React Router for navigation
- Using useContext combined with useReducer for Global State Management (ExpenseContext.js)
- Using Axios for calling Mock APIs from json-server
- Styled via React-Bootstrap.
