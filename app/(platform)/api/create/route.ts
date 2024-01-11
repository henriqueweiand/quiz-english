import { db } from "@/lib/db";
import { DifficultyLevel, SourceTypes } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const profileFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  description: z.string().max(160).min(4),
  explanation: z.string().max(160).min(4),
  difficultyLevel: z.string({
    required_error: "Please select the level.",
  }),
  source: z
    .array(
      z.object({
        title: z.string(),
        type: z.string(),
        url: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
  questions: z.array(
    z.object({
      title: z.string(),
      options: z.array(
        z.object({
          content: z.string(),
          isCorrect: z.enum(["true", "false"]),
        })
      ),
    })
  ),
  tags: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

type POSTData = z.infer<typeof profileFormSchema>;

export async function POST(req: NextRequest, res: NextResponse) {
  const payload = (await req.json()) as POSTData;

  let sources;
  let tags;
  let questions;

  if (!payload) return Response.json(false);

  // Create Lesson
  const lesson = await db.lesson.create({
    data: {
      title: payload.title,
      description: payload.description,
      explanation: payload.explanation,
      difficultyLevel: payload.difficultyLevel as DifficultyLevel,
    },
  });

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

  // Create Source
  if (payload.source) {
    const sourcePromises = payload.source.map(async (source) => {
      return await db.source.create({
        data: {
          lessonId: lesson.id,
          type: source.type as SourceTypes,
          url: source.url,
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
  });
}