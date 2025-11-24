/*
  Warnings:

  - A unique constraint covering the columns `[follower_id,following_id]` on the table `following` will be added. If there are existing duplicate values, this will fail.
  - Made the column `following_id` on table `following` required. This step will fail if there are existing NULL values in that column.
  - Made the column `follower_id` on table `following` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "following" DROP CONSTRAINT "following_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "following" DROP CONSTRAINT "following_following_id_fkey";

-- AlterTable
ALTER TABLE "following" ALTER COLUMN "following_id" SET NOT NULL,
ALTER COLUMN "follower_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "following_follower_id_following_id_key" ON "following"("follower_id", "following_id");

-- AddForeignKey
ALTER TABLE "following" ADD CONSTRAINT "following_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "following" ADD CONSTRAINT "following_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
