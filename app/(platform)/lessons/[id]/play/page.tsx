import { redirect } from "next/navigation";

import { getLesson } from "@/lib/get-lesson";
import { extractQuestions } from "@/lib/lesson-service";
import { Game } from "@/app/(platform)/_components/game";

interface PlayPageProps {
  params: {
    id: string;
  };
}

const PlayPage = async ({ params }: PlayPageProps) => {
  if (!params.id) {
    redirect("/lessons");
  }

  const lesson = await getLesson(params.id);
  const questions = extractQuestions(lesson);

  return <Game questions={questions} />;
};

export default PlayPage;
