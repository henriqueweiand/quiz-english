"use client";

import { Question, Option } from "@prisma/client";
import ChooseOne from "../choose-one";
import { useState } from "react";

interface QuestionWithOptions extends Question {
  options: Option[];
}

interface GameProps {
  questions: QuestionWithOptions[];
}

export const Game = ({ questions }: GameProps) => {
  const [questionNumber, setQuestionNumber] = useState(0);

  const next = () => {
    setQuestionNumber(questionNumber + 1);
  };

  const question = questions[questionNumber];

  return (
    <>
      {questionNumber < questions.length ? (
        <ChooseOne
          next={next}
          title={question.title}
          options={question.options}
        />
      ) : (
        <>Finish</>
      )}
    </>
  );
};
