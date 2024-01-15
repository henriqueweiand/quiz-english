import { getLessons } from "@/lib/get-lessons";
import { ListPage } from "./page-client";

interface CreatePageProps {}

const CreatePage = async ({}: CreatePageProps) => {
  const lessons = await getLessons();

  return <ListPage lessons={lessons} />;
};

export default CreatePage;
