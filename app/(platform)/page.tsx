"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Question } from "./_components/game/question";

interface AppPageProps {
  params: {};
}

const FormSchema = z.object({
  answer: z.string({
    required_error: "You need to select one option.",
  }),
});

type OptionType = "completeSelect" | "multipleChoice" | "writing";

type Option = {
  id: number;
  content: string;
  isCorrect: boolean;
};

export type Question = {
  title: string;
  options?: Option[];
  type: OptionType;
};

type Text = {
  content: string;
  questions: Question[];
};

const text: Text = {
  content:
    "Once upon a time in a small town nestled between rolling hills and meandering streams, there lived a curious young girl named Lily. Lily was known for her bright blue eyes, a contagious smile, and an insatiable desire for adventure. One sunny morning, she woke up with a mysterious map at the foot of her bed.",
  questions: [
    {
      title: "What is the main character?",
      options: [
        {
          id: 1,
          content: "option 1",
          isCorrect: false,
        },
        {
          id: 2,
          content: "option 2",
          isCorrect: false,
        },
        {
          id: 3,
          content: "option 3",
          isCorrect: true,
        },
      ],
      type: "multipleChoice",
    },
  ],
};

const AppPage = ({ params }: AppPageProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: JSON.stringify(data, null, 2),
    });
  }

  const { questions } = text;
  const question = questions[0];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <p>{text.content}</p>
        <Question form={form} question={question} />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AppPage;
