"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Question } from "./question";
import { Question as QuestionModel } from "@prisma/client";

const FormSchema = z.object({
  answer: z.string({
    required_error: "You need to select one option.",
  }),
});

interface GameProps {
  question: QuestionModel;
}

const Game = ({ question }: GameProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: JSON.stringify(data, null, 2),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Question form={form} question={question} />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default Game;
