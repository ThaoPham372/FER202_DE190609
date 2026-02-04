import React from 'react';
import { Container } from 'react-bootstrap';
import Quiz from '../components/Quiz';
import { QuizProvider } from '../context/QuizContext';

function QuizPage() {
  return (
    <Container className="py-3">
      <QuizProvider>
        <Quiz />
      </QuizProvider>
    </Container>
  );
}

export default QuizPage;

