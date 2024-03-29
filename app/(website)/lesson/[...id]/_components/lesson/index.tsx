import { Badge } from "@/components/ui/badge";
import { getLesson } from "@/lib/get-lesson";
import { extractQuestions } from "@/lib/lesson-service";
import { Suspense } from "react";
import { Embed } from "../embed";
import { Details } from "./details";
import { Header } from "./header";
import { Nav } from "./nav";
import { Play } from "./play";
import { RelatedLessons } from "./related-lessons";
import { Title } from "./title";
import { Skeleton } from "@/components/ui/skeleton";
import { SourceTypes } from "@prisma/client";
import { SpotifyEmbed } from "../spotify-embed";
import { YoutubeEmbed } from "../spotify-embed copy";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BadgeWithLink } from "@/app/(website)/_components/badge-with-link";

interface LessonPageProps {
  params: { id: string };
}

export const Lesson = async ({ params }: LessonPageProps) => {
  const lesson = await getLesson(params.id);

  return (
    <>
      <div>
        <div className="dark:bg-black mx-auto max-w-2xl px-4 pb-12 pt-5 sm:px-6 sm:pb-22 sm:pt-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
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
            {!!lesson.source.length && (
              <>
                <Button size={'sm'} className="p-0 m-0" variant={'link'}>
                  <Link href={`https://forms.gle/rj7kUYrX5Y7Hxn1b9`} target="_blank">Share a feedback</Link>
                </Button>
                <div className="text-muted-foreground h pb-2">
                  Lesson material
                </div>
                <section
                  aria-labelledby="options-heading"
                  className="flex flex-row gap-2"
                >
                  {lesson.source.map((source) => (
                    <BadgeWithLink
                      target="_blank"
                      href={source.url}
                      active={false}
                      key={source.id}
                      name={!!source.title ? source.title : source.type}
                    />
                  ))}
                </section>
              </>
            )}

            {!!lesson.source.length && (
              <>
                <section className="flex flex-row gap-2 mt-2">
                  <>
                    {lesson.source.map((source) => {
                      if (source.type === SourceTypes.Podcast && !!source.url) {
                        return (
                          <SpotifyEmbed key={source.id} url={source.url} />
                        );
                      }
                      if (source.type === SourceTypes.Video && !!source.url) {
                        return (
                          <YoutubeEmbed key={source.id} url={source.url} />
                        );
                      }
                    })}
                  </>
                </section>
              </>
            )}
          </div>
        </div>
      </div>

      {!!lesson.explanation && (
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-22 lg:max-w-7xl lg:px-8">
          <Details data={lesson.explanation} />
        </div>
      )}

      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-22 lg:max-w-7xl lg:px-8">
        <h3 className="text-lg font-medium mb-4">Related lessons</h3>

        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          <Suspense fallback={<>Loading</>}>
            <RelatedLessons lessonId={params.id} />
          </Suspense>
        </div>
      </div>

      <div className="">
        <div className=" mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-22 lg:max-w-7xl lg:px-8">
          <Embed lessonId={params.id} />
        </div>
      </div>
    </>
  );
};

export const LessonSkeleton = () => {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pb-12 pt-5 sm:px-6 sm:pb-22 sm:pt-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:max-w-lg lg:self-end">
            <Nav />

            <div className="mt-4">
              <Skeleton className="h-8 w-full" />
            </div>

            <Header
              description={
                <div className="gap-2 flex flex-col pt-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              }
            >
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-4 w-10" />
            </Header>
          </div>

          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
              <div className="flex flex-col gap-4">
                <Skeleton className="h-6 w-full" />

                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-22 lg:max-w-7xl lg:px-8">
        <div className="gap-2 flex flex-col pt-4">
          <div className="items-center flex justify-center mb-4">
            <Skeleton className="h-8 w-60" />
          </div>
          {[...Array(6)].map((_, i2) => (
            <Skeleton key={i2} className="h-4 w-full" />
          ))}
        </div>
      </div>
    </>
  );
};
