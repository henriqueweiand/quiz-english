import type { Metadata } from "next";
import { MainNav } from "./_components/main-nav";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
        </div>
      </div>

      <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
    </div>
  );
}
