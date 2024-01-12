"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Checkbox } from "@/components/ui/checkbox";
import { Lesson } from "@prisma/client";

interface RelatedLessonsFormProps {
  form: any;
  lessons: Lesson[];
}

export const RelatedLessonsForm = ({
  form,
  lessons,
}: RelatedLessonsFormProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="relatedLessons"
        render={() => (
          <FormItem>
            {lessons.map((lesson) => (
              <FormField
                key={lesson.id}
                control={form.control}
                name="tags"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={lesson.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(lesson.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, lesson.id])
                              : field.onChange(
                                  field.value?.filter(
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
    </>
  );
};
