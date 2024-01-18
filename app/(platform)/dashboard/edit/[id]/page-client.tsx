"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormDescription, FormLabel } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Lesson, Tag } from "@prisma/client";
import { LessonForm } from "./_components/lesson-form";
import { QuestionForm } from "./_components/question-form";
import { RelatedLessonsForm } from "./_components/related-lesson-form";
import { SourceForm } from "./_components/source-form";
import { TagForm } from "./_components/tag-form";

const profileFormSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  explanation: z.string(),
  difficultyLevel: z.string({
    required_error: "Please select the level.",
  }),
  source: z
    .array(
      z.object({
        title: z.string().optional().nullable(),
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
  relatedLessons: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    })
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface CreateClientPageProps {
  tags?: Tag[];
  lessons?: Lesson[];
  lesson: Partial<ProfileFormValues>;
  sourceTypes: string[];
  difficultyLevels: string[];
}

export const CreateClientPage = ({
  tags,
  lessons,
  lesson,
  sourceTypes,
  difficultyLevels,
}: CreateClientPageProps) => {
  const defaultValues: Partial<ProfileFormValues> = lesson;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);

    let url = "/api/update";

    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        lessonId: lesson.id,
        ...data,
      }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col gap-6">
          <div>
            <div className="mb-4">
              <FormLabel className="text-base">Lesson info</FormLabel>
              <FormDescription>
                Main informations about the lesson
              </FormDescription>
            </div>
            <LessonForm form={form} difficultyLevels={difficultyLevels} />
          </div>

          <div>
            <div className="mb-4">
              <FormLabel className="text-base">Sources</FormLabel>
              <FormDescription>
                Inform the materials of the lesson
              </FormDescription>
            </div>
            <SourceForm form={form} sourceTypes={sourceTypes} />
          </div>

          <div>
            <div className="mb-4">
              <FormLabel className="text-base">Tags</FormLabel>
              <FormDescription>
                Select the tags that are related to this new one
              </FormDescription>
            </div>
            <TagForm form={form} tags={tags} />
          </div>

          <div>
            <div className="mb-4">
              <FormLabel className="text-base">Questions</FormLabel>
              <FormDescription>Inform the questions</FormDescription>
            </div>
            <QuestionForm form={form} />
          </div>

          <div>
            <div className="mb-4">
              <FormLabel className="text-base">Related lessons</FormLabel>
              <FormDescription>
                Select the lessons that are related to this new one
              </FormDescription>
            </div>
            <RelatedLessonsForm form={form} lessons={lessons} />
          </div>

          <div className="pt-4 border-t-2 mt-4">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
