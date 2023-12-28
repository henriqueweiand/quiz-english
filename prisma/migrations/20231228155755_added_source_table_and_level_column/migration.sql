/*
  Warnings:

  - Added the required column `difficultyLevel` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- CreateEnum
CREATE TYPE "SourceTypes" AS ENUM ('Podcast', 'News', 'Article', 'Video', 'SocialNetwork', 'Website');

-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "difficultyLevel" "DifficultyLevel" NOT NULL;

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "type" "SourceTypes" NOT NULL,
    "url" TEXT,
    "title" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "question_id" TEXT NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
