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

interface QuestionFormProps {
  form: UseFormReturn<any>
}

export function QuestionForm({ form }: QuestionFormProps) {
  const { control } = form;

  const { fields: questionFields, append: appendQuestion } = useFieldArray({
    name: "questions",
    control,
  });

  return (
    <>
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
