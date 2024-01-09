"use client";

import { Tag as TagModel } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { BadgeWithLink } from "../badge-with-link";

interface TagsProps {
  terms?: string[];
  data: TagModel[];
}

export const Tags = ({ terms, data }: TagsProps) => {
  const searchParams = useSearchParams()!;

  const generateTagsURL = (tagName: string) => {
    const params = new URLSearchParams(searchParams);

    if (terms && terms.includes(tagName)) {
      params.delete("tags", tagName);
    } else {
      params.append("tags", tagName);
    }

    return `/?${params.toString()}`;
  };

  return (
    <>
      {data.length &&
        data.map((tag) => (
          <BadgeWithLink
            key={tag.id}
            name={tag.name}
            active={!!terms?.includes(tag.name)}
            href={generateTagsURL(tag.name)}
          />
        ))}
    </>
  );
};
