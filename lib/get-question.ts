import { db } from "@/lib/db";

export const getQuestion = async (id: string) => {
  const question = db.question.findFirstOrThrow({
    where: {
      id,
    },
    include: {
      options: true,
    },
  });

  return question;
};
