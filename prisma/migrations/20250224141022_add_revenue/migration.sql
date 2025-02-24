-- CreateTable
CREATE TABLE "revenues" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "revenue" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "revenues_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "revenues_user_id_idx" ON "revenues"("user_id");

-- CreateIndex
CREATE INDEX "revenues_year_month_idx" ON "revenues"("year", "month");

-- CreateIndex
CREATE UNIQUE INDEX "revenues_user_id_month_year_key" ON "revenues"("user_id", "month", "year");

-- AddForeignKey
ALTER TABLE "revenues" ADD CONSTRAINT "revenues_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
