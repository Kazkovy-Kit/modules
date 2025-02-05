/*
  Warnings:

  - Added the required column `botConfigId` to the `BotAccessToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BotAccessToken" ADD COLUMN     "botConfigId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "BotAccessToken" ADD CONSTRAINT "BotAccessToken_botConfigId_fkey" FOREIGN KEY ("botConfigId") REFERENCES "BotConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
