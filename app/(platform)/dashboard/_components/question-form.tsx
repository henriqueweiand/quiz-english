"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, useFieldArray, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChat } from "ai/react";
import { useState } from "react";

interface QuestionFormProps {
  form: UseFormReturn<any>;
}

type QuizQuestion = {
  topic: string;
  question: string;
  options: {
    option1: {
      body: string;
      isItCorrect: boolean;
    };
    option2: {
      body: string;
      isItCorrect: boolean;
    };
    option3: {
      body: string;
      isItCorrect: boolean;
    };
  };
};

export function QuestionForm({ form }: QuestionFormProps) {
  const { control } = form;
  const [AIInputData, SetAIInputData] = useState<string>();

  const { messages, setInput, handleSubmit, isLoading } = useChat({
    api: "/api/ai-question",
    initialMessages: [
      {
        id: "1",
        role: "user",
        content:
          'You are a helpful assistant that generate quiz questions based on a topic. Respond with one short question and three plausible options/answers, of which only one is correct. Provide your answer in JSON structure like this {"questions": [{"title": "<The quiz question you generate>","options": [{"content": "<Plausible option 1>", "isCorrect": <"true" or "false">},{"content": "<Plausible option 2>", "isCorrect": <"true" or "false">},{"content": "<Plausible option 3>", "isCorrect": <"true" or "false">}]}]} use true or false as a string value',
      },
    ],
    onFinish: (data) => {
      const { questions } = JSON.parse(data.content);

      // console.log('finish', questions);
      populate(questions);
    },
  });

  const { fields: questionFields, append: appendQuestion } = useFieldArray({
    name: "questions",
    control,
  });

  const populate = (data: QuizQuestion[]) => {
    appendQuestion(data);
  };

  const AIGenerate = (e: any) => {
    const title = form.watch("title");
    const explanation = form.watch("explanation");

    if (!title || !explanation) {
      alert(
        "You have to fill out the fields title and explanation to generate quesitons with AI"
      );
    } else {
      let question: string = `Provide a question with three possible answers about: Title: ${title}. Explanation: ${explanation}`;

      if (messages.length < 2 || AIInputData != question) {
        console.log("mudou");
        SetAIInputData(question);
      } else {
        question = `Provide another question with three possible answers`;
      }

      setInput(question);
      handleSubmit(e);
    }
  };

  return (
    <>
      <div>
        <Button
          size={"sm"}
          type="button"
          disabled={isLoading}
          onClick={AIGenerate}
        >
          AI Generate
        </Button>
      </div>

      {questionFields.map((questionField, qIndex) => (
        <div key={questionField.id}>
          <FormField
            control={control}
            name={`questions.${qIndex}.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <OptionsFieldArray control={control} qIndex={qIndex} />
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => appendQuestion({ title: "", options: [] })}
      >
        Add Question
      </Button>
    </>
  );
}

interface OptionsFieldArrayProps {
  control: any;
  qIndex: number;
}

function OptionsFieldArray({ control, qIndex }: OptionsFieldArrayProps) {
  const { fields: optionFields, append: appendOption } = useFieldArray({
    name: `questions.${qIndex}.options`,
    control,
  });

  return (
    <>
      {optionFields.map((optionField, oIndex) => (
        <div key={optionField.id}>
          <FormField
            control={control}
            name={`questions.${qIndex}.options.${oIndex}.content`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Option</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`questions.${qIndex}.options.${oIndex}.isCorrect`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>isCorrect</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Is this the correct answer?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"true"}>Yes</SelectItem>
                    <SelectItem value={"false"}>No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => appendOption({ content: "", isCorrect: "false" })}
      >
        Add Option
      </Button>
    </>
  );
}
