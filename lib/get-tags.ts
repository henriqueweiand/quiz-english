import { db } from "@/lib/db";

export const getTags = async () => {
  try {
    const tags = await db.tag.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return tags;
  } catch {
    return [];
  }
};
