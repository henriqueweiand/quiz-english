import { Suspense } from "react";
import { Lesson, LessonSkeleton } from "./_components/lesson";
import { getLesson, getAllLessonIds } from "@/lib/get-lesson";
import { sanitizeURL } from "@/lib/utils";

interface LessonPageProps {
  params: { id: string[] };
  searchParams?: {
    tab?: string;
  };
}

export async function generateMetadata({ params }: LessonPageProps) {
  const mappedParams = {
    id: params.id[0]
  }

  const lesson = await getLesson(mappedParams.id);
  let keywords = lesson.tags.map(tag => tag.tag.name);
  const lessonURL = `https://quiz-english.com/lesson/${params.id}/${sanitizeURL(lesson.title)}`;

  return {
    metadataBase: new URL(`${lessonURL}`),
    alternates: {
      canonical: lessonURL,
    },
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
      "trivia",
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

export async function generateStaticParams() {
  const paths = await getAllLessonIds();

  return paths.map((id: string) => ({
    id: [id]
  }));
}

const LessonPage = async ({ params, searchParams }: LessonPageProps) => {
  const mappedParams = {
    id: params.id[0]
  }

  return (
    <main className="bg-white dark:bg-black">
      <Suspense fallback={<LessonSkeleton />}>
        <Lesson params={mappedParams} />
      </Suspense>
    </main>
  );
};

export default LessonPage;
