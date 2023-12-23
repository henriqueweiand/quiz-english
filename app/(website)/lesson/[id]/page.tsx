import { Suspense } from "react";
import { Content } from "./_components/content";
import { Embed } from "./_components/embed";
import { Options } from "./_components/options";
import { Play } from "./_components/play";

type Tab = "embed" | "play";

interface LessonPageProps {
  params: { id: string };
  searchParams?: {
    tab?: string;
  };
}

const LessonPage = ({ params, searchParams }: LessonPageProps) => {
  const tabOpen = searchParams?.tab as Tab;
  const isTabOpen = !!tabOpen;

  return (
    <main className="w-full h-full p-4 bg-[#57c2eb]">
      <div className="bg-white md:w-4/5 lg:w-3/5 mx-auto border rounded-3xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <h1 className="text-4xl font-bold">Preposition of time</h1>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Options params={params} />
          </div>
        </div>

        {isTabOpen ? (
          <Suspense fallback={<>Loading</>}>
            {tabOpen == "embed" ? <Embed /> : <Play />}
          </Suspense>
        ) : (
          <div className="text-lg leading-relaxed text-gray-700">
            <Content />
          </div>
        )}
      </div>
    </main>
  );
};

export default LessonPage;
