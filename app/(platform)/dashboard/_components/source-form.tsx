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
import { UseFormReturn, useFieldArray } from "react-hook-form";

interface SourceFormProps {
  form: UseFormReturn<any>;
  sourceTypes: string[];
}

export function SourceForm({ form, sourceTypes }: SourceFormProps) {
  const { fields, append, remove } = useFieldArray({
    name: "source",
    control: form.control,
  });

  return (
    <>
      {fields.map((field, index) => (
        <span key={field.id}>
          <FormField
            control={form.control}
            name={`source.${index}.title`}
            render={({ field: { value, ...rest } }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...rest} value={value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`source.${index}.type`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the level of the lesson" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sourceTypes.map((sourceType) => (
                      <SelectItem key={sourceType} value={sourceType}>
                        {sourceType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`source.${index}.url`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => remove(index)}
          >
            Remove
          </Button>
        </span>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => append({ value: "" })}
      >
        Add URL
      </Button>
    </>
  );
}
