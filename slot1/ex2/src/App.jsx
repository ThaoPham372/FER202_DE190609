import { useState } from 'react';
import './App.css';
import reactLogo from './assets/23.jpg';


function App() {
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hi Guys !!!</h1>
      <div className="card">
        <p>This is my second React app.</p>
      </div>
      <p className="read-the-docs">
        My name is Thao Pham. Nice to meet you all.
      </p>
    </>
  );
}

export default App;
