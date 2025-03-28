/*
  Warnings:

  - A unique constraint covering the columns `[accountNo]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountNo` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankName` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "accountNo" TEXT NOT NULL,
ADD COLUMN     "bankName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "message" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Account_accountNo_key" ON "Account"("accountNo");
