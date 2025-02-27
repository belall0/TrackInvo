/*
  Warnings:

  - A unique constraint covering the columns `[user_id,email]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `customers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "customers_user_id_email_key" ON "customers"("user_id", "email");
