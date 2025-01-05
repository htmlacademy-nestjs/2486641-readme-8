import { Comment, Entity, StorableEntity } from "@project/core";

export class BlogCommentEntity extends Entity implements StorableEntity<Comment> {
  public postId: string;
  public userId: string;
  public text: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(comment?: Comment) {
    super();
    this.populate(comment);
  }

  populate(comment?: Comment) {
    if (!comment) {
      return;
    }

    this.id = comment.id ?? undefined;
    this.postId = comment.postId;
    this.userId = comment.userId;
    this.text = comment.text;
    this.createdAt = comment.createdAt ?? undefined;
    this.updatedAt = comment.updatedAt ?? undefined;
  }

  toPOJO(): Comment {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      text: this.text,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

}
