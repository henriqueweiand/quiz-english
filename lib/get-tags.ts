import { db } from "@/lib/db";

export const getTags = async () => {
  try {
    const tags = await db.tag.findMany({});

    return tags;
  } catch {
    return [];
  }
};
