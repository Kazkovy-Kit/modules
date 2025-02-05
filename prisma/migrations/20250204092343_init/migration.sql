-- CreateTable
CREATE TABLE "BotConfig" (
    "id" SERIAL NOT NULL,
    "host" TEXT NOT NULL,
    "discord_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "BotConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BotAccessToken" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "BotAccessToken_pkey" PRIMARY KEY ("id")
);
