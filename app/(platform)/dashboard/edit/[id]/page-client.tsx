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
import { toast } from "@/components/ui/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
        toast({
          description: "Lesson updated",
        });
      })
      .catch((error) => {
        // console.error("Error:", error);
        toast({
          description: "There was a problem to update, try again later",
          variant: "destructive",
        });
      });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col gap-6">
          <Accordion type="single" collapsible className="w-full">

            <AccordionItem value="item-1">
              <AccordionTrigger>Lesson info</AccordionTrigger>
              <AccordionContent>
                <LessonForm form={form} difficultyLevels={difficultyLevels} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Sources</AccordionTrigger>
              <AccordionContent>
                <SourceForm form={form} sourceTypes={sourceTypes} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Tags</AccordionTrigger>
              <AccordionContent>
                <TagForm form={form} tags={tags} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Questions</AccordionTrigger>
              <AccordionContent>
                <QuestionForm form={form} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Related lessons</AccordionTrigger>
              <AccordionContent>
                <RelatedLessonsForm form={form} lessons={lessons} />
              </AccordionContent>
            </AccordionItem>

          </Accordion>

          <div className="pt-4">
            <Button type="submit">Update</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
