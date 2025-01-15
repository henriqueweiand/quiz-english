import { Suspense } from "react";
import { Filters, FiltersSkeleton } from "./_components/filters";
import { Lessons, LessonsSkeleton } from "./_components/lessons";
import { Hero } from "./_components/site/Hero";
import { Header } from "./_components/site/Header";
import type { Metadata } from "next";
import { Footer } from "./_components/site/Footer";
import { Separator } from "@/components/ui/separator";
import { getSearch } from "@/lib/search-service";

interface WebSitePageProps {
  searchParams: {
    term?: string;
    tags?: string[];
    sources?: string[];
    levels?: string[];
    page?: number;
  };
  data?: any[];
  total?: number;
}

const description =
  "Boost your English skills through interactive quizzes! Tailored for every level, get instant feedback and track your progress. Dive into fun learning for fluency!";

export const metadata: Metadata = {
  metadataBase: new URL("https://quiz-english.com"),
  alternates: {
    canonical: `https://quiz-english.com`,
  },
  title: "Quiz-English: Learn English by doing quizzes",
  description,
  openGraph: {
    title: "Quiz-English: Learn English by doing quizzes",
    description,
  },
  twitter: {
    title: "Quiz-English: Learn English by doing quizzes",
    description,
  },
  keywords: [
    "trivia",
    "quiz",
    "english",
    "study",
    "learners",
    "language",
    "podcasts",
    "videos",
    "articles",
    "quizzes",
  ],
};

export async function generateStaticParams(test: any) {
  // Define static parameters for pre-rendering
  return [{}];
}

const WebSitePage = async ({ searchParams }: any) => {
  let data = [];
  let total = 0;

  if (Object.keys(searchParams).length === 0) {
    const result = await getSearch({});
    data = result.data;
    total = result.total;
  } else {
    const result = await getSearch(searchParams);
    data = result.data;
    total = result.total;
  }

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
            <Suspense fallback={<FiltersSkeleton />}>
              <Filters search={searchParams} />
            </Suspense>

            <section
              aria-labelledby="lessons-heading"
              className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
            >
              <h2 id="product-heading" className="sr-only">
                Lessons
              </h2>

              <Suspense fallback={<LessonsSkeleton />}>
                <Lessons search={searchParams} data={data} total={total} />
              </Suspense>
            </section>
          </div>
        </div>
      </main>
      <Separator />
      <Footer />
    </>
  );
};

export default WebSitePage;
