import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
  const { userId } = auth();

  if (
    !userId ||
    (userId !== "user_2bKX3bD3mYc4dSSLJCvOdsAQ2ag" &&
      userId !== "user_2bKboVbNZoYdLB9ijIJ7crf8QnL")
  ) {
    redirect("/");
  }

  return <>dash</>;
}
