/*
  Warnings:

  - You are about to alter the column `item_id` on the `comments` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `category` MODIFY `description` VARCHAR(255) NULL,
    MODIFY `name` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `comments` MODIFY `content` VARCHAR(255) NULL,
    MODIFY `item_id` INTEGER NULL,
    MODIFY `date` VARCHAR(255) NULL,
    MODIFY `user_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `items` MODIFY `title` VARCHAR(255) NULL,
    MODIFY `image` VARCHAR(255) NULL,
    MODIFY `description` VARCHAR(255) NULL,
    MODIFY `author` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `username` VARCHAR(255) NULL,
    MODIFY `password` VARCHAR(255) NULL,
    MODIFY `avatar` VARCHAR(255) NULL,
    MODIFY `email` VARCHAR(255) NULL,
    MODIFY `role` INTEGER NULL DEFAULT 0;
