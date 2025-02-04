import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { PostFieldDescription } from "../blog-comment.constant";

export class BlogCommentRdo {
  @Expose()
  @ApiProperty(PostFieldDescription.Id)
  public id: string;

  @Expose()
  @ApiProperty(PostFieldDescription.UserId)
  userId: string;

  @Expose()
  @ApiProperty(PostFieldDescription.PostId)
  postId: string;

  @Expose()
  @ApiProperty(PostFieldDescription.Text)
  text: string;

  @Expose()
  @ApiProperty(PostFieldDescription.CreatedAt)
  createdAt?: Date;

  @Expose()
  @ApiProperty(PostFieldDescription.UpdatedAt)
  updatedAt?: Date
}
