import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './App.css';
import CounterComponent from './components/CounterComponent';
import ExerciseNavBar from './components/ExerciseNavBar';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [activeExercise, setActiveExercise] = useState('ex1');

  return (
    <ThemeProvider>
      <AuthProvider>
        <div style={{ minHeight: '100vh', padding: '24px', transition: 'all 0.3s ease' }}>
          <ExerciseNavBar activeKey={activeExercise} onChange={setActiveExercise} />

          {activeExercise === 'ex1' && (
            <>
              <CounterComponent />
              <LightSwitch />
            </>
          )}

          {activeExercise === 'ex2' && <LoginForm />}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
