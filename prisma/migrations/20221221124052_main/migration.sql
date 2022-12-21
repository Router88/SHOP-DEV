/*
  Warnings:

  - You are about to drop the column `content` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comments` DROP COLUMN `content`,
    DROP COLUMN `date`,
    DROP COLUMN `user_id`,
    ADD COLUMN `author` VARCHAR(255) NULL,
    ADD COLUMN `commentary` TEXT NULL,
    ADD COLUMN `date_creating` VARCHAR(64) NULL,
    MODIFY `item_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `items` MODIFY `category_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
