import { PrismaClient } from "@prisma/client";
import { Lesson } from "../../types";

import { unit1lesson1 } from "../../lessons/grade-2/unit-1/lesson-1";

export async function createLesson({
  prisma,
  lesson,
}: {
  prisma: PrismaClient;
  lesson: Lesson;
}) {
  const lessonName = `Grade ${lesson.grade} - Unit ${lesson.unitNumber} - Lesson ${lesson.lessonNumber}`;

  await prisma.lesson.upsert({
    where: {
      grade_number: {
        grade: lesson.grade,
        number: lesson.lessonNumber,
      },
    },
    create: {
      name: lessonName,
      number: lesson.lessonNumber,
      grade: lesson.grade,
      words: {
        connectOrCreate: lesson.vocabulary?.map((word) => ({
          where: { word },
          create: { word },
        })),
      },
    },
    update: {
      name: lessonName,
      number: lesson.lessonNumber,
      grade: lesson.grade,
      words: {
        connectOrCreate: lesson.vocabulary?.map((word) => ({
          where: { word },
          create: { word },
        })),
      },
    },
  });

  // and publish to the generate-lesson-content topic
}

createLesson({ prisma: new PrismaClient(), lesson: unit1lesson1 });
