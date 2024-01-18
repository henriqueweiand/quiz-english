import { Lesson } from "@prisma/client";
import { DataTable } from "./_components/table/data-table";
import { columns } from "./_components/table/columns";

interface ListPageProps {
  lessons: Lesson[];
}

export const ListPage = async ({ lessons }: ListPageProps) => {
  return <DataTable columns={columns} data={lessons} />;
};
