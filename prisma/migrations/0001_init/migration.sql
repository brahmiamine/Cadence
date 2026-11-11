-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `theme` VARCHAR(191) NOT NULL DEFAULT 'dark',
    `gridRange` INTEGER NOT NULL DEFAULT 91,
    `view` VARCHAR(191) NOT NULL DEFAULT 'grid',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Habit` (
    `pk` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `position` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL DEFAULT '',
    `category` VARCHAR(191) NOT NULL DEFAULT '',
    `start` VARCHAR(191) NOT NULL,
    `mode` VARCHAR(191) NOT NULL,
    `kind` VARCHAR(191) NOT NULL,
    `repeat` VARCHAR(191) NOT NULL,
    `frequency` INTEGER NOT NULL,
    `days` JSON NOT NULL,
    `unit` VARCHAR(191) NOT NULL DEFAULT '',
    `target` DOUBLE NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `reminder` VARCHAR(191) NOT NULL DEFAULT '',
    `reminderDays` JSON NOT NULL,
    `archived` BOOLEAN NOT NULL DEFAULT false,

    INDEX `Habit_userId_position_idx`(`userId`, `position`),
    UNIQUE INDEX `Habit_userId_clientId_key`(`userId`, `clientId`),
    PRIMARY KEY (`pk`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Entry` (
    `habitPk` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `note` TEXT NOT NULL,

    PRIMARY KEY (`habitPk`, `date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Habit` ADD CONSTRAINT `Habit_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entry` ADD CONSTRAINT `Entry_habitPk_fkey` FOREIGN KEY (`habitPk`) REFERENCES `Habit`(`pk`) ON DELETE CASCADE ON UPDATE CASCADE;

