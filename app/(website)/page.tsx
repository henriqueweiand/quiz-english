import { Suspense } from "react";
import { Filters } from "./_components/filters";
import { Lessons } from "./_components/lessons";
import { Hero } from "./_components/hero";
import { Header } from "./_components/Header";

interface WebSitePageProps {
  searchParams: {
    term?: string;
    tags?: string[];
    sources?: string[];
    levels?: string[];
  };
}

const WebSitePage = ({ searchParams }: WebSitePageProps) => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div
          className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8"
          id="lessons"
        >
          <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <Suspense fallback={<>Loading tags</>}>
              <Filters search={searchParams} />
            </Suspense>

            <section
              aria-labelledby="lessons-heading"
              className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
            >
              <h2 id="product-heading" className="sr-only">
                Lessons
              </h2>

              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                <Suspense fallback={<>Loading lessons</>}>
                  <Lessons search={searchParams} />
                </Suspense>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default WebSitePage;
