import { db } from "@/lib/db";

interface getSearchParams {
  term?: string;
  tags?: string[];
}

export const getSearch = async ({ term, tags }: getSearchParams) => {
  let whereClause = {};

  if (term) {
    whereClause = {
      ...whereClause,
      title: {
        contains: term,
      },
    };
  }

  if (tags) {
    let inCondition;
    if (Array.isArray(tags)) {
      inCondition = {
        in: tags,
      };
    } else {
      inCondition = {
        contains: tags,
      };
    }

    whereClause = {
      ...whereClause,
      tags: {
        some: {
          tag: {
            name: inCondition,
          },
        },
      },
    };
  }

  const streams = await db.lesson.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    where: whereClause,
  });

  return streams;
};
