import { getTags } from "@/lib/get-tags";
import { Tags } from "./tags";
import { DifficultyLevel, SourceTypes } from "@prisma/client";
import { Sources } from "./sources";
import { DifficultLevels } from "./difficult-levels";
import { Skeleton } from "@/components/ui/skeleton";

interface FiltersOptionsProps {
  search?: {
    term?: string;
    tags?: string[];
    sources?: string[];
    levels?: string[];
  };
}

export const FiltersOptions = async ({ search }: FiltersOptionsProps) => {
  const tags = await getTags();

  const difficultyLevels: string[] = Object.values(DifficultyLevel);
  const sourceTypes: string[] = Object.values(SourceTypes);

  return (
    <>
      <form className="space-y-10 divide-y divide-gray-200">
        <fieldset>
          <legend className="block text-sm font-medium text-gray-900">
            Tags
          </legend>
          <div className="space-y-3 pt-6">
            <div className="flex gap-2 flex-wrap">
              <Tags data={tags} terms={search?.tags} />
            </div>
          </div>
        </fieldset>

        <div className={"pt-5"}>
          <fieldset>
            <legend className="block text-sm font-medium text-gray-900">
              Sources
            </legend>
            <div className="space-y-3 pt-6">
              <div className="flex gap-2 flex-wrap">
                <Sources data={sourceTypes} sources={search?.sources} />
              </div>
            </div>
          </fieldset>
        </div>

        <div className={"pt-5"}>
          <fieldset>
            <legend className="block text-sm font-medium text-gray-900">
              Difficult Levels
            </legend>
            <div className="space-y-3 pt-6">
              <div className="flex gap-2 flex-wrap">
                <DifficultLevels
                  data={difficultyLevels}
                  levels={search?.levels}
                />
              </div>
            </div>
          </fieldset>
        </div>
      </form>
    </>
  );
};

export const FiltersOptionsSkeleton = () => {
  return (
    <div className="space-y-10 divide-y divide-gray-200">
      {[...Array(3)].map((_, i) => (
        <div key={i} className={"pt-5"}>
          <Skeleton className="h-4 w-32" />

          <div className="space-y-3 pt-6">
            <div className="flex gap-2 flex-wrap">
              {[...Array(4)].map((_, i2) => (
                <Skeleton key={i2} className="h-4 w-10" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};