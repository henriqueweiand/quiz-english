'use client'

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

interface LessonsPaginationProps {
    currentPage?: number;
    totalPages: number;
}

export function LessonsPagination({ currentPage = 1, totalPages }: LessonsPaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const searchParams = useSearchParams()!;

    const pageRender = (page: number) => {
        const params = new URLSearchParams(searchParams);
        const pageExists = params.get('page');

        if (pageExists) {
            params.delete("page");
        }
        params.append("page", `${page}`);

        return `/?${params.toString()}`;
    };

    return (
        <Pagination>
            <PaginationContent>
                {
                    currentPage != 1 && (
                        <PaginationItem>
                            <PaginationPrevious href={pageRender(Number(currentPage) - 1)} />
                        </PaginationItem>
                    )
                }

                {pages.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink href={pageRender(Number(page))} isActive={page === Number(currentPage)}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext href={pageRender(Number(currentPage) + 1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
