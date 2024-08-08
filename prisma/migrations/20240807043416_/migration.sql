-- CreateTable
CREATE TABLE "Lesson" (
    "grade" INT4 NOT NULL,
    "number" INT4 NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("grade","number")
);

-- CreateTable
CREATE TABLE "Word" (
    "word" STRING NOT NULL,
    "sources" STRING[],
    "lessonGrade" INT4,
    "lessonNumber" INT4,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("word")
);

-- CreateTable
CREATE TABLE "ExampleSentence" (
    "id" INT4 NOT NULL,
    "sentence" STRING NOT NULL,
    "wordId" STRING NOT NULL,

    CONSTRAINT "ExampleSentence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_lessonGrade_lessonNumber_fkey" FOREIGN KEY ("lessonGrade", "lessonNumber") REFERENCES "Lesson"("grade", "number") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExampleSentence" ADD CONSTRAINT "ExampleSentence_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("word") ON DELETE RESTRICT ON UPDATE CASCADE;
