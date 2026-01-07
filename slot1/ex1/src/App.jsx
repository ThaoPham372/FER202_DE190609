import { useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';

function App() {
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React</h1>
      <div className="card">
        <p>Hello! This is my first React app.</p>
      </div>
      <p className="read-the-docs">My name is Thao Pham</p>
    </>
  );
}

export default App;
