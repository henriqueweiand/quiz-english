import Example from "./example";

interface LessonPageProps {
  params: { id: string };
  searchParams?: {
    tab?: string;
  };
}

const LessonPage = async ({ params, searchParams }: LessonPageProps) => {
  return <Example />;
};

export default LessonPage;
