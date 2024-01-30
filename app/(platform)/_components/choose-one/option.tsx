"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Cross2Icon, CheckIcon, CircleIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface OptionProps {
  label: string;
  isCorrect: boolean;
  onChange: (isCorrect: boolean) => void;
}

export const Option = ({ label, isCorrect, onChange }: OptionProps) => {
  const [selected, setSelected] = useState(false);

  const onClick = () => {
    setSelected(true);

    !!onChange && onChange(isCorrect);
  };

  const showCorrection = selected;

  return (
    <Card
      className={cn("w-ful", showCorrection ? (isCorrect ? `border-green-300` : `border-red-300`) : ``)}
      onClick={onClick}
    >
      <CardContent className={cn("flex justify-between items-center flex-nowrap py-2")}>
        <div className="text-wrap text-left flex-1">
          {label}
        </div>

        {showCorrection ? (
          isCorrect ? (
            <CheckIcon className="ml-2 !h-4 !w-4" color="green" />
          ) : (
            <Cross2Icon className="ml-2 !h-4 !w-4" color="red" />
          )
        ) : (
          <CircleIcon className="ml-2 !h-4 !w-4" />
        )}
      </CardContent>
    </Card>
  );
};
