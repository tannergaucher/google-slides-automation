import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
import { slides_v1 } from "googleapis";
import { compact } from "lodash";

import { Lesson } from "../../types";

export function createTitleSlideRequests({ lesson }: { lesson: Lesson }) {
  const sectionSlideId = uuidv4();
  const titleObjectId = uuidv4();
  const bodyObjectId = uuidv4();

  const titleSlideRequests: slides_v1.Schema$Request[] = [
    {
      createSlide: {
        objectId: sectionSlideId,
        slideLayoutReference: {
          predefinedLayout: "TITLE_AND_BODY",
        },
        placeholderIdMappings: [
          {
            layoutPlaceholder: {
              type: "TITLE",
            },
            objectId: titleObjectId,
          },
          {
            layoutPlaceholder: {
              type: "BODY",
            },
            objectId: bodyObjectId,
          },
        ],
      },
    },
    {
      insertText: {
        objectId: titleObjectId,
        text: `Unit ${lesson.unitNumber} - ${lesson.unitTitle}`,
      },
    },
    {
      insertText: {
        objectId: bodyObjectId,
        text: `Grade ${lesson.grade} - Lesson ${lesson.lessonNumber}`,
      },
    },
  ];

  return titleSlideRequests;
}

export function createWarmUpSlideRequests({ lesson }: { lesson: Lesson }) {
  const warmUpSlideId = uuidv4();
  const titleObjectId = uuidv4();
  const bodyObjectId = uuidv4();

  const warmUpSlideRequests: slides_v1.Schema$Request[] = [
    {
      createSlide: {
        objectId: warmUpSlideId,
        slideLayoutReference: {
          predefinedLayout: "TITLE_AND_BODY",
        },
        placeholderIdMappings: [
          {
            layoutPlaceholder: {
              type: "TITLE",
            },
            objectId: titleObjectId,
          },
          {
            layoutPlaceholder: {
              type: "BODY",
            },
            objectId: bodyObjectId,
          },
        ],
      },
    },
    {
      insertText: {
        objectId: titleObjectId,
        text: "Warm Up",
      },
    },
    {
      insertText: {
        objectId: bodyObjectId,
        text: `${lesson.warmUp.type}`,
      },
    },
  ];

  return warmUpSlideRequests;
}

export function createObjectivesSlideRequests({ lesson }: { lesson: Lesson }) {
  const objectivesSlideId = uuidv4();
  const titleObjectId = uuidv4();
  const bodyObjectId = uuidv4();

  const objectivesSlideRequests: slides_v1.Schema$Request[] = [
    {
      createSlide: {
        objectId: objectivesSlideId,
        slideLayoutReference: {
          predefinedLayout: "TITLE_AND_BODY",
        },
        placeholderIdMappings: [
          {
            layoutPlaceholder: {
              type: "TITLE",
            },
            objectId: titleObjectId,
          },
          {
            layoutPlaceholder: {
              type: "BODY",
            },
            objectId: bodyObjectId,
          },
        ],
      },
    },
    {
      insertText: {
        objectId: titleObjectId,
        text: "Today we will:\n",
      },
    },
    {
      insertText: {
        objectId: bodyObjectId,
        text: "3. Play: \n",
      },
    },
    {
      insertText: {
        objectId: bodyObjectId,
        text: `2. Practice: ${lesson.reading?.strategy}\n`,
      },
    },
    {
      insertText: {
        objectId: bodyObjectId,
        text: `1. Skill: ${lesson.lessonType}\n`,
      },
    },
  ];

  return objectivesSlideRequests;
}

export async function createVocabularySlideRequests({
  lesson,
  prisma,
}: {
  lesson: Lesson;
  prisma: PrismaClient;
}) {
  const sources = await prisma.word.findMany({
    where: {
      word: {
        in: lesson.vocabulary || [],
      },
    },
  });

  const vocabularySlidesData =
    lesson.vocabulary?.map((word) => {
      return {
        slideId: uuidv4(),
        titleObjectId: uuidv4(),
        bodyObjectId: uuidv4(),
        word,
        sources: sources.filter((source) => source.word === word),
      };
    }) || [];

  const vocabularySlidesRequests = vocabularySlidesData.map((slide) => {
    const imageObjectId = uuidv4();

    return [
      {
        createSlide: {
          objectId: slide.slideId,
          slideLayoutReference: {
            predefinedLayout: "TITLE_AND_BODY",
          },
          placeholderIdMappings: [
            {
              layoutPlaceholder: {
                type: "TITLE",
              },
              objectId: slide.titleObjectId,
            },
            {
              layoutPlaceholder: {
                type: "BODY",
              },
              objectId: slide.bodyObjectId,
            },
          ],
        },
      },
      {
        insertText: {
          objectId: slide.titleObjectId,
          text: slide.word,
        },
      },
      {
        insertText: {
          objectId: slide.bodyObjectId,
          text: "Definition: ",
        },
      },
      {
        insertText: {
          objectId: slide.bodyObjectId,
          text: "Example: ",
        },
      },
      // ...slide.sources.map((source) => {
      //   return {
      //     createImage: {
      //       objectId: imageObjectId,
      //       url: source,
      //       elementProperties: {
      //         pageObjectId: slide.slideId,
      //         size: {
      //           height: {
      //             magnitude: 100,
      //             unit: "PT",
      //           },
      //           width: {
      //             magnitude: 100,
      //             unit: "PT",
      //           },
      //         },
      //         transform: {
      //           scaleX: 1,
      //           scaleY: 1,
      //           translateX: 100,
      //           translateY: 100,
      //           unit: "PT",
      //         },
      //       },
      //     },
      //   };
      // }),
    ];
  });

  return vocabularySlidesRequests;
}

export function createStudentBooksOpenSlideRequests({
  lesson,
}: {
  lesson: Lesson;
}) {
  const booksOpenSlideId = uuidv4();
  const titleObjectId = uuidv4();
  const bodyObjectId = uuidv4();

  const booksOpenSlideRequests: slides_v1.Schema$Request[] = [
    {
      createSlide: {
        objectId: booksOpenSlideId,
        slideLayoutReference: {
          predefinedLayout: "TITLE_AND_BODY",
        },
        placeholderIdMappings: [
          {
            layoutPlaceholder: {
              type: "TITLE",
            },
            objectId: titleObjectId,
          },
          {
            layoutPlaceholder: {
              type: "BODY",
            },
            objectId: bodyObjectId,
          },
        ],
      },
    },
    {
      insertText: {
        objectId: titleObjectId,
        text: "Books Open!",
      },
    },
    {
      insertText: {
        objectId: bodyObjectId,
        text: `Page: ${lesson.studentBookStartPage}`,
      },
    },
  ];

  return booksOpenSlideRequests;
}

export function createWorkbooksOpenSlideRequests({
  lesson,
}: {
  lesson: Lesson;
}) {
  const workbooksOpenSlideId = uuidv4();
  const titleObjectId = uuidv4();
  const bodyObjectId = uuidv4();

  const workbooksOpenSlideRequests: slides_v1.Schema$Request[] = [
    {
      createSlide: {
        objectId: workbooksOpenSlideId,
        slideLayoutReference: {
          predefinedLayout: "TITLE_AND_BODY",
        },
        placeholderIdMappings: [
          {
            layoutPlaceholder: {
              type: "TITLE",
            },
            objectId: titleObjectId,
          },
          {
            layoutPlaceholder: {
              type: "BODY",
            },
            objectId: bodyObjectId,
          },
        ],
      },
    },
    {
      insertText: {
        objectId: titleObjectId,
        text: "Workbooks Open!",
      },
    },
    {
      insertText: {
        objectId: bodyObjectId,
        text: `Page: ${lesson.workbookStartPage}`,
      },
    },
  ];

  return workbooksOpenSlideRequests;
}
