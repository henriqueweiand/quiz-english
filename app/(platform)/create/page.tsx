import { getTags } from "@/lib/get-tags";
import { CreateClientPage } from "./page-client";
import { getLessons } from "@/lib/get-lessons";
import { DifficultyLevel, SourceTypes } from "@prisma/client";

interface CreatePageProps {}

const CreatePage = async ({}: CreatePageProps) => {
  const tags = await getTags();
  const lessons = await getLessons();

  const difficultyLevels: string[] = Object.values(DifficultyLevel);
  const sourceTypes: string[] = Object.values(SourceTypes);

  return (
    <CreateClientPage
      tags={tags}
      lessons={lessons}
      difficultyLevels={difficultyLevels}
      sourceTypes={sourceTypes}
    />
  );
};

export default CreatePage;
