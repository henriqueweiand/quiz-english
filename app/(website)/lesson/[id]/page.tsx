import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CalendarDays } from "lucide-react";

interface LessonPageProps {}

const LessonPage = ({}: LessonPageProps) => {
  return (
    <main className="w-full h-full p-4 bg-[#57c2eb]">
      <div className="bg-white md:w-4/5 lg:w-3/5 mx-auto border rounded-3xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <h1 className="text-4xl font-bold">Preposition of time</h1>
          <div className="flex gap-2 mt-4 md:mt-0">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button size={"sm"}>Embded</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">Embded is easy!</h4>
                    <p className="text-sm">
                      1- Insert the library <br />
                      2- Copy the code below
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <Button size={"sm"}>Play</Button>
          </div>
        </div>

        <div className="text-lg leading-relaxed text-gray-700 bg-white">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
          ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
          sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </div>
      </div>
    </main>
  );
};

export default LessonPage;
