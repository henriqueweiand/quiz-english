"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Checkbox } from "@/components/ui/checkbox";
import { Lesson } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";

interface RelatedLessonsFormProps {
  form: UseFormReturn<any>
  lessons?: Lesson[];
}

export const RelatedLessonsForm = ({
  form,
  lessons,
}: RelatedLessonsFormProps) => {
  return (
    <>
      {!!lessons && (
        <FormField
          control={form.control}
          name="relatedLessons"
          render={() => (
            <FormItem>
              {lessons?.map((lesson) => (
                <FormField
                  key={lesson.id}
                  control={form.control}
                  name="relatedLessons"
                  render={({ field }) => {
                    const fieldValue = field.value || []; // Provide a default empty array if field.value is undefined

                    return (
                      <FormItem
                        key={lesson.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={fieldValue.includes(lesson.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...fieldValue, lesson.id])
                                : field.onChange(
                                    fieldValue.filter(
                                      (value: string) => value !== lesson.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {lesson.title}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};
