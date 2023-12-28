"use client";

import { useSearchParams } from "next/navigation";
import { BadgeWithLink } from "./badge-with-link";

interface SourcesProps {
  sources?: string[];
  data: string[];
}

export const Sources = ({ sources, data }: SourcesProps) => {
  const searchParams = useSearchParams()!;

  const generateSourcesURL = (sourceName: string) => {
    const params = new URLSearchParams(searchParams);

    if (sources && sources.includes(sourceName)) {
      params.delete("sources", sourceName);
    } else {
      params.append("sources", sourceName);
    }

    return `/?${params.toString()}`;
  };

  return (
    <>
      {data.length &&
        data.map((source, key) => (
          <BadgeWithLink
            key={key}
            name={source}
            active={!!sources?.includes(source)}
            href={generateSourcesURL(source)}
          />
        ))}
    </>
  );
};
