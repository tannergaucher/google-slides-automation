import { slides_v1 } from "googleapis";
import { Lesson } from "./types";

import { PrismaClient } from "@prisma/client";

import {
  createTitleSlideRequests,
  createWarmUpSlideRequests,
  createObjectivesSlideRequests,
  createVocabularySlideRequests,
  createBooksOpenSlideRequests,
} from "./functions/slides/index";

export async function batchUpdatePresentation({
  slidesClient,
  lesson,
  prisma,
}: {
  slidesClient: slides_v1.Slides;
  lesson: Lesson;
  prisma: PrismaClient;
}) {
  slidesClient.presentations.batchUpdate(
    {
      presentationId: lesson.presentationId,
      requestBody: {
        requests: [
          ...createTitleSlideRequests({ lesson }),
          ...createWarmUpSlideRequests({ lesson }),
          ...createObjectivesSlideRequests({ lesson }),
          ...(await createVocabularySlideRequests({ lesson, prisma })),
          ...createBooksOpenSlideRequests({ lesson }),
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
