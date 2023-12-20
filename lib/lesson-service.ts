import { Option, Question, Lesson, LessonQuestion } from "@prisma/client";

interface QuestionWithOptions extends Question {
  options: Option[];
}

export const extractQuestions = (lesson: Lesson): QuestionWithOptions[] => {
  const questionsWithOptions: QuestionWithOptions[] = lesson.questions.map(
    (lessonQuestion: LessonQuestion) => {
      const questionWithOptions: QuestionWithOptions = {
        ...lessonQuestion.question,
        options: lessonQuestion.question.options,
      };
      return questionWithOptions;
    }
  );

  return questionsWithOptions;
};
