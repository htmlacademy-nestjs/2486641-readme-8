/*
  Warnings:

  - You are about to drop the column `author` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `is_reposted` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `preview` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `posts` table. All the data in the column will be lost.
  - Changed the type of `type` on the `posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "posts_title_idx";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "author",
DROP COLUMN "description",
DROP COLUMN "is_reposted",
DROP COLUMN "preview",
DROP COLUMN "title",
DROP COLUMN "url",
ADD COLUMN     "author_quote" TEXT,
ADD COLUMN     "description_link" TEXT,
ADD COLUMN     "preview_text" TEXT,
ADD COLUMN     "text_quote" TEXT,
ADD COLUMN     "title_text" TEXT,
ADD COLUMN     "title_video" TEXT,
ADD COLUMN     "url_link" TEXT,
ADD COLUMN     "url_photo" TEXT,
ADD COLUMN     "url_video" TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- DropEnum
DROP TYPE "PostType";

-- CreateIndex
CREATE INDEX "posts_user_id_idx" ON "posts"("user_id");

-- CreateIndex
CREATE INDEX "posts_post_date_idx" ON "posts"("post_date");
