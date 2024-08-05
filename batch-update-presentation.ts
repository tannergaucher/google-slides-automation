import { PrismaClient } from "@prisma/client";
import { slides_v1 } from "googleapis";

import {
  createTitleSlideRequests,
  createWarmUpSlideRequests,
  createObjectivesSlideRequests,
  createVocabularySlideRequests,
  createStudentBooksOpenSlideRequests,
  createWorkbooksOpenSlideRequests,
} from "./functions/slides/index";

import { type Lesson } from "./types";

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
          ...createStudentBooksOpenSlideRequests({ lesson }),
          ...createWorkbooksOpenSlideRequests({ lesson }),
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
