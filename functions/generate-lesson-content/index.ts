import { PrismaClient } from "@prisma/client";

import { createLanguageModel } from "typechat";

export async function generateLessonContent({
  prisma,
  lessonGrade,
  lessonNumber,
}: {
  prisma: PrismaClient;
  lessonGrade: number;
  lessonNumber: number;
}) {
  const lesson = await prisma.lesson.findUnique({
    where: {
      grade_number: {
        grade: lessonGrade,
        number: lessonNumber,
      },
    },
    select: {
      words: true,
    },
  });
  // use the lesson vocabulary and typechat to generate example sentences
  const model = createLanguageModel(process.env);

  // use the example sentences to search giphy api and create gif srcs for each example sentence
}
