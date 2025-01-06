import { Entity, Post, StorableEntity } from "@project/core";
import { BlogCommentEntity, BlogCommentFactory } from '@project/blog-comment';
import { BlogLikeFactory, BlogLikeEntity } from '@project/blog-like';
import { PostType } from "@prisma/client";

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

  public comments: BlogCommentEntity[];
  public likes: BlogLikeEntity[];

  constructor(post?: Post) {
    super();
    this.populate(post);
  }
  populate(post?: Post): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.type = post.type;
    this.tags = post.tags;
    this.originalUserId = post.originalUserId ?? undefined;
    this.userId = post.userId;
    this.postDate = post.postDate ?? undefined;
    this.isPublished = post.isPublished;
    this.isReposted = post.isReposted;
    this.originalId = post.originalId ?? undefined;
    this.createdAt = post.createdAt ?? undefined;
    this.updatedAt = post.updatedAt ?? undefined;
    this.likes = [];
    this.comments = [];

    this.url = post.url;
    this.description = post.description;
    this.text = post.text;
    this.author = post.author;
    this.title = post.title;
    this.preview = post.preview;
    const blogCommentFactory = new BlogCommentFactory();
    for (const comment of post.comments) {
      const blogCommentEntity = blogCommentFactory.create(comment);
      this.comments.push(blogCommentEntity);
    }

    const blogLikeFactory = new BlogLikeFactory();
    for (const like of post.likes) {
      const blogLikeEntity = blogLikeFactory.create(like);
      this.likes.push(blogLikeEntity);
    }
  }

  toPOJO(): Post {
    return {
      id: this.id,
      type: this.type,
      tags: this.tags,
      originalUserId: this.originalUserId,
      userId: this.userId,
      postDate: this.postDate,
      isPublished: this.isPublished,
      isReposted: this.isReposted,
      originalId: this.originalId,
      url: this.url,
      description: this.description,
      text: this.text,
      author: this.author,
      title: this.title,
      preview: this.preview,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      likes: this.likes.map((likeEntity) => likeEntity.toPOJO()),
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
    };
  }

}