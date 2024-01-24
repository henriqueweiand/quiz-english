import { FiltersOptions, FiltersOptionsSkeleton } from "./filters-options";
import { MobileFilters } from "./mobile-filters";

interface FiltersProps {
  search?: {
    term?: string;
    tags?: string[];
    sources?: string[];
    levels?: string[];
  };
}

export const Filters = ({ search }: FiltersProps) => {
  return (
    <aside>
      <h2 className="sr-only">Filters</h2>

      <MobileFilters>
        <FiltersOptions search={search} />
      </MobileFilters>

      <div className="hidden lg:block">
        <FiltersOptions search={search} />
      </div>
    </aside>
  );
};

export const FiltersSkeleton = () => {
  return (
    <FiltersOptionsSkeleton />
  );
};
