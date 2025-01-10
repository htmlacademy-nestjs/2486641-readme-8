import { Expose } from "class-transformer";

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  userId: string;

  @Expose()
  postId: string;

  @Expose()
  text: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date
}
