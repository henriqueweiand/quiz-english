import { db } from "@/lib/db";

export const getLesson = async (id: string) => {
  const lesson = await db.lesson.findFirstOrThrow({
    where: {
      id,
    },
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
        }
      }
    },
  });

  return lesson;
};

export const getAllLessonIds = async () => {
  const lessons = await db.lesson.findMany({
    select: {
      id: true,
    },
  });

  return lessons.map(lesson => lesson.id);
};
