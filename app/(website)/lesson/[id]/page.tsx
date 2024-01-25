import { Suspense } from "react";
import { Lesson, LessonSkeleton } from "./_components/lesson";
import type { Metadata } from "next";
import { getLesson } from "@/lib/get-lesson";

interface LessonPageProps {
  params: { id: string };
  searchParams?: {
    tab?: string;
  };
}

export async function generateMetadata({ params }: LessonPageProps) {
  const lesson = await getLesson(params.id);
  let keywords = lesson.tags.map(tag => tag.tag.name);

  return {
    metadataBase: new URL(`https://quiz-english.com/lesson/${params.id}`),
    title: `Quiz-English: ${lesson.title}`,
    description: lesson.description,
    openGraph: {
      title: `Quiz-English: ${lesson.title}`,
      description: lesson.description,
    },
    twitter: {
      title: `Quiz-English: ${lesson.title}`,
      description: lesson.description,
    },
    keywords: keywords.concat([
      "quiz",
      "english",
      "study",
      "learners",
      "language",
      "podcasts",
      "videos",
      "articles",
      "quizzes",
    ]),
  }
}

const LessonPage = ({ params, searchParams }: LessonPageProps) => {
  return (
    <main className="bg-white dark:bg-black">
      <Suspense fallback={<LessonSkeleton />}>
        <Lesson params={params} />
      </Suspense>
    </main>
  );
};

export default LessonPage;
