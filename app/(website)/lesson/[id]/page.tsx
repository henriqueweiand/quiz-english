import { Suspense } from "react";
import { Content } from "./_components/content";
import { Options } from "./_components/options";
import { Play } from "./_components/play";
import { getLesson } from "@/lib/get-lesson";
import { Embed } from "./_components/embed";
import { extractQuestions } from "@/lib/lesson-service";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Tab = "embed" | "play";

interface LessonPageProps {
  params: { id: string };
  searchParams?: {
    tab?: string;
  };
}

const LessonPage = async ({ params, searchParams }: LessonPageProps) => {
  const lesson = await getLesson(params.id);
  const tabOpen = searchParams?.tab as Tab;
  const isTabOpen = !!tabOpen;

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  return (
    <main className="w-full min-h-screen p-4 bg-[#57c2eb] overflow-hidden">
      <div className="bg-white md:w-4/5 lg:w-3/5 mx-auto border rounded-3xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="flex-col justify-center items-center gap-2">
            <Link href={'/'}>
              <Button variant={'link'} size={'sm'} className="ml-0 pl-0">Return to the list</Button>
            </Link>
            <h1 className="text-4xl font-bold">
              {lesson.title}
            </h1>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Options params={params} />
          </div>
        </div>

        {isTabOpen ? (
          <Suspense fallback={<>Loading</>}>
            {tabOpen == "embed" ? <Embed lessonId={params.id} /> : <Play questions={extractQuestions(lesson)} />}
          </Suspense>
        ) : (
          <div className="text-lg leading-relaxed text-gray-700">
            <Content description={lesson.description} />
          </div>
        )}
      </div>
    </main>
  );
};

export default LessonPage;
