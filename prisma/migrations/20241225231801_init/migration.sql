-- CreateTable
CREATE TABLE "BotConfig" (
    "id" SERIAL NOT NULL,
    "host" TEXT NOT NULL,
    "name" TEXT NOT NULL
    "token" TEXT NOT NULL

    CONSTRAINT "BotConfig_pkey" PRIMARY KEY ("id")
);
