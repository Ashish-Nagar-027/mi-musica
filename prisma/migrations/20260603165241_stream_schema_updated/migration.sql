-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "PlayedTs" TIMESTAMP(3),
ADD COLUMN     "played" BOOLEAN NOT NULL DEFAULT false;
