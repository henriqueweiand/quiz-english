"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useSearchParams } from "next/navigation";

type Tab = "embed" | "play" | "explanation";

interface OptionsProps {
  params: { id: string };
}

export const Options = ({ params }: OptionsProps) => {
  const searchParams = useSearchParams()!;
  const tabOpen = searchParams.get("tab") as Tab;
  const isTabOpen = !!tabOpen;

  const toogleLink = (type: Tab) => {
    const queryParams = new URLSearchParams(searchParams);

    if (isTabOpen) {
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
    <>
      <Link href={toogleLink("explanation")}>
        <Button
          size={"sm"}
          variant={tabOpen == "explanation" ? "default" : "outline"}
        >
          Explanation
        </Button>
      </Link>
      <Link href={toogleLink("embed")}>
        <Button
          size={"sm"}
          variant={tabOpen == "embed" ? "default" : "outline"}
        >
          Embded
        </Button>
      </Link>
      <Link href={toogleLink("play")}>
        <Button size={"sm"} variant={tabOpen == "play" ? "default" : "outline"}>
          Play
        </Button>
      </Link>
    </>
  );
};
