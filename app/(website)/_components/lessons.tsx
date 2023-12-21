import { Suspense } from "react";
import { ResultsSkeleton, Results } from "./results";

interface LessonsProps {
  search?: string;
}

export const Lessons = ({ search }: LessonsProps) => {
  return (
    <div className="h-full w-full">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={search} />
      </Suspense>
    </div>
  );
};
