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
