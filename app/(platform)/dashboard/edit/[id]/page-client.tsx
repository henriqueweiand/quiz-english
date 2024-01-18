"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormDescription, FormLabel } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Lesson, Tag } from "@prisma/client";
import { LessonForm } from "@platform/dashboard/_components/lesson-form";
import { QuestionForm } from "@platform/dashboard/_components/question-form";
import { RelatedLessonsForm } from "@platform/dashboard/_components/related-lesson-form";
import { SourceForm } from "@platform/dashboard/_components/source-form";
import { TagForm } from "@platform/dashboard/_components/tag-form";
import {
  UpdateLessonFormValues,
  updateLessonFormSchema,
} from "./validation-format";

interface CreateClientPageProps {
  tags?: Tag[];
  lessons?: Lesson[];
  lesson: Partial<UpdateLessonFormValues>;
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
  const defaultValues: Partial<UpdateLessonFormValues> = lesson;

  const form = useForm<UpdateLessonFormValues>({
    resolver: zodResolver(updateLessonFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: UpdateLessonFormValues) {
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