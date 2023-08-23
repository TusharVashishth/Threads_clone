/*
  Warnings:

  - Added the required column `user_id` to the `Likes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Likes" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
