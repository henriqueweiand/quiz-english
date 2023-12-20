import { getQuestions } from "@/lib/get-questions";
import { Game } from "./_components/game";

interface AppPageProps {
  params: {};
}

const AppPage = async ({ params }: AppPageProps) => {
  const questions = await getQuestions();

  return <Game questions={questions} />;
};

export default AppPage;
