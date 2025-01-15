import { getSearch } from "@/lib/search-service";
import { CardSkeleton, Card } from "./card";
import { LessonsPagination } from "./pagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LessonsProps {
  search: {
    term?: string;
    tags?: string[];
    levels?: string[];
    sources?: string[];
    page?: number;
  };
  data: any[];
  total: number;
}

export const Lessons = ({ search, data, total }: LessonsProps) => {
  if (data.length === 0) {
    return (
      <div>
        <p className="text-muted-foreground text-sm mb-4">
          No results found. Try searching for something else.
        </p>

        <Button asChild variant={'ghost'}>
          <Link href={'/'}>
            Clear filters
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="mb-10 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
        {data.map((result) => (
          <Card data={result} key={result.id} />
        ))}
      </div>

      {
        total > 1 && <LessonsPagination currentPage={search.page} totalPages={total} />
      }
    </div>
  );
};

export const LessonsSkeleton = () => {
  return (
    <div className="mb-10 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};
