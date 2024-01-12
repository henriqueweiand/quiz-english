import { getTags } from "@/lib/get-tags";
import { CreateClientPage } from "./page-client";
import { getLessons } from "@/lib/get-lessons";

interface CreatePageProps {}

const CreatePage = async ({}: CreatePageProps) => {
  const tags = await getTags();
  const lessons = await getLessons();

  return <CreateClientPage tags={tags} lessons={lessons} />;
};

export default CreatePage;
