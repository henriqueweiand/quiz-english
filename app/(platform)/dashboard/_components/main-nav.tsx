import Link from "next/link";

import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs";

export async function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { userId } = auth();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Website
      </Link>
      {
        (userId === "user_2bKX3bD3mYc4dSSLJCvOdsAQ2ag" || userId === "user_2bKboVbNZoYdLB9ijIJ7crf8QnL") ? (
          <>
            <Link
              href="/dashboard/create"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Create
            </Link>
            <Link
              href="/dashboard/list"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              List
            </Link>
          </>
        ) : ''
      }

    </nav>
  );
}
