"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form } from "@/components/ui/form";

import { toast } from "@/components/ui/use-toast";
import { LessonForm } from "./lesson-form";
import { SourceForm } from "./source-form";
import { TagForm } from "./tag-form";
import { QuestionForm } from "./question-form";
import { Button } from "@/components/ui/button";

const tags = [
  {
    id: "prepositions-of-time",
    label: "Prepositions of time",
  },
  {
    id: "prepositions-of-place",
    label: "Prepositions of place",
  },
  {
    id: "simple-past",
    label: "Simple past",
  },
  {
    id: "present-simple",
    label: "Present simple",
  },
  {
    id: "present-perfect",
    label: "Present perfect",
  },
] as const;

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

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  title: "Test title",
  description: "Test description",
  explanation: "Test explanation",
  difficultyLevel: "A1",

  source: [
    { title: "Source 1", type: "Video", url: "https://shadcn.com" },
    { title: "Source 2", type: "Video", url: "https://google.com" },
  ],
  tags: ["present-simple", "present-perfect"],
  questions: [
    {
      title: "Question 1",
      options: [
        {
          content: "Option 1",
          isCorrect: "true",
        },
        {
          content: "Option 2",
          isCorrect: "false",
        },
      ],
    },
  ],
};

interface CreatePageProps {}

const CreatePage = ({}: CreatePageProps) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <div className="p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <LessonForm form={form} />
          <SourceForm form={form} />
          <TagForm form={form} tags={tags} />
          <QuestionForm form={form} />

          <div className="pt-4 border-t-2 mt-4">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreatePage;
