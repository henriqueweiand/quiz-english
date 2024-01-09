import { Suspense } from "react";
import { Content } from "./_components/content";
import { Options } from "./_components/options";
import { Play } from "./_components/play";
import { getLesson } from "@/lib/get-lesson";
import { Embed } from "./_components/embed";
import { extractQuestions } from "@/lib/lesson-service";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BadgeWithLink } from "../../_components/badge-with-link";
import { Explanation } from "./_components/explanation";
import { Source as SourceDomain } from "@prisma/client";
import { Source } from "./_components/source";
import { RelatedLessons } from "./_components/related-lessons";

type Tab = "embed" | "play" | "explanation" | "related";

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

  function renderTabContent(tabOpen: Tab, params: { id: string }, lesson: any) {
    const sourceElement = (
      <div className="mt-4">
        {
          !!lesson.source.length && (
            <>
              <h3 className="font-bold">Sources</h3>
              {
                lesson.source.map((source: SourceDomain) => <Source key={source.id} title={source?.title} url={source.url} type={source.type} />)
              }
            </>
          )
        }
      </div>
    );

    switch (tabOpen) {
      case 'related':
        return (
          <>
            <RelatedLessons lessonId={params.id} />
          </>
        );
      case 'embed':
        return (
          <>
            <Embed lessonId={params.id} />
            {sourceElement}
          </>
        );
      case 'play':
        return <Play questions={extractQuestions(lesson)} />;
      case 'explanation':
        return (
          <>
            <Explanation content={lesson.explanation} />
            {sourceElement}
          </>
        );
    }
  }

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  return (
    <main className="w-full min-h-screen p-4 bg-[#57c2eb] overflow-hidden">
      <div className="bg-white md:w-4/5 lg:w-3/5 mx-auto border rounded-3xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between mb-2">
          <div className="flex-col justify-center items-center gap-2">
            <Link href={'/'}>
              <Button variant={'link'} size={'sm'} className="ml-0 pl-0">Return to the list</Button>
            </Link>
            <h1 className="text-4xl font-bold">
              {lesson.title}
            </h1>
            <div className="flex flex-wrap gap-2 mt-4">
              {
                lesson.tags.length && (
                  <>
                    {
                      lesson.tags.map(tag => <Badge variant={'outline'} key={tag.id}>{tag.tag.name}</Badge>)
                    }
                  </>
                )
              }
              {
                !!lesson.source.length && (
                  <>
                    {
                      lesson.source.map(source => <BadgeWithLink active={false} key={source.id} name={source.type} />)
                    }
                  </>
                )
              }
              <Badge variant={'outline'}>{lesson.questions.length} Questions</Badge>
              <Badge variant={'outline'}>Level {lesson.difficultyLevel}</Badge>
            </div>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Options params={params} />
          </div>
        </div>

        {isTabOpen ? (
          <Suspense fallback={<>Loading</>}>
            {renderTabContent(tabOpen, params, lesson)}
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
