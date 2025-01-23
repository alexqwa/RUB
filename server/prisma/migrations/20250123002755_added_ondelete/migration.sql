-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_streets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "weekday" INTEGER NOT NULL,
    "departamentId" INTEGER NOT NULL,
    CONSTRAINT "streets_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departaments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_streets" ("code", "departamentId", "id", "isActive", "title", "weekday") SELECT "code", "departamentId", "id", "isActive", "title", "weekday" FROM "streets";
DROP TABLE "streets";
ALTER TABLE "new_streets" RENAME TO "streets";
CREATE TABLE "new_weekdays" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" INTEGER NOT NULL,
    "departamentId" INTEGER NOT NULL,
    CONSTRAINT "weekdays_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departaments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_weekdays" ("day", "departamentId", "id") SELECT "day", "departamentId", "id" FROM "weekdays";
DROP TABLE "weekdays";
ALTER TABLE "new_weekdays" RENAME TO "weekdays";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
