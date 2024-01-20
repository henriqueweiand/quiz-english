"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import TinyMce from "@platform/_components/tinymce";
import AiTitleSuggest from "./ai-title-suggest";

interface LessonFormProps {
  form: any;
  difficultyLevels: string[];
}

export function LessonForm({ form, difficultyLevels }: LessonFormProps) {

  
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Mastering at Present Perfect" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>

            <AiTitleSuggest question="Generate a description for a quiz game in which has the title:" text={form.watch("title") || ""} form={form} />

            <FormControl>
              <Textarea className="resize-none" {...field} />
            </FormControl>
            <FormDescription>
              Describe in a short text what this lesson is about
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="explanation"
        render={({ field: { onChange, ...rest } }) => (
          <FormItem>
            <FormLabel>Explanation</FormLabel>
            <FormControl>
              <TinyMce
                className="resize-none"
                onEditorChange={(content: string) => {
                  onChange(content);
                }}
                {...rest}
              />
            </FormControl>
            <FormDescription>
              The explanation field is where you are going to teach the person
              about the content of the lesson. Reminds that this section has to
              help the user to learn from it how to solve the quizzes
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="difficultyLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Difficulty Level</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select the level of the lesson" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {difficultyLevels.map((difficultyLevel) => (
                  <SelectItem key={difficultyLevel} value={difficultyLevel}>
                    {difficultyLevel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
