import { redirect } from "next/navigation";

import { getLesson } from "@/lib/get-lesson";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LessonPageProps {
  params: {
    id: string;
  };
}

const LessonPage = async ({ params }: LessonPageProps) => {
  if (!params.id) {
    redirect("/lessons");
  }

  const lesson = await getLesson(params.id);
  const link = `/lessons/${params.id}/play`;

  return (
    <>
      <div>{lesson.title}</div>
      {/* <div>{JSON.stringify(lesson)}</div> */}

      <Link href={link}>
        <Button>Play</Button>
      </Link>
    </>
  );
};

export default LessonPage;
