import { getTags } from "@/lib/get-tags";
import { Search } from "./search";
import { Tags } from "./tags";
import { DifficultLevels } from "./difficult-levels";
import { DifficultyLevel, SourceTypes } from "@prisma/client";
import { Sources } from "./sources";

interface FiltersProps {
  search?: {
    term?: string;
    tags?: string[];
    sources?: string[];
    level?: string;
  };
}

export const Filters = async ({ search }: FiltersProps) => {
  const tags = await getTags();

  const difficultyLevels: string[] = Object.values(DifficultyLevel);
  const sourceTypes: string[] = Object.values(SourceTypes);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-2md font-bold">Filters</h3>
      <Search term={search?.term} />

      <div className="flex gap-2 flex-wrap">
        <Tags data={tags} terms={search?.tags} />
      </div>

      <h3 className="text-2md font-bold">Source</h3>
      <div className="flex gap-2 flex-wrap">
        <Sources data={sourceTypes} sources={search?.sources} />
      </div>

      <h3 className="text-2md font-bold">Level</h3>
      <div className="flex gap-2 flex-wrap">
        <DifficultLevels data={difficultyLevels} level={search?.level} />
      </div>
    </div>
  );
};
