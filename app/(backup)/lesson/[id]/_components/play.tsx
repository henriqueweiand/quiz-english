import { Game } from "@/app/(platform)/_components/game";
import { Question, Option } from "@prisma/client";

interface QuestionWithOptions extends Question {
  options: Option[];
}

interface PlayProps {
  questions: QuestionWithOptions[];
}

export const Play = ({ questions }: PlayProps) => {
  return <Game questions={questions} />;;
};
