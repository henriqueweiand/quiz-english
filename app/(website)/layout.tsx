import { Header } from "./_components/header";

const WebsiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="mx-auto md:w-4/5 flex flex-col md:flex-row-reverse mt-4">
        {children}
      </main>
    </>
  );
};

export default WebsiteLayout;
