/*
  Warnings:

  - Made the column `url` on table `Source` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Source" ALTER COLUMN "url" SET NOT NULL;

-- CreateTable
CREATE TABLE "lesson_relation" (
    "id" TEXT NOT NULL,
    "lesson_id" TEXT NOT NULL,
    "related_lesson_id" TEXT NOT NULL,

    CONSTRAINT "lesson_relation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lesson_relation" ADD CONSTRAINT "lesson_relation_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
