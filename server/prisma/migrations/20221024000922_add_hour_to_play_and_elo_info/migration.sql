-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ad" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discord" TEXT NOT NULL,
    "Whatsapp" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "weekDays" TEXT NOT NULL,
    "enableVoiceChannel" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hourStart" INTEGER NOT NULL DEFAULT -1,
    "hourEnd" INTEGER NOT NULL DEFAULT -1,
    "elo" TEXT NOT NULL DEFAULT 'unranked',
    CONSTRAINT "Ad_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ad" ("Whatsapp", "createdAt", "discord", "enableVoiceChannel", "gameId", "id", "instagram", "name", "weekDays") SELECT "Whatsapp", "createdAt", "discord", "enableVoiceChannel", "gameId", "id", "instagram", "name", "weekDays" FROM "Ad";
DROP TABLE "Ad";
ALTER TABLE "new_Ad" RENAME TO "Ad";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
