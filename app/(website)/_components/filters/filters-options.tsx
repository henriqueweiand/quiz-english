import { getTags } from "@/lib/get-tags";
import { Tags } from "./tags";
import { DifficultyLevel, SourceTypes } from "@prisma/client";
import { Sources } from "./sources";
import { DifficultLevels } from "./difficult-levels";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

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
      <form className="space-y-10">
        <fieldset>
          <legend className="block text-md text-muted-foreground">
            Tags
          </legend>
          <div className="space-y-3 pt-6">
            <div className="flex gap-2 flex-wrap">
              <Tags data={tags} terms={search?.tags} />
            </div>
          </div>
        </fieldset>

        <Separator />

        <div>
          <fieldset>
            <legend className="block text-md text-muted-foreground">
              Sources
            </legend>
            <div className="space-y-3 pt-6">
              <div className="flex gap-2 flex-wrap">
                <Sources data={sourceTypes} sources={search?.sources} />
              </div>
            </div>
          </fieldset>
        </div>

        <Separator />

        <div>
          <fieldset>
            <legend className="block text-md text-muted-foreground">
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
    <div className="space-y-10">
      {[...Array(3)].map((_, i) => (
        <div key={i} className={""}>
          <Skeleton className="h-4 w-32" />

          <div className="space-y-3 pt-6">
            <div className="flex gap-2 flex-wrap">
              {[...Array(4)].map((_, i2) => (
                <Skeleton key={i2} className="h-4 w-10" />
              ))}
            </div>
          </div>

          <Separator className="mt-10" />
        </div>
      ))}
    </div>
  );
};