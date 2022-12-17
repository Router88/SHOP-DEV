/*
  Warnings:

  - Made the column `item_id` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `comments` MODIFY `item_id` INTEGER NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `role` INTEGER NOT NULL DEFAULT 0;
