"use client";

interface TextProps {
  value: string;
}

export const Text: React.FC<TextProps> = ({ value }) => {
  return <div className="text-gray-700">{value}</div>;
};
