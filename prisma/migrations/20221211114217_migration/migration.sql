/*
  Warnings:

  - You are about to drop the column `time` on the `comments` table. All the data in the column will be lost.
  - Added the required column `date` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` DROP COLUMN `time`,
    ADD COLUMN `date` VARCHAR(255) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `items` ADD COLUMN `author` VARCHAR(255) NOT NULL,
    ADD COLUMN `category_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` INTEGER NOT NULL DEFAULT 0;
