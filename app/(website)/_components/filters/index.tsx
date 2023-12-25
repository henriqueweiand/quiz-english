import { getTags } from "@/lib/get-tags";
import { Search } from "./search";
import { Tags } from "./tags";

interface FiltersProps {
  search?: {
    term?: string;
    tags?: string[];
  };
}

export const Filters = async ({ search }: FiltersProps) => {
  const tags = await getTags();

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-2md font-bold">Filters</h3>
      <Search term={search?.term} />

      <div className="flex gap-2 flex-wrap">
        <Tags data={tags} terms={search?.tags} />
      </div>
    </div>
  );
};
