import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Nav = () => {
  return (
    <nav aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2">
        <li>
          <div className="flex items-center text-sm">
            <Button asChild variant={'link'} className="ml-0 pl-0">
              <Link href="/">Return to the list</Link>
            </Button>
          </div>
        </li>
      </ol>
    </nav>
  );
};
