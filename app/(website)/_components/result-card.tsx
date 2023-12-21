import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";
import { ThumbnailSkeleton } from "@/components/thumbnail";

interface ResultCardProps {
  data: {
    title: string;
    id: string;
  };
}

export const ResultCard = ({ data }: ResultCardProps) => {
  return (
    <Link href={`/lessons/${data.id}`}>
      <div className="w-full flex gap-x-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{data.title}</p>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="w-full flex gap-x-4">
      <div className="relative h-[9rem] w-[16rem]">
        <ThumbnailSkeleton />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
};
