import { getLesson } from "@/lib/get-lesson";
import { getLessons } from "@/lib/get-lessons";
import { getTags } from "@/lib/get-tags";
import {
  DifficultyLevel,
  Lesson,
  LessonQuestion,
  LessonRelation,
  LessonTag,
  Question,
  Source,
  SourceTypes,
  Tag,
} from "@prisma/client";
import { CreateClientPage } from "./page-client";
import { UpdateLessonFormValues } from "./validation-format";

interface EditPageProps {
  params: { id: string };
}

interface formatLessonProps extends Lesson {
  questions: (LessonQuestion & { question: Question })[];
  relatedLessons: LessonRelation[];
  tags: (LessonTag & { tag: Tag })[];
  source: Source[];
}

function formatLesson(
  lesson: formatLessonProps
): Partial<UpdateLessonFormValues> {
  let data = {
    ...lesson,
    id: lesson.id,
    relatedLessons: lesson.relatedLessons.map(
      (rl: LessonRelation) => rl.relatedLessonId
    ),
    questions: [],
    // questions: lesson.questions.map((q: any) => q.question), // ### WIP Tests
    tags: lesson.tags.map((t: any) => t.tag.name),
  };

  data.questions.forEach((q: any) => {
    q.options.forEach((opt: any) => {
      opt.isCorrect = opt.isCorrect ? "true" : "false";
    });
  });

  return data as Partial<UpdateLessonFormValues>;
}

const EditPage = async ({ params }: EditPageProps) => {
  const tags = await getTags();
  const lessons = await getLessons();
  const lesson = await getLesson(params.id);

  const difficultyLevels: string[] = Object.values(DifficultyLevel);
  const sourceTypes: string[] = Object.values(SourceTypes);

  return (
    <CreateClientPage
      tags={tags}
      lessons={lessons}
      difficultyLevels={difficultyLevels}
      sourceTypes={sourceTypes}
      lesson={formatLesson(lesson)}
    />
  );
};

export default EditPage;
