-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_licenses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "expiresAt" TEXT NOT NULL
);
INSERT INTO "new_licenses" ("createdAt", "expiresAt", "id", "key") SELECT "createdAt", "expiresAt", "id", "key" FROM "licenses";
DROP TABLE "licenses";
ALTER TABLE "new_licenses" RENAME TO "licenses";
CREATE UNIQUE INDEX "licenses_key_key" ON "licenses"("key");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
