import { Entity, Like, StorableEntity } from '@project/core'

export class BlogLikeEntity extends Entity implements StorableEntity<Like> {
  public postId: string;
  public userId: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(like?: Like) {
    super();
    this.populate(like);
  }

  public populate(like?: Like) {
    if (!like) {
      return;
    }

    this.id = like.id ?? undefined;
    this.postId = like.postId ?? undefined;
    this.userId = like.userId;
    this.createdAt = like.createdAt ?? undefined;
    this.updatedAt = like.updatedAt ?? undefined;
  }

  public toPOJO(): Like {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

}
