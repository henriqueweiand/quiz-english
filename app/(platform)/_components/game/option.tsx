"use client";

import { FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface OptionProps {
  content: string;
}

export const Option: React.FC<OptionProps> = ({ content }) => {
  return (
    <FormItem className="flex items-center space-x-3 space-y-0">
      <FormControl>
        <RadioGroupItem value={content} />
      </FormControl>
      <FormLabel className="font-normal">{content}</FormLabel>
    </FormItem>
  );
};
