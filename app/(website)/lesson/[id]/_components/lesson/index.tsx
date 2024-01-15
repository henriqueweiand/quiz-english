import { Badge } from "@/components/ui/badge";
import { getLesson } from "@/lib/get-lesson";
import { extractQuestions } from "@/lib/lesson-service";
import { Suspense } from "react";
import { BadgeWithLink } from "../../../../_components/badge-with-link";
import { Embed } from "../embed";
import { Details } from "./details";
import { Header } from "./header";
import { Nav } from "./nav";
import { Play } from "./play";
import { RelatedLessons } from "./related-lessons";
import { Title } from "./title";

interface LessonPageProps {
  params: { id: string };
}

export const Lesson = async ({ params }: LessonPageProps) => {
  const lesson = await getLesson(params.id);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pb-12 pt-5 sm:px-6 sm:pb-22 sm:pt-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:max-w-lg lg:self-end">
            <Nav />

            <div className="mt-4">
              <Title data={lesson.title} />
            </div>

            <Header
              qtdQuestions={lesson.questions.length}
              description={lesson.description}
            >
              {lesson.tags.length && (
                <>
                  {lesson.tags.map((tag) => (
                    <Badge variant={"outline"} key={tag.id}>
                      {tag.tag.name}
                    </Badge>
                  ))}
                </>
              )}
              <Badge variant={"outline"}>Lv. {lesson.difficultyLevel}</Badge>
            </Header>
          </div>

          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
              <Play questions={extractQuestions(lesson)} />
            </div>
          </div>

          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <section
              aria-labelledby="options-heading"
              className="flex flex-col gap-2"
            >
              {!!lesson.source.length && (
                <>
                  <div className="text-gray-500 h">Lesson material</div>
                  {lesson.source.map((source) => (
                    <BadgeWithLink
                      target="_blank"
                      href={source.url}
                      active={false}
                      key={source.id}
                      name={!!source.title ? source.title : source.type}
                    />
                  ))}
                </>
              )}
            </section>
          </div>
        </div>
      </div>

      {!!lesson.explanation && (
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-22 lg:max-w-7xl lg:px-8">
          <Details data={lesson.explanation} />
        </div>
      )}

      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-22 lg:max-w-7xl lg:px-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Related lessons
        </h3>

        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          <Suspense fallback={<>Loading</>}>
            <RelatedLessons lessonId={params.id} />
          </Suspense>
        </div>
      </div>

      <div className=" bg-white">
        <div className=" mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-22 lg:max-w-7xl lg:px-8">
          <Embed lessonId={params.id} />
        </div>
      </div>
    </>
  );
};
