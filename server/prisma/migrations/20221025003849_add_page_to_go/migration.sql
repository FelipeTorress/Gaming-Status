-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "bannerUrl" TEXT NOT NULL,
    "activated" BOOLEAN NOT NULL DEFAULT false,
    "page" TEXT NOT NULL DEFAULT '#'
);
INSERT INTO "new_Game" ("activated", "bannerUrl", "id", "title") SELECT "activated", "bannerUrl", "id", "title" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
