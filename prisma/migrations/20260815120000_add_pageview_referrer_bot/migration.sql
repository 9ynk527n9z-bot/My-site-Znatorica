-- AlterTable
ALTER TABLE "page_views" ADD COLUMN "referrer" TEXT;
ALTER TABLE "page_views" ADD COLUMN "isBot" BOOLEAN NOT NULL DEFAULT false;
