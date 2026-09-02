-- CreateTable
CREATE TABLE "user_decorations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_decorations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_decorations_userId_itemId_key" ON "user_decorations"("userId", "itemId");

-- AddForeignKey
ALTER TABLE "user_decorations" ADD CONSTRAINT "user_decorations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
