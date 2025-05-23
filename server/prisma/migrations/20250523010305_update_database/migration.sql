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
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "streetCode" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "departaments_id_key" ON "departaments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "streets_code_key" ON "streets"("code");

-- AddForeignKey
ALTER TABLE "weekdays" ADD CONSTRAINT "weekdays_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_streetCode_fkey" FOREIGN KEY ("streetCode") REFERENCES "streets"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "streets" ADD CONSTRAINT "streets_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
