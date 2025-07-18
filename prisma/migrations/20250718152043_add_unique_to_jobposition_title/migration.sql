/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `job_positions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "job_positions_title_key" ON "job_positions"("title");
