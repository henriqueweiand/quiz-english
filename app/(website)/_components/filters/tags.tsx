"use client";

import { Tag as TagModel } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Tag } from "./tag";

interface TagsProps {
  terms?: string[];
  data: TagModel[];
}

export const Tags = ({ terms, data }: TagsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams()!;

  const handleTagClick = (tagName: string) => {
    const params = new URLSearchParams(searchParams);

    if (terms && terms.includes(tagName)) {
      params.delete("tags", tagName);
    } else {
      params.append("tags", tagName);
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <>
      {data.length &&
        data.map((tag) => (
          <Tag
            key={tag.id}
            name={tag.name}
            active={!!terms?.includes(tag.name)}
            onClick={() => handleTagClick(tag.name)}
          />
        ))}
    </>
  );
};
