import { db } from "@/lib/db";
import { DifficultyLevel, SourceTypes } from "@prisma/client";

const sampleData = {
  "Lesson": [
    {
      "title": "Exploring Present Perfect Tense",
      "description": "Dive into the usage of the present perfect tense in English grammar. Understand how to form and use present perfect tense through various examples and exercises.",
      "sources": [
        {
          "type": SourceTypes.Video,
          "url": "https://www.youtube.com/watch?v=hZVNbKSFrY0&ab_channel=Ecolinguist"
        }
      ],
      "questions": [
        {
          "title": "What is the correct present perfect tense form of the verb 'eat'?",
          "options": [
            {
              "content": "Eated",
              "isCorrect": false,
            },
            {
              "content": "Ate",
              "isCorrect": false,
            },
            {
              "content": "Have eaten",
              "isCorrect": true,
            },
          ]
        },
        {
          "title": "Which sentence uses the present perfect tense?",
          "options": [
            {
              "content": "They will visit Paris next month.",
              "isCorrect": false,
            },
            {
              "content": "She has lived in London for five years.",
              "isCorrect": true,
            },
            {
              "content": "I am going to the store later.",
              "isCorrect": false,
            },
          ]
        },
        {
          "title": "What is the present perfect continuous tense of the sentence: 'She has been studying all morning.'?",
          "options": [
            {
              "content": "She studied",
              "isCorrect": false,
            },
            {
              "content": "She studies",
              "isCorrect": false,
            },
            {
              "content": "She has been studying",
              "isCorrect": true,
            },
          ]
        },
      ],
      "tags": [
        {
          "name": "Present perfect",
        },
      ]
    },
  ],
};



export const generateLesson = async () => {
  const lessonData = sampleData.Lesson[0];

  // Create Lesson
  const lesson = await db.lesson.create({
    data: {
      title: lessonData.title,
      description: lessonData.description,
      difficultyLevel: DifficultyLevel.A1,
    }
  });

  // Create Questions and Options
  const questionPromises = lessonData.questions.map(async (question) => {
    const questionData = await db.question.create({
      data: {
        title: question.title,
      }
    });

    const optionPromises = question.options.map(async (option) => {
      return db.option.create({
        data: {
          content: option.content,
          isCorrect: option.isCorrect,
          questionId: questionData.id,
        }
      });
    });

    await Promise.all(optionPromises);

    await db.lessonQuestion.create({
      data: {
        questionId: questionData.id,
        lessonId: lesson.id,
      }
    });

    return questionData;
  });

  const questions = await Promise.all(questionPromises);

  // Create Tags
  const tagPromises = lessonData.tags.map(async (tag) => {
    const tagExists = await db.tag.findFirst({
      where: {
        name: {
          contains: tag.name,
        },
      },
    });

    let tagData;

    if (!tagExists) {
      tagData = await db.tag.create({
        data: {
          name: tag.name,
        },
      });
    } else {
      tagData = tagExists;
    }

    await db.lessonTag.create({
      data: {
        lessonId: lesson.id,
        tagId: tagData.id,
      },
    });

    return tagData;
  });

  const tags = await Promise.all(tagPromises);

  // Create Source
  const sourcePromises = lessonData.sources.map(async (source) => {
    return await db.source.create({
      data: {
        lessonId: lesson.id,
        type: source.type,
        url: source.url,
      },
    });
  });

  const sources = await Promise.all(sourcePromises);

  return { lesson, questions, tags, sources };
};
