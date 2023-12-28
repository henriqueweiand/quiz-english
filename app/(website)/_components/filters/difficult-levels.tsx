"use client";

import { useSearchParams } from "next/navigation";
import { BadgeWithLink } from "./badge-with-link";

interface DifficultLevelsProps {
  levels?: string[];
  data: string[];
}

export const DifficultLevels = ({ levels, data }: DifficultLevelsProps) => {
  const searchParams = useSearchParams()!;

  const generateLevelURL = (levelName: string) => {
    const params = new URLSearchParams(searchParams);

    if (levels && levels.includes(levelName)) {
      params.delete("levels", levelName);
    } else {
      params.append("levels", levelName);
    }

    return `/?${params.toString()}`;
  };

  return (
    <>
      {data.length &&
        data.map((levelMap: string, key) => (
          <BadgeWithLink
            key={key}
            name={levelMap}
            active={!!levels?.includes(levelMap)}
            href={generateLevelURL(levelMap)}
          />
        ))}
    </>
  );
};
