-- CreateTable
CREATE TABLE "Word" (
    "word" STRING NOT NULL,
    "sources" STRING[],

    CONSTRAINT "Word_pkey" PRIMARY KEY ("word")
);
