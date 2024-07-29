import { slides_v1 } from "googleapis";
import { v4 as uuidv4 } from "uuid";
import { Lesson } from "./types";

function createTitleSlideRequests({ lesson }: { lesson: Lesson }) {
  const titleSlideId = uuidv4();
  const titleSlideShapeObjectId = uuidv4();

  const titleSlideRequests: slides_v1.Schema$Request[] = [
    {
      createSlide: {
        objectId: titleSlideId,
        slideLayoutReference: {
          predefinedLayout: "BLANK",
        },
      },
    },
    {
      createShape: {
        objectId: titleSlideShapeObjectId,
        shapeType: "TEXT_BOX",
        elementProperties: {
          pageObjectId: titleSlideId,
          size: {
            height: { magnitude: 100, unit: "PT" },
            width: { magnitude: 600, unit: "PT" },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 60,
            translateY: 30,
            unit: "PT",
          },
        },
      },
    },
    {
      insertText: {
        objectId: titleSlideShapeObjectId,
        insertionIndex: 0,
        text: lesson.unitTitle,
      },
    },
    {
      updateTextStyle: {
        objectId: titleSlideShapeObjectId,
        style: {
          fontFamily: "Inter",
          fontSize: {
            magnitude: 36,
            unit: "PT",
          },
          foregroundColor: {
            opaqueColor: {
              rgbColor: {
                red: 0,
                green: 0,
                blue: 0,
              },
            },
          },
        },
        textRange: {
          type: "ALL",
        },
        fields: "fontFamily,fontSize,foregroundColor",
      },
    },
    {
      updateParagraphStyle: {
        objectId: titleSlideShapeObjectId,
        style: {
          alignment: "CENTER",
        },
        textRange: {
          type: "ALL",
        },
        fields: "alignment",
      },
    },
  ];

  return titleSlideRequests;
}

function createWarmUpSlideRequests({ lesson }: { lesson: Lesson }) {
  const warmUpSlideId = uuidv4();
  const warmUpSlideShapeObjectId = uuidv4();

  const warmUpSlideRequests: slides_v1.Schema$Request[] = [
    {
      createSlide: {
        objectId: warmUpSlideId,
        slideLayoutReference: {
          predefinedLayout: "BLANK",
        },
      },
    },
    {
      createShape: {
        objectId: warmUpSlideShapeObjectId,
        shapeType: "TEXT_BOX",
        elementProperties: {
          pageObjectId: warmUpSlideId,
          size: {
            height: { magnitude: 100, unit: "PT" },
            width: { magnitude: 600, unit: "PT" },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 60,
            translateY: 30,
            unit: "PT",
          },
        },
      },
    },
    {
      insertText: {
        objectId: warmUpSlideShapeObjectId,
        insertionIndex: 0,
        text: "Warm Up!",
      },
    },
    {
      updateTextStyle: {
        objectId: warmUpSlideShapeObjectId,
        style: {
          fontFamily: "Inter",
          fontSize: {
            magnitude: 36,
            unit: "PT",
          },
          foregroundColor: {
            opaqueColor: {
              rgbColor: {
                red: 0,
                green: 0,
                blue: 0,
              },
            },
          },
        },
        textRange: {
          type: "ALL",
        },
        fields: "fontFamily,fontSize,foregroundColor",
      },
    },
    {
      updateParagraphStyle: {
        objectId: warmUpSlideShapeObjectId,
        style: {
          alignment: "CENTER",
        },
        textRange: {
          type: "ALL",
        },
        fields: "alignment",
      },
    },
  ];

  return warmUpSlideRequests;
}

function createObjectivesSlideRequests({ lesson }: { lesson: Lesson }) {
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
    {
      updateTextStyle: {
        objectId: titleObjectId,
        textRange: {
          type: "ALL",
        },
        style: {
          fontFamily: "Inter",
        },
        fields: "fontFamily",
      },
    },
    {
      updateTextStyle: {
        objectId: bodyObjectId,
        textRange: {
          type: "ALL",
        },
        style: {
          fontFamily: "Inter",
        },
        fields: "fontFamily",
      },
    },
  ];

  return objectivesSlideRequests;
}

function createReadingVocabularySlideRequests({ lesson }: { lesson: Lesson }) {
  // create ids for each slide

  const readingVocabSlides =
    lesson.vocabulary?.readingTextWords?.map((word) => {
      return {
        slideId: uuidv4(),
        titleObjectId: uuidv4(),
        bodyObjectId: uuidv4(),
        word,
      };
    }) || [];

  // now we can create the requests for each slide
  const readingVocabSlideRequests = readingVocabSlides.map((slide) => {
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
    ];
  });

  return readingVocabSlideRequests;
}

export function batchUpdatePresentation({
  slidesClient,
  lesson,
}: {
  slidesClient: slides_v1.Slides;
  lesson: Lesson;
}) {
  const lessonContentSlideRequests =
    lesson.lessonType === "Reading"
      ? createReadingVocabularySlideRequests({ lesson })
      : [];

  slidesClient.presentations.batchUpdate(
    {
      presentationId: lesson.presentationId,
      requestBody: {
        requests: [
          ...createTitleSlideRequests({ lesson }),
          ...createWarmUpSlideRequests({ lesson }),
          ...createObjectivesSlideRequests({ lesson }),
          ...lessonContentSlideRequests,
        ].flat(),
      },
    },
    (err: any, res: any) => {
      if (err) {
        console.error(err, "err");
        return;
      }

      if (res?.statusText === "OK") {
        console.log("Slides updated successfully");
        console.log(res.data);
      }
    }
  );
}
