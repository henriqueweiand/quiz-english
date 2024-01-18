import { db } from "@/lib/db";

export const getRelatedLessonsById = async (id: string) => {
  const lessons = await db.lesson.findMany({
    where: {
      relatedLessons: {
        some: {
          relatedLessonId: id,
        },
      },
    },
    include: {
      relatedLessons: {
        include: {
          lesson: true,
        },
      },
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
