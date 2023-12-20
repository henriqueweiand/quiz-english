"use client";

import { Option as OptionModel } from "@prisma/client";
import { Option } from "./option";
import { Title } from "../title";

interface ChooseOneProps {
  title: string;
  options: OptionModel[];
  next: () => void;
}

const ChooseOne = ({ title, options, next }: ChooseOneProps) => {
  const onChange = (isCorrect: boolean) => {
    if (isCorrect) {
      setTimeout(() => {
        !!next && next();
      }, 1000);
    }
  };

  return (
    <>
      <Title value={title} />

      {!!options && (
        <div className="space-y-4">
          {options.map((option) => {
            return (
              <Option
                onChange={onChange}
                isCorrect={option.isCorrect}
                key={option.id}
                label={option.content}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default ChooseOne;
