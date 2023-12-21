import { Game } from "@/app/(platform)/_components/game";
import { getQuestions } from "@/lib/get-questions";

interface GamePageProps {
  // params: {};
}

const GamePage = async ({}: GamePageProps) => {
  const questions = await getQuestions();

  return <Game questions={questions} />;
};

export default GamePage;
