"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface BadgeWithLinkProps {
  name: string;
  active: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top";
  href?:
  | {
    pathname: string;
    query?: { [index: string]: string };
  }
  | string;
}

export const BadgeWithLink: React.FC<BadgeWithLinkProps> = ({
  name,
  active,
  href,
  target = "_self",
}) => {
  return !!href ? (
    <Link href={href} target={target}>
      <Badge variant={active ? "default" : "outline"}>{name}</Badge>
    </Link>
  ) : (
    <Badge variant={active ? "default" : "outline"}>{name}</Badge>
  );
};
