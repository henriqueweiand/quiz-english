import { db } from "@/lib/db";

export const getQuestions = async () => {
  try {
    const questions = db.question.findMany({
      include: {
        options: true,
      },
    });

    return questions;
  } catch {
    return [];
  }
};
