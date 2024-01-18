import { Lesson } from "@prisma/client";
import { DataTable } from "@platform/dashboard/list/_components/table/data-table";
import { columns } from "@platform/dashboard/list/_components/table/columns";

interface ListPageProps {
  lessons: Lesson[];
}

export const ListPage = async ({ lessons }: ListPageProps) => {
  return <DataTable columns={columns} data={lessons} />;
};
