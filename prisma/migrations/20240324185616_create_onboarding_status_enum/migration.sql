-- CreateEnum
CREATE TYPE "OnboardingStatus" AS ENUM ('UNSTARTED', 'AVATAR_CREATED', 'FIRST_INVITATION', 'COMPLETED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "onboardingStatus" "OnboardingStatus" NOT NULL DEFAULT 'UNSTARTED';
