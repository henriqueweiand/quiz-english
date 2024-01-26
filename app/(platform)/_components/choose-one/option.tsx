"use client";

import { Button } from "@/components/ui/button";
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
    <Button
      size={"lg"}
      className="w-full flex items-center justify-between text-left"
      variant={
        showCorrection ? (isCorrect ? `default` : `destructive`) : `outline`
      }
      disabled={showCorrection ? true : false}
      type="button"
      onClick={onClick}
    >
      <span className="text-sm flex-1 text-left text-balance">{label}</span>

      {showCorrection ? (
        isCorrect ? (
          <CheckIcon className="ml-2 h-4 w-4" color="green" />
        ) : (
          <Cross2Icon className="ml-2 h-4 w-4" color="red" />
        )
      ) : (
        <CircleIcon className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
};
