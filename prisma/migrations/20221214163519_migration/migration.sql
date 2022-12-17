/*
  Warnings:

  - You are about to drop the column `name` on the `category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `name`,
    ADD COLUMN `title` VARCHAR(255) NULL;
