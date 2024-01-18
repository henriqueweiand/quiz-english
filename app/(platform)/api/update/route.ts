import { db } from "@/lib/db";
import { DifficultyLevel, SourceTypes } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { UpdateLessonFormValues } from "@platform/dashboard/edit/[id]/validation-format";

export async function PUT(req: NextRequest, res: NextResponse) {
  const payload = (await req.json()) as UpdateLessonFormValues;

  let sources;
  let tags;
  let questions;
  let relatedLessons;

  if (!payload) return Response.json(false);

  // Create Lesson
  const lesson = await db.lesson.update({
    where: {
      id: payload.id,
    },
    data: {
      title: payload.title,
      description: payload.description,
      explanation: payload.explanation,
      difficultyLevel: payload.difficultyLevel as DifficultyLevel,
    },
  });

  Promise.all([
    db.option.deleteMany({ where: { lessonId: payload.id } }),
    db.lessonQuestion.deleteMany({ where: { lessonId: payload.id } }),
    db.lessonRelation.deleteMany({ where: { relatedLessonId: payload.id } }),
    db.lessonTag.deleteMany({ where: { lessonId: payload.id } }),
    db.source.deleteMany({ where: { lessonId: payload.id } }),
  ]);

  // Create Questions and Options
  if (payload.questions) {
    const questionPromises = payload.questions.map(async (question) => {
      const questionData = await db.question.create({
        data: {
          title: question.title,
        },
      });

      const optionPromises = question.options.map(async (option) => {
        return db.option.create({
          data: {
            content: option.content,
            isCorrect: JSON.parse(option.isCorrect),
            questionId: questionData.id,
          },
        });
      });

      await Promise.all(optionPromises);

      await db.lessonQuestion.create({
        data: {
          questionId: questionData.id,
          lessonId: lesson.id,
        },
      });

      return questionData;
    });

    questions = await Promise.all(questionPromises);
  }

  // Related lessons
  if (payload.relatedLessons) {
    const relatedLessonPromises = payload.relatedLessons.map(
      async (relatedLesson) => {
        return await db.lessonRelation.create({
          data: {
            lessonId: lesson.id,
            relatedLessonId: relatedLesson,
          },
        });
      }
    );
    relatedLessons = await Promise.all(relatedLessonPromises);
  }

  // Create Source
  if (payload.source) {
    const sourcePromises = payload.source.map(async (source) => {
      return await db.source.create({
        data: {
          lessonId: lesson.id,
          type: source.type as SourceTypes,
          url: source.url,
          title: source.title,
        },
      });
    });

    sources = await Promise.all(sourcePromises);
  }

  // Create Tags
  if (payload.tags) {
    const tagPromises = payload.tags.map(async (tag: string) => {
      const tagExists = await db.tag.findFirst({
        where: {
          name: {
            contains: tag,
          },
        },
      });

      let tagData;

      if (!tagExists) {
        tagData = await db.tag.create({
          data: {
            name: tag,
          },
        });
      } else {
        tagData = tagExists;
      }

      await db.lessonTag.create({
        data: {
          lessonId: lesson.id,
          tagId: tagData.id,
        },
      });

      return tagData;
    });

    tags = await Promise.all(tagPromises);
  }

  return Response.json({
    lesson,
    sources,
    tags,
    questions,
    relatedLessons,
  });
}
