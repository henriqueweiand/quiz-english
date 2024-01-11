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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Item {
  id: string;
  label: string;
}

interface TagFormProps {
  form: any;
  tags: Item[] | any;
}

export function TagForm({ form, tags }: TagFormProps) {
  const [newTag, setNewTag] = useState("");

  const submitNewTag = () => {
    if (newTag)
      tags.push({
        id: newTag,
        label: newTag,
      });
  };

  return (
    <>
      <div className="mb-4">
        <FormLabel className="text-base">Tags</FormLabel>
        <FormDescription>Select tags or create a new one</FormDescription>
      </div>

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
            {tags.map((item: Item) => (
              <FormField
                key={item.id}
                control={form.control}
                name="tags"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
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
}
