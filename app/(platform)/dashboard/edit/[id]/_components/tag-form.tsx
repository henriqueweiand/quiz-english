"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Tag } from "@prisma/client";

interface TagFormProps {
  form: any;
  tags?: Partial<Tag>[];
}

export function TagForm({ form, tags: tagsInput = [] }: TagFormProps) {
  const [tags, setTag] = useState(tagsInput);
  const [newTag, setNewTag] = useState("");

  const submitNewTag = () => {
    if (newTag) {
      setTag([
        ...tags,
        {
          id: newTag,
          name: newTag,
        },
      ]);
    }
  };

  return (
    <>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Create a new one"
        />
        <Button type="button" onClick={submitNewTag}>
          Create
        </Button>
      </div>

      <FormField
        control={form.control}
        name="tags"
        render={() => (
          <FormItem>
            {tags.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name="tags"
                render={({ field }) => {
                  const fieldValue = field.value || []; // Provide a default empty array if field.value is undefined

                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={fieldValue.includes(item.name)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...fieldValue, item.name])
                              : field.onChange(
                                  fieldValue.filter(
                                    (value: string) => value !== item.name
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{item.name}</FormLabel>
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
}
