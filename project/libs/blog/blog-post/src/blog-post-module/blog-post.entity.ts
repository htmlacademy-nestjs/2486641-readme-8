import { Comment, Entity, Like, Post, PostType, StorableEntity } from "@project/core";

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public type: PostType;
  public tags: string[];
  public originalUserId: string;
  public userId: string;
  public postDate: Date;
  public isPublished: boolean;
  public isReposted: boolean;
  public originalId: string;
  public title: string;
  public preview: string;
  public url: string;
  public description: string;
  public text: string;
  public author: string;
  public createdAt: Date;
  public updatedAt: Date;

  public comments: Comment[];
  public likes: Like[];

  constructor(post?: Post) {
    super();
    this.populate(post);
  }
  populate(post?: Post) {
    if (!post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.type = post.type;
    this.tags = post.tags ?? undefined;
    this.originalUserId = post.originalUserId ?? undefined;
    this.userId = post.userId;
    this.postDate = post.postDate ?? undefined;
    this.isPublished = post.isPublished;
    this.isReposted = post.isReposted;
    this.originalId = post.originalId ?? undefined;

    this.createdAt = post.createdAt ?? undefined;
    this.updatedAt = post.updatedAt ?? undefined;

  }

  toPOJO(): Post {
    return {
      id: this.id,
      type: this.type
    }
  }

}