import { db } from "@/lib/db";

export const getRelatedLessonsById = async (id: string) => {
  const lessons = await db.lessonRelation.findMany({
    select: {
      relatedLessonId: true,
    },
    where: {
      lessonId: id,
    },
  });

  const lessonIds = lessons.map((lesson) => lesson.relatedLessonId);

  const lessonsRelated = await db.lesson.findMany({
    where: {
      id: {
        in: lessonIds,
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

  return lessonsRelated;
};
