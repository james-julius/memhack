/*
  Warnings:

  - Added the required column `dollar` to the `Companion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Companion" ADD COLUMN     "dollar" TEXT NOT NULL;
