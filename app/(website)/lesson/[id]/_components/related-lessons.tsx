import { Card } from "@/app/(website)/_components/lessons/card";
import { getRelatedLessonsById } from "@/lib/get-related-lessons";

interface RelatedLessonsProps {
    lessonId: string;
}

export const RelatedLessons = async ({ lessonId }: RelatedLessonsProps) => {
    const relatedLessons = await getRelatedLessonsById(lessonId);

    return (
        <>
            {
                relatedLessons.length && relatedLessons.map(relatedLesson => <Card data={relatedLesson} />)
            }
        </>
    );
};
