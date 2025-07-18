/*
  Warnings:

  - A unique constraint covering the columns `[name,company]` on the table `testimonials` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "testimonials_name_company_key" ON "testimonials"("name", "company");
