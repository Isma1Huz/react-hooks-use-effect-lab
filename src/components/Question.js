import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Set up a timer with setTimeout
    const timer = setTimeout(() => {
      // Decrease the time remaining by 1 second
      setTimeRemaining((prevTimeRemaining) =>
        prevTimeRemaining > 0 ? prevTimeRemaining - 1 : 0
      );
    }, 1000);

    // Clean up the timer when the component unmounts or when the question changes
    return () => {
      clearTimeout(timer);
    };
  }, [timeRemaining]); // Run the effect whenever timeRemaining changes

  useEffect(() => {
    // When timeRemaining hits 0, reset it to 10 seconds and call onAnswered(false)
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    // Reset the time remaining to 10 seconds when the answer is submitted
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
