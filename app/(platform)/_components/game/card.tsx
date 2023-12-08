"use client";

interface CardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return (
    <div className="flex justify-between p-10 flex-col bg-white rounded-lg w-full h-full">
      {children}
    </div>
  );
};
