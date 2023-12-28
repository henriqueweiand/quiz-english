/*
  Warnings:

  - You are about to drop the column `question_id` on the `Source` table. All the data in the column will be lost.
  - You are about to drop the column `difficultyLevel` on the `questions` table. All the data in the column will be lost.
  - Added the required column `lesson_id` to the `Source` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficultyLevel` to the `lesson` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Source" DROP CONSTRAINT "Source_question_id_fkey";

-- AlterTable
ALTER TABLE "Source" DROP COLUMN "question_id",
ADD COLUMN     "lesson_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "lesson" ADD COLUMN     "difficultyLevel" "DifficultyLevel" NOT NULL;

-- AlterTable
ALTER TABLE "options" ADD COLUMN     "lessonId" TEXT;

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "difficultyLevel";

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
