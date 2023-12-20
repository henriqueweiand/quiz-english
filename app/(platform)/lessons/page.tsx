import { Suspense } from "react";
import { redirect } from "next/navigation";

import { Results, ResultsSkeleton } from "./_components/results";

interface LessonsProps {
  searchParams: {
    term?: string;
  };
}

const Lessons = ({ searchParams }: LessonsProps) => {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={searchParams.term} />
      </Suspense>
    </div>
  );
};

export default Lessons;
