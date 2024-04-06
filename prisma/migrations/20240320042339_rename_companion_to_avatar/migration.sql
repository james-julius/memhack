/*
  Warnings:

  - You are about to drop the `Companion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompanionInstruction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Companion" DROP CONSTRAINT "Companion_userId_fkey";

-- DropForeignKey
ALTER TABLE "CompanionInstruction" DROP CONSTRAINT "CompanionInstruction_companionId_fkey";

-- DropForeignKey
ALTER TABLE "CompanionInstruction" DROP CONSTRAINT "CompanionInstruction_targetUserId_fkey";

-- DropTable
DROP TABLE "Companion";

-- DropTable
DROP TABLE "CompanionInstruction";

-- CreateTable
CREATE TABLE "Avatar" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvatarInstruction" (
    "id" SERIAL NOT NULL,
    "avatarId" INTEGER NOT NULL,
    "targetUserId" TEXT,
    "instructions" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AvatarInstruction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_userId_key" ON "Avatar"("userId");

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvatarInstruction" ADD CONSTRAINT "AvatarInstruction_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Avatar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvatarInstruction" ADD CONSTRAINT "AvatarInstruction_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
