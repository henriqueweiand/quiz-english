import { Option, Question, Lesson, LessonQuestion } from "@prisma/client";

interface LessonWithQuestions extends Lesson {
  questions: LessonQuestionWithQuestion[];
}

interface LessonQuestionWithQuestion extends LessonQuestion {
  question: QuestionWithOptions;
}

interface QuestionWithOptions extends Question {
  options: Option[];
}

export const extractQuestions = (
  lesson: LessonWithQuestions
): QuestionWithOptions[] => {
  const questionsWithOptions: QuestionWithOptions[] = lesson.questions.map(
    (lessonQuestion: LessonQuestionWithQuestion) => {
      const questionWithOptions: QuestionWithOptions = {
        ...lessonQuestion.question,
        options: lessonQuestion.question.options ?? [],
      };
      return questionWithOptions;
    }
  );

  return questionsWithOptions;
};
