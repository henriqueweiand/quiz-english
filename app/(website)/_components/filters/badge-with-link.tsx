"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface BadgeWithLinkProps {
  name: string;
  active: boolean;
  href:
  | {
    pathname: string;
    query?: { [index: string]: string };
  }
  | string;
}

export const BadgeWithLink: React.FC<BadgeWithLinkProps> = ({ name, active, href }) => {
  return (
    <Link href={href}>
      <Badge variant={active ? "default" : "outline"}>{name}</Badge>
    </Link>
  );
};
