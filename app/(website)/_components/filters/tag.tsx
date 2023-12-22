"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface TagProps {
  name: string;
  active: boolean;
  href:
    | {
        pathname: string;
        query?: { [index: string]: string };
      }
    | string;
}

export const Tag: React.FC<TagProps> = ({ name, active, href }) => {
  return (
    <Link href={href}>
      <Badge variant={active ? "default" : "outline"}>{name}</Badge>
    </Link>
  );
};
