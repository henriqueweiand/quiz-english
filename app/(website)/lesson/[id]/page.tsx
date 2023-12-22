import { Button } from "@/components/ui/button";

interface LessonPageProps {}

const LessonPage = ({}: LessonPageProps) => {
  return (
    <main className="w-full h-full p-4 bg-[#57c2eb]">
      <div className="bg-white md:w-4/5 lg:w-3/5 mx-auto border rounded-3xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <h1 className="text-4xl font-bold">Preposition of time</h1>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button size={"sm"}>Embed</Button>
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
