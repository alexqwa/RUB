-- CreateTable
CREATE TABLE "departaments" (
    "id" SERIAL NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "departaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weekdays" (
    "id" SERIAL NOT NULL,
    "day" INTEGER NOT NULL,
    "departamentId" INTEGER NOT NULL,

    CONSTRAINT "weekdays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "streets" (
    "id" SERIAL NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "weekday" INTEGER NOT NULL,
    "departamentId" INTEGER NOT NULL,

    CONSTRAINT "streets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "licenseId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "licenses" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "expiresAt" TEXT NOT NULL,

    CONSTRAINT "licenses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "departaments_id_key" ON "departaments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_licenseId_key" ON "User"("licenseId");

-- CreateIndex
CREATE UNIQUE INDEX "licenses_key_key" ON "licenses"("key");

-- AddForeignKey
ALTER TABLE "weekdays" ADD CONSTRAINT "weekdays_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "streets" ADD CONSTRAINT "streets_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "licenses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
