import { Suspense } from "react";
import { Filters } from "./_components/filters";
import { Lessons } from "./_components/lessons";
import { Header } from "./_components/header";

interface WebSitePageProps {
  searchParams: {
    term?: string;
    tags?: string[];
  };
}

const WebSitePage = ({ searchParams }: WebSitePageProps) => {
  return (
    <>
      <Header />
      <main className="mx-auto md:w-4/5 flex flex-col lg:flex-row gap-4 p-4">
        <aside className="min:w-1/3">
          <Suspense fallback={<>Loading tags</>}>
            <Filters search={searchParams} />
          </Suspense>
        </aside>
        <section className="flex-1">
          <Suspense fallback={<>Loading lessons</>}>
            <Lessons search={searchParams} />
          </Suspense>
        </section>
      </main>
    </>
  );
};

export default WebSitePage;
