import { Skeleton } from "@/components/ui/skeleton";
import { getSearch } from "@/lib/search-service";
import { CardSkeleton, Card } from "./card";

interface LessonsProps {
  search: {
    term?: string;
    tags?: string[];
    levels?: string[];
    sources?: string[];
  };
}

export const Lessons = async ({ search }: LessonsProps) => {
  // const { term } = search;
  const data = await getSearch(search);

  if (data.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        No results found. Try searching for something else
      </p>
    );
  }

  return (
    <>
      {data.map((result) => (
        <Card data={result} key={result.id} />
      ))}
    </>
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
