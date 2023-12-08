"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";

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

type Question = {
  title: string;
  options?: Option[];
  type: OptionType;
};

type Text = {
  content: string;
  questions: Question[];
};

const AppPage = ({ params }: AppPageProps) => {
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
      {
        title: "What is the main character?",
        type: "writing",
      },
    ],
  };

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
    <div className="max-w-lg mx-auto h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-between p-10 flex-col bg-white rounded-lg w-full h-full"
        >
          <div className="flex flex-col gap-4">
            <Progress value={20} className="w-[100%]" />
            <div className="text-gray-700">{text.content}</div>

            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{question.title}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {question.type !== "writing" && (
                        <>
                          {question.options.map((option) => (
                            <FormItem
                              key={option.id}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={option.content} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {option.content}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </>
                      )}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AppPage;
