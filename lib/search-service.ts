import { db } from "@/lib/db";

interface getSearchParams {
  term?: string;
  tags?: string[];
  levels?: string[];
  sources?: string[];
  page?: number;
  perPage?: number;
}

export const getSearch = async ({
  term,
  tags,
  levels,
  sources,
  page = 1,
  perPage = 15
}: getSearchParams) => {
  const skip = (page - 1) * perPage;
  let whereClause = {};

  if (term) {
    whereClause = {
      ...whereClause,
      title: {
        contains: term,
      },
    };
  }

  if (levels) {
    let inCondition = null;
    if (Array.isArray(levels)) {
      inCondition = {
        in: levels,
      };
    } else {
      inCondition = levels;
    }

    whereClause = {
      ...whereClause,
      difficultyLevel: inCondition,
    };
  }

  if (sources) {
    let inCondition = null;
    if (Array.isArray(sources)) {
      inCondition = {
        in: sources,
      };
    } else {
      inCondition = sources;
    }

    whereClause = {
      ...whereClause,
      source: {
        some: {
          type: inCondition,
        },
      },
    };
  }

  if (tags) {
    let inCondition = null;
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
    skip,
    take: perPage,
    include: {
      questions: {
        include: {
          question: true,
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
      source: true,
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
