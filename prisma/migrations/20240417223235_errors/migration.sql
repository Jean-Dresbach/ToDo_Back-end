/*
  Warnings:

  - You are about to drop the column `crated_at` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `crated_at` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "crated_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "crated_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
