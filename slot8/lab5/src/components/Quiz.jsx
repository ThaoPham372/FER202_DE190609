import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useQuiz } from '../context/QuizContext';
import { quizData } from '../data/quizData';

function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(quizData[0]);
  const { selectedAnswer, setSelectedAnswer } = useQuiz();

  // hiển thị câu hỏi hiện tại mỗi khi currentIndex thay đổi
  useEffect(() => {
    setCurrentQuestion(quizData[currentIndex]);
    setSelectedAnswer(null);
  }, [currentIndex, setSelectedAnswer]);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex === quizData.length - 1) {
      setCompleted(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (completed) {
    return (
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="text-danger mb-3">Quiz Completed!</h2>
          <p className="mb-0">
            Your score: <strong>{score}</strong>
          </p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h3 className="text-danger mb-3">Question {currentIndex + 1}</h3>
        <p className="fw-semibold mb-3">{currentQuestion.question}</p>

        <Form>
          {currentQuestion.answers.map((ans) => (
            <Form.Check
              key={ans}
              type="radio"
              name="quiz-answer"
              className="mb-2"
              label={ans}
              checked={selectedAnswer === ans}
              onChange={() => handleSelectAnswer(ans)}
            />
          ))}
        </Form>

        <div className="mt-3">
          <Button onClick={handleNext} disabled={!selectedAnswer}>
            {currentIndex === quizData.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Quiz;

