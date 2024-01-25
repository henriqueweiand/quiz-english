import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/20/solid";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { ReactNode } from "react";

interface MobileFiltersProps {
    children: ReactNode;
}

export function MobileFilters({ children }: MobileFiltersProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="inline-flex items-center lg:hidden">
                    <PlusIcon
                        className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                    />
                    Filters
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="mb-5">
                    <SheetTitle>Filters</SheetTitle>
                </SheetHeader>

                {children}
            </SheetContent>
        </Sheet>
    )
}
