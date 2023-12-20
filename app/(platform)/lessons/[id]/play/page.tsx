import { redirect } from "next/navigation";

import { getLesson } from "@/lib/get-lesson";
import { extractQuestions } from "@/lib/lesson-service";
import { Game } from "@/app/(platform)/_components/game";

interface LessonPageProps {
  params: {
    id: string;
  };
}

const LessonPage = async ({ params }: LessonPageProps) => {
  if (!params.id) {
    redirect("/lessons");
  }

  const lesson = await getLesson(params.id);
  const questions = extractQuestions(lesson);

  return <Game questions={questions} />;
};

export default LessonPage;
