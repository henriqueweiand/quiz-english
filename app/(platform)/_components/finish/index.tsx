"use client";

import { Logo } from "@/app/(website)/_components/site/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

let phrases = [
  "You have completed all questions! Keep going!!",
  "Great job! You did well.",
  "Well done! You are doing great.",
  "Keep up the good work!",
  "You're doing an excellent job!",
  "Your dedication is impressive!",
  "Your hard work is paying off.",
  "You're making progress!",
  "Good job on keeping going!",
  "Keep it up! You're doing great.",
];

interface FinishProps {}

const Finish = ({}: FinishProps) => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  setTimeout(() => {
    setShowConfetti(false);
  }, 6000);

  return (
    <>
      {showConfetti && <Confetti width={width - 17} height={height} />}
      <div className="flex flex-col items-center justify-center p-6 ">
        <div className="mb-8">
          <Logo />
        </div>
        <h1 className="text-4xl font-bold mb-2">Congratulations</h1>
        <p className="text-center mb-6">
          {phrases[Math.floor(Math.random() * phrases.length)]}
        </p>
        <Button asChild>
          <Link href={`/`}>Return to the lessons</Link>
        </Button>
      </div>
    </>
  );
};

export default Finish;
