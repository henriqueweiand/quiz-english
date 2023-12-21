import GamePage from "@/app/(website)/_components/game";

export const Header = () => (
  <header className="bg-[#57c2eb] min-h-[50vh] flex flex-col items-center justify-center">
    <div className="md:w-3/5 lg:w-2/5 m-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-md font-bold mb-2 text-white">
          Smart read
        </h1>
        <p className="mb-6 md:text-md text-white">
          Generate smart quizzes for your website for free!
        </p>
      </div>

      <section className="bg-white p-8 rounded-lg shadow-lg w-full">
        <GamePage />
      </section>
    </div>
  </header>
);
