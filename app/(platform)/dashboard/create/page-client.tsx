"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { LessonForm } from "@platform/dashboard/_components/lesson-form";
import { QuestionForm } from "@platform/dashboard/_components/question-form";
import { RelatedLessonsForm } from "@platform/dashboard/_components/related-lesson-form";
import { SourceForm } from "@platform/dashboard/_components/source-form";
import { TagForm } from "@platform/dashboard/_components/tag-form";
import { Lesson, Tag } from "@prisma/client";
import { redirect } from "next/navigation";
import {
  CreateLessonFormValues,
  createLessonFormSchema,
} from "./validation-format";
import { useState } from "react";

const defaultValues: Partial<CreateLessonFormValues> = {
  title: "",
  description: "",
};

interface CreateClientPageProps {
  tags?: Tag[];
  lessons?: Lesson[];
  sourceTypes: string[];
  difficultyLevels: string[];
}

export const CreateClientPage = ({
  tags,
  lessons,
  sourceTypes,
  difficultyLevels,
}: CreateClientPageProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateLessonFormValues>({
    resolver: zodResolver(createLessonFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: CreateLessonFormValues) {
    setIsLoading(true);
    let url = "/api/create";

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        toast({
          description: "Lesson created",
        });

        setTimeout(() => {
          redirect('/dashboard');
        }, 2000);
      })
      .catch((error) => {
        // console.error("Error:", error);
        toast({
          description: "There was a problem to create, try again later",
          variant: "destructive",
        });
        setIsLoading(false);
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
            <Button type="submit" disabled={isLoading}>Create</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
