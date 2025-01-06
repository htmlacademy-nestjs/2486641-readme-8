-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "post_date" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_original_id_fkey" FOREIGN KEY ("original_id") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
