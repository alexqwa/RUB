-- CreateTable
CREATE TABLE "departaments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "weekdays" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" INTEGER NOT NULL,
    "departamentId" INTEGER NOT NULL,
    CONSTRAINT "weekdays_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departaments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "streets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "weekday" INTEGER NOT NULL,
    "departamentId" INTEGER NOT NULL,
    CONSTRAINT "streets_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departaments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "licenses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "expiresAt" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "departaments_id_key" ON "departaments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "licenses_key_key" ON "licenses"("key");
