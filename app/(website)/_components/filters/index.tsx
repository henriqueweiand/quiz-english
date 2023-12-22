import { Tags } from "./tags";
import { Search } from "./search";
import { getTags } from "@/lib/get-tags";

interface FiltersProps {
  search?: {
    term?: string;
    tags?: string[];
  };
}

export const Filters = async ({ search }: FiltersProps) => {
  const tags = await getTags();

  return (
    <div className="w-full">
      <h3>Filters</h3>
      <Search term={search?.term} />
      <Tags data={tags} terms={search?.tags} />
    </div>
  );
};
