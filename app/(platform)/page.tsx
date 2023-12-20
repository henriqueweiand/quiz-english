import { getQuestions } from "@/lib/get-questions";
import ChooseOne from "./_components/choose-one";

interface AppPageProps {
  params: {};
}

const AppPage = async ({ params }: AppPageProps) => {
  const questions = await getQuestions();
  const question = questions[0];

  const next = () => {
    console.log("next");
  };

  return <ChooseOne title={question.title} options={question.options} />;
};

export default AppPage;
