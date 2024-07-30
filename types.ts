export interface Lesson {
  presentationId: string;
  grade: 2 | 3;
  lessonNumber: number;
  unitTitle: string;
  unitNumber: number;
  unitBigQuestion: string;
  studentBookStartPage: number;
  studentBookEndPage: number;
  workbookStartPage: number;
  workbookEndPage: number;
  lessonType:
    | "Reading"
    | "Vocabulary"
    | "Grammar"
    | "Listening"
    | "Speaking"
    | "Writing"
    | "Wrap Up";
  warmUp: {
    type: "Alphabet Race" | "Word Shake";
  };
  reading?: {
    content: string;
    strategy: string;
  };
  vocabulary?: {
    readingTextWords?: string[];
    listeningTextWords?: string[];
    wordStudy?: string;
  };
  grammar?: {
    grammarPoint: string;
    examples: string[];
  };
  listening?: {
    subject: string;
    subjectDescription: string;
    strategy: string;
  };
  speaking?: {
    subject: string;
    examples: string[];
  };
  writing?: {
    task: string;
  };
}
