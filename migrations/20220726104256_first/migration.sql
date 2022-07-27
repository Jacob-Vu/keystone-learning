-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `author` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL DEFAULT 'draft',

    INDEX `Post_author_idx`(`author`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_author_fkey` FOREIGN KEY (`author`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
