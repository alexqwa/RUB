/*
  Warnings:

  - You are about to alter the column `createdAt` on the `licenses` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `expiresAt` on the `licenses` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_licenses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL
);
INSERT INTO "new_licenses" ("createdAt", "expiresAt", "id", "key") SELECT "createdAt", "expiresAt", "id", "key" FROM "licenses";
DROP TABLE "licenses";
ALTER TABLE "new_licenses" RENAME TO "licenses";
CREATE UNIQUE INDEX "licenses_key_key" ON "licenses"("key");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
