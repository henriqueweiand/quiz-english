import { Skeleton } from "@/components/ui/skeleton";
import { getSearch } from "@/lib/search-service";
import { Card, CardSkeleton } from "./card";

interface LessonsProps {
  search: {
    term?: string;
    tags?: string[];
  };
}

export const Lessons = async ({ search }: LessonsProps) => {
  const { term } = search;
  const data = await getSearch(search);

  return (
    <div className="h-full w-full">
      <div>
        {term && (
          <h2 className="text-lg font-semibold mb-4">
            Results for term &quot;{term}&quot;
          </h2>
        )}

        {data.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No results found. Try searching for something else
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4">
          {data.map((result) => (
            <Card data={result} key={result.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const LessonsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="flex flex-col gap-y-4">
        {[...Array(2)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
