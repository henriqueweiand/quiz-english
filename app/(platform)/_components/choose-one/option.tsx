"use client";

import { cn } from "@/lib/utils";
import { CircleIcon } from "lucide-react";
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
    <label className="block">
      <input
        className="hidden peer"
        name="question"
        required
        type="radio"
        onChange={onClick}
      />
      <div
        className={cn(
          "flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer",
          showCorrection
            ? isCorrect
              ? "border-green-500"
              : "border-red-500"
            : ""
        )}
      >
        <span className="text-sm ">{label}</span>

        <CircleIcon
          className="text-gray-300"
          color={showCorrection ? (isCorrect ? "green" : "red") : "gray"}
        />
      </div>
    </label>
  );
};
