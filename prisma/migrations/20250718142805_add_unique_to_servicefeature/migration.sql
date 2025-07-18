/*
  Warnings:

  - A unique constraint covering the columns `[serviceId,name]` on the table `service_features` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "service_features_serviceId_name_key" ON "service_features"("serviceId", "name");
