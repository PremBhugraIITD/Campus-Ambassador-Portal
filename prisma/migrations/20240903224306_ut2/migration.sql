/*
  Warnings:

  - Added the required column `user_credit` to the `UserTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserTask" ADD COLUMN     "user_credit" INTEGER NOT NULL;
