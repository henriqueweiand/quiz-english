"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuestionFormProps {
  form: any;
}

export function QuestionForm({ form }: QuestionFormProps) {
  const { fields: questionFields, append: appendQuestion } = useFieldArray({
    name: "questions",
    control: form.control,
  });

  const { fields: optionFields, append: appendOption } = useFieldArray({
    name: "questions.options",
    control: form.control,
  });

  return (
    <>
      {questionFields.map((questionField, qIndex) => (
        <>
          <FormField
            control={form.control}
            key={questionField.id}
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

          {optionFields.map((optionField, oIndex) => (
            <>
              <FormField
                control={form.control}
                key={optionField.id}
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
                control={form.control}
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
            </>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => appendOption({ value: "" })}
          >
            Add Option
          </Button>
        </>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => appendQuestion({ value: "" })}
      >
        Add Question
      </Button>
    </>
  );
}
