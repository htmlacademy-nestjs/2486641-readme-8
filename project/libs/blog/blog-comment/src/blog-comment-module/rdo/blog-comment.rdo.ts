import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { PostFieldDescription } from "../blog-comment.constant";

export class BlogCommentRdo {
  @Expose()
  @ApiProperty(PostFieldDescription.id)
  public id: string;

  @Expose()
  @ApiProperty(PostFieldDescription.userId)
  userId: string;

  @Expose()
  @ApiProperty(PostFieldDescription.postId)
  postId: string;

  @Expose()
  @ApiProperty(PostFieldDescription.text)
  text: string;

  @Expose()
  @ApiProperty(PostFieldDescription.createdAt)
  createdAt?: Date;

  @Expose()
  @ApiProperty(PostFieldDescription.updatedAt)
  updatedAt?: Date
}
