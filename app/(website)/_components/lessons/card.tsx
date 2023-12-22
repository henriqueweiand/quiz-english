import Link from "next/link";

import {
  Card as CardComponent,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Lesson,
  LessonQuestion,
  LessonTag,
  Question,
  Tag,
} from "@prisma/client";
import { Badge } from "@/components/ui/badge";

interface CardProps {
  data: Lesson & {
    questions: LessonQuestion[];
    tags?: (LessonTag & { tag: Tag })[];
  };
}

export const Card = ({ data }: CardProps) => {
  return (
    <Link href={`/lessons/${data.id}`}>
      <CardComponent>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          {data.questions && (
            <CardDescription>
              {data?.questions.length} Questions
            </CardDescription>
          )}
        </CardHeader>
        {data.tags && (
          <CardContent>
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
    <div className="w-full flex">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
};
