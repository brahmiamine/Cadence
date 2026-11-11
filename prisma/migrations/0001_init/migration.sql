-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "theme" TEXT NOT NULL DEFAULT 'dark',
    "gridRange" INTEGER NOT NULL DEFAULT 91,
    "view" TEXT NOT NULL DEFAULT 'grid',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habit" (
    "pk" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL DEFAULT '',
    "start" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "repeat" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL,
    "days" INTEGER[],
    "unit" TEXT NOT NULL DEFAULT '',
    "target" DOUBLE PRECISION NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "reminder" TEXT NOT NULL DEFAULT '',
    "reminderDays" INTEGER[],
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "Entry" (
    "habitPk" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "note" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("habitPk","date")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Habit_userId_position_idx" ON "Habit"("userId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Habit_userId_clientId_key" ON "Habit"("userId", "clientId");

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_habitPk_fkey" FOREIGN KEY ("habitPk") REFERENCES "Habit"("pk") ON DELETE CASCADE ON UPDATE CASCADE;

