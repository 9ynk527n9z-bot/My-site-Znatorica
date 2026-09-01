-- AlterTable
ALTER TABLE "page_views" ADD COLUMN     "sessionId" TEXT;

-- CreateIndex
CREATE INDEX "generator_uses_createdAt_idx" ON "generator_uses"("createdAt");

-- CreateIndex
CREATE INDEX "page_views_createdAt_idx" ON "page_views"("createdAt");
