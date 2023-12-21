import { Filters } from "./_components/filters";
import { Lessons } from "./_components/lessons";

interface WebSitePageProps {
  searchParams?: {
    term?: string;
  };
}

const WebSitePage = async ({ searchParams }: WebSitePageProps) => {
  return (
    <>
      <aside className="w-1/3">
        <Filters />
      </aside>
      <section className="flex-1">
        <Lessons search={searchParams?.term} />
      </section>
    </>
  );
};

export default WebSitePage;
