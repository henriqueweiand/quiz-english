"use client";

import { useSearchParams } from "next/navigation";
import { BadgeWithLink } from "./badge-with-link";

interface DifficultLevelsProps {
  level?: string;
  data: string[];
}

export const DifficultLevels = ({ level, data }: DifficultLevelsProps) => {
  const searchParams = useSearchParams()!;

  const generateLevelURL = (levelParam: string) => {
    const params = new URLSearchParams(searchParams);

    if (level) {
      params.delete("level", levelParam);
    } else {
      params.append("level", levelParam);
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
            active={level == levelMap}
            href={generateLevelURL(levelMap)}
          />
        ))}
    </>
  );
};
