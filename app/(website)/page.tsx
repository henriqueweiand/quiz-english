import { getTags } from "@/lib/get-tags";
import { Filters } from "./_components/filters";
import { Lessons } from "./_components/lessons";

interface WebSitePageProps {
  searchParams?: {
    term?: string;
    tags?: string[];
  };
}

const WebSitePage = async ({ searchParams }: WebSitePageProps) => {
  return (
    <main className="mx-auto md:w-4/5 flex flex-col lg:flex-row gap-4 pt-4">
      <aside className="w-1/3">
        <Filters search={searchParams} />
      </aside>
      <section className="flex-1">
        <Lessons search={searchParams?.term} />
      </section>
    </main>
  );
};

export default WebSitePage;
