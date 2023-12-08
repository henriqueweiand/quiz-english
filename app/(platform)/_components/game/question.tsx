"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { Option as OptionGame } from "./option";
import { Question as QuestionDomain } from "../../page";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

interface QuestionProps {
  form: UseFormReturn<z.infer<any>>;
  question: QuestionDomain;
}

export const Question = ({ form, question }: QuestionProps) => {
  return (
    <FormField
      control={form.control}
      name="answer"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{question.title}</FormLabel>
          <FormControl>
            {question.type !== "writing" ? (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                {question.options.map((option) => (
                  <OptionGame key={option.id} content={option.content} />
                ))}
              </RadioGroup>
            ) : (
              <>Write</>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
