import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card as CardComponent,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Lesson, LessonQuestion, LessonTag, Tag } from "@prisma/client";

interface CardProps {
  data: Lesson & {
    questions: LessonQuestion[];
    tags?: (LessonTag & { tag: Tag })[];
  };
}

export const Card = ({ data }: CardProps) => {
  return (
    <Link href={`/lesson/${data.id}`}>
      <CardComponent className="hover:shadow-md hover:shadow-black-100">
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          {data.questions && (
            <CardDescription>
              {data?.questions.length} Questions
            </CardDescription>
          )}
        </CardHeader>
        {data.tags && (
          <CardContent className="gap-1 flex justify-items-start flex-wrap">
            {data.tags.map((tag) => (
              <Badge variant={"secondary"} key={tag.id}>
                {tag.tag.name}
              </Badge>
            ))}
          </CardContent>
        )}
      </CardComponent>
    </Link>
  );
};

export const CardSkeleton = () => {
  return (
    <CardComponent>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-8 w-full" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-32" />
        </CardDescription>
      </CardHeader>

      <CardContent className="gap-2 flex flex-row">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-4 w-10" />
      </CardContent>
    </CardComponent>
  );
};
