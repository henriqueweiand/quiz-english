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

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import TinyMce from "@platform/_components/tinymce";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";

interface LessonFormProps {
  form: UseFormReturn<any>;
  difficultyLevels: string[];
}

export function LessonForm({ form, difficultyLevels }: LessonFormProps) {
  const [question, setQuestion] = useState("");

  const { messages, setInput, handleSubmit, isLoading } = useChat({
    api: "/api/ai",
  });

  const generate = (e: any) => {
    if (!question) {
      toast({
        description: "Fill out the title to use this feature",
        variant: "destructive",
      });
    } else {
      handleSubmit(e);
      form.setValue("description", "");
      setInput(question);
    }
  };

  useEffect(() => {
    if (messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      const content = lastMessage.content || "";

      if (question !== content) form.setValue("description", content);
    }
  }, [form, messages, question]);

  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field: { onChange, ...rest } }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                placeholder="Mastering at Present "
                {...rest}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const question = `Create a description for a quiz which has a name "${inputValue}", it must be shorter and have emojis`;

                  setQuestion(question);
                  onChange(e);
                  setInput(question);
                }}
              />
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
            <FormLabel className="flex justify-between items-center">
              <div>Description</div>
              <Button
                size={"sm"}
                type="button"
                onClick={generate}
                disabled={isLoading}
              >
                AI Generate
              </Button>
            </FormLabel>
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
