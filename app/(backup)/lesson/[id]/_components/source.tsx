import { BadgeWithLink } from "@/app/(website)/_components/badge-with-link";
import { Button } from "@/components/ui/button";
import { SourceTypes } from "@prisma/client";
import { Anchor, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

interface SourceProps {
    type: SourceTypes;
    title?: string | null;
    url: string;
}

export const Source = ({ type, title, url }: SourceProps) => {
    return (
        <Link href={url} target="_blank">
            <Button variant={'link'}>
                <ExternalLinkIcon className="mr-2 h-4 w-4" /> {!!title ? title : type}
            </Button>
        </Link>

    );
};
