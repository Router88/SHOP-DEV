/*
  Warnings:

  - You are about to drop the column `password` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `category` table. All the data in the column will be lost.
  - Added the required column `description` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `password`,
    DROP COLUMN `username`,
    ADD COLUMN `description` VARCHAR(255) NOT NULL,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(255) NOT NULL,
    `time` VARCHAR(255) NOT NULL,
    `item_id` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
