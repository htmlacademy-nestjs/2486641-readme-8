import { Entity, Post, PostType, StorableEntity } from "@project/core";
import { BlogCommentEntity, BlogCommentFactory } from '@project/blog-comment';
import { BlogLikeFactory, BlogLikeEntity } from '@project/blog-like';

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  // общие
  public type: PostType;
  public tags: string[];
  public originalUserId: string;
  public userId: string;
  public postDate: Date;
  public isPublished: boolean;
  public isReposted: boolean;
  public originalId: string;
  // video  
  public titleVideo?: string;
  public urlVideo?: string;
  // text
  public titleText?: string;
  public previewText?: string;
  public text?: string;
  // quote
  public textQuote?: string;
  public authorQuote?: string;
  // photo
  public urlPhoto?: string;
  // link
  public urlLink?: string;
  public descriptionLink?: string;
  // служебные
  public createdAt: Date;
  public updatedAt: Date;
  // вложенные сущности
  public comments: BlogCommentEntity[];
  public commentsCount: number;
  public likes: BlogLikeEntity[];
  public likesCount: number;

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
    this.originalId = post.originalId ?? undefined;
    this.isReposted = (!!post.originalId);
    this.createdAt = post.createdAt ?? undefined;
    this.updatedAt = post.updatedAt ?? undefined;
    this.likes = [];
    this.comments = [];

    // video  
    this.titleVideo = post.titleVideo;
    this.urlVideo = post.urlVideo;
    // text
    this.titleText = post.titleText;
    this.previewText = post.previewText;
    this.text = post.text;
    // quote
    this.textQuote = post.textQuote;
    this.authorQuote = post.authorQuote;
    // photo
    this.urlPhoto = post.urlPhoto;
    // link
    this.urlLink = post.urlLink;
    this.descriptionLink = post.descriptionLink;

    const blogCommentFactory = new BlogCommentFactory();
    for (const comment of post.comments) {
      const blogCommentEntity = blogCommentFactory.create(comment);
      this.comments.push(blogCommentEntity);
    }
    this.commentsCount = this.comments.length;

    const blogLikeFactory = new BlogLikeFactory();
    for (const like of post.likes) {
      const blogLikeEntity = blogLikeFactory.create(like);
      this.likes.push(blogLikeEntity);
    }
    this.likesCount = this.likes.length;
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
      originalId: this.originalId,
      titleVideo: this.titleVideo,
      urlVideo: this.urlVideo,
      titleText: this.titleText,
      previewText: this.previewText,
      text: this.text,
      textQuote: this.textQuote,
      authorQuote: this.authorQuote,
      urlPhoto: this.urlPhoto,
      urlLink: this.urlLink,
      descriptionLink: this.descriptionLink,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      likes: this.likes.map((likeEntity) => likeEntity.toPOJO()),
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
    };
  }

}