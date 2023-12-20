import { db } from "@/lib/db";

export const getSearch = async (term?: string) => {
  let streams = [];

  if (term) {
    streams = await db.lesson.findMany({
      where: {
        title: {
          contains: term,
        },
      },
      select: {
        id: true,
        title: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  } else {
    streams = await db.lesson.findMany({
      select: {
        id: true,
        title: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  }

  return streams;
};
