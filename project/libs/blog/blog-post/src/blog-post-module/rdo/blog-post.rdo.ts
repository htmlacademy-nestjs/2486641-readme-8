import { Comment, Like, PostType } from '@project/core';
import { Expose } from 'class-transformer';

export class BlogPostRdo {
  @Expose()
  public id: string;

  @Expose()
  public type: PostType;

  @Expose()
  public tags: string[];

  @Expose()
  public originalUserId: string;

  @Expose()
  public userId: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public isPublished: boolean;

  @Expose()
  public isReposted: boolean;

  @Expose()
  public originalId: string;

  @Expose()
  public titleVideo?: string;
  public urlVideo?: string;

  @Expose()
  public titleText?: string;

  @Expose()
  public previewText?: string;

  @Expose()
  public text?: string;

  @Expose()
  public textQuote?: string;

  @Expose()
  public authorQuote?: string;

  @Expose()
  public urlPhoto?: string;

  @Expose()
  public urlLink?: string;
  @Expose()
  public descriptionLink?: string;

  @Expose()
  public createdAt: Date;

  @Expose()
  public updatedAt: Date;

  @Expose()
  public commentsCount: number;

  @Expose()
  public likesCount: number;

  @Expose()
  public likes: Like[];

  @Expose()
  public comments: Comment[]
}