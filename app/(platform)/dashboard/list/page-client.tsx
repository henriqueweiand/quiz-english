import { Lesson } from "@prisma/client";

interface ListPageProps {
  lessons?: Lesson[];
}

export const ListPage = ({ lessons }: ListPageProps) => {
  return <div>{JSON.stringify(lessons)}</div>;
};
