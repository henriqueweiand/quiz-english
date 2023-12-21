import Link from "next/link";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultCardProps {
  data: {
    title: string;
    id: string;
  };
}

export const ResultCard = ({ data }: ResultCardProps) => {
  return (
    <Link href={`/lessons/${data.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          {/* <CardDescription>
            <Badge variant="outline">Prepositions</Badge>
            <Badge variant="outline">Time</Badge>
          </CardDescription> */}
        </CardHeader>
      </Card>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="w-full flex">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
};
