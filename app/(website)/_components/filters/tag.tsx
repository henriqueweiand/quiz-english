"use client";

import { Badge } from "@/components/ui/badge";

interface TagProps {
  name: string;
  active: boolean;
  onClick: () => void;
}

export const Tag: React.FC<TagProps> = ({ name, active, onClick }) => {
  return (
    <Badge variant={active ? "default" : "outline"} onClick={onClick}>
      {name}
    </Badge>
  );
};
