/*
  Warnings:

  - You are about to drop the `Source` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Source" DROP CONSTRAINT "Source_lesson_id_fkey";

-- DropTable
DROP TABLE "Source";

-- CreateTable
CREATE TABLE "source" (
    "id" TEXT NOT NULL,
    "type" "SourceTypes" NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "lesson_id" TEXT NOT NULL,

    CONSTRAINT "source_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "source" ADD CONSTRAINT "source_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
