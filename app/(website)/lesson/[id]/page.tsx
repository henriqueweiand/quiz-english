import { Suspense } from "react";
import { Lesson } from "./_components/lesson";

interface LessonPageProps {
  params: { id: string };
  searchParams?: {
    tab?: string;
  };
}

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
