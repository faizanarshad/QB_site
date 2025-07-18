/*
  Warnings:

  - A unique constraint covering the columns `[serviceId,name]` on the table `service_benefits` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "service_benefits_serviceId_name_key" ON "service_benefits"("serviceId", "name");
