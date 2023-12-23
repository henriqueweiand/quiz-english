"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Tab = "emded" | "play";

interface LessonPageProps {
  params: { id: string };
}

const LessonPage = ({ params }: LessonPageProps) => {
  const searchParams = useSearchParams()!;
  const tabOpen = searchParams.get("tab") as Tab;
  const isTabOpen = !!tabOpen;

  const toogleLink = (type: Tab) => {
    const queryParams = new URLSearchParams(searchParams);

    if (!!tabOpen) {
      queryParams.delete("tab");

      if (tabOpen != type) {
        queryParams.append("tab", type);
      }
    } else {
      queryParams.append("tab", type);
    }

    return `/lesson/${params.id}?${queryParams.toString()}`;
  };

  return (
    <main className="w-full h-full p-4 bg-[#57c2eb]">
      <div className="bg-white md:w-4/5 lg:w-3/5 mx-auto border rounded-3xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <h1 className="text-4xl font-bold">Preposition of time</h1>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Link href={toogleLink("emded")}>
              <Button
                size={"sm"}
                variant={tabOpen == "emded" ? "default" : "outline"}
              >
                Embded
              </Button>
            </Link>
            <Link href={toogleLink("play")}>
              <Button
                size={"sm"}
                variant={tabOpen == "play" ? "default" : "outline"}
              >
                Play
              </Button>
            </Link>
          </div>
        </div>

        {isTabOpen ? (
          <>{tabOpen == "emded" ? <>Emded</> : <>Play</>}</>
        ) : (
          <div className="text-lg leading-relaxed text-gray-700 bg-white">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </div>
        )}
      </div>
    </main>
  );
};

export default LessonPage;
