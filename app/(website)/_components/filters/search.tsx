"use client";

import { SearchIcon, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchProps {
  term?: string;
}

export const Search = ({ term }: SearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams()!;

  const [value, setValue] = useState(term);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("term", value);
    } else {
      params.delete("term");
    }

    router.push(`/?${params.toString()}`);
  };

  const onClear = () => {
    setValue("");

    const params = new URLSearchParams(searchParams);
    params.delete("term");

    router.push(`/?${params.toString()}`);
  };

  return (
    <form onSubmit={onSubmit} className="relative w-full flex items-center">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {value && (
        <X
          className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
          onClick={onClear}
        />
      )}
      <Button
        type="submit"
        size="sm"
        variant="secondary"
        className="rounded-l-none"
      >
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
};
