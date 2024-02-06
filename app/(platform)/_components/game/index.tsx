"use client";

import { Question, Option } from "@prisma/client";
import ChooseOne from "../choose-one";
import { useState } from "react";
import Finish from "../finish";
import { Progress } from "@/components/ui/progress";

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
        <>
          <Progress value={questionNumber * 100 / questions.length} className="w-full !h-1 mb-2 !border-none opacity-40" />
          <ChooseOne
            next={next}
            title={question.title}
            options={question.options}
          />
        </>
      ) : (
        <Finish />
      )}
    </>
  );
};
