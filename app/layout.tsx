import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const description =
  "Boost your English skills through interactive quizzes! Tailored for every level, get instant feedback and track your progress. Dive into fun learning for fluency!";

export const metadata: Metadata = {
  metadataBase: new URL("https://quiz-english.com"),
  title: "Quiz-English",
  description,
  openGraph: {
    title: "Quiz-English",
    description,
  },
  twitter: {
    title: "Quiz-English",
    description,
  },
  keywords: [
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
