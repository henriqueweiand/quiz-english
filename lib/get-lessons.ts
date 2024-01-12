import { db } from "@/lib/db";

export const getLessons = async () => {
  const lessons = await db.lesson.findMany({
    include: {
      relatedLessons: true,
      questions: {
        include: {
          question: {
            include: {
              options: true,
            },
          },
        },
      },
      source: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  return lessons;
};
