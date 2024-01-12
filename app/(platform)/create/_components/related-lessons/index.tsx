import { getLessons } from "@/lib/get-lessons";
import { RelatedLessonsForm } from "./form";
import { Suspense } from "react";
import { FormLabel, FormDescription } from "@/components/ui/form";

interface RelatedLessonsProps {
  form: any;
}

export const RelatedLessons = async ({ form }: RelatedLessonsProps) => {
  const lessons = await getLessons();

  return (
    <>
      <div className="mb-4">
        <FormLabel className="text-base">Related lessons</FormLabel>
        <FormDescription>
          Select those lessons that are related to this new one
        </FormDescription>
      </div>
      <Suspense fallback={<>Loading</>}>
        <RelatedLessonsForm form={form} lessons={lessons} />
      </Suspense>
    </>
  );
};
