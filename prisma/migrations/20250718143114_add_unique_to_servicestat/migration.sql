/*
  Warnings:

  - A unique constraint covering the columns `[serviceId,key]` on the table `service_stats` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "service_stats_serviceId_key_key" ON "service_stats"("serviceId", "key");
