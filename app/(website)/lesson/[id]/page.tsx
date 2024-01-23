import { Suspense } from "react";
import { Lesson } from "./_components/lesson";
import type { Metadata } from "next";

interface LessonPageProps {
  params: { id: string };
  searchParams?: {
    tab?: string;
  };
}

export const metadata: Metadata = {
  title: "Quiz-English: Lesson",
  description: "",
  keywords: [
    "quiz",
    "english",
    "study",
    "learners",
    "language",
    "podcasts",
    "videos",
    "articles",
    "quizzes",
  ],
};

const LessonPage = ({ params, searchParams }: LessonPageProps) => {
  return (
    <div className="bg-gray-50">
      <main>
        <Suspense fallback={<>Loading</>}>
          <Lesson params={params} />
        </Suspense>
      </main>
    </div>
  );
};

export default LessonPage;
