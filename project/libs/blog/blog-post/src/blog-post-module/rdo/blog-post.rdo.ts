import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/core';
import { Expose } from 'class-transformer';
import { PostFieldDescription } from '../blog-post.constant';

export class BlogPostRdo {
  @Expose()
  @ApiProperty(PostFieldDescription.id)
  public id: string;

  @Expose()
  @ApiProperty(PostFieldDescription.type)
  public type: PostType;

  @Expose()
  @ApiProperty(PostFieldDescription.tags)
  public tags: string[];

  @Expose()
  @ApiProperty(PostFieldDescription.originalUserId)
  public originalUserId: string;

  @Expose()
  @ApiProperty(PostFieldDescription.userId)
  public userId: string;

  @Expose()
  @ApiProperty(PostFieldDescription.postDate)
  public postDate: Date;

  @Expose()
  @ApiProperty(PostFieldDescription.isPublished)
  public isPublished: boolean;

  @Expose()
  @ApiProperty(PostFieldDescription.isReposted)
  public isReposted: boolean;

  @Expose()
  @ApiProperty(PostFieldDescription.originalId)
  public originalId: string;

  @Expose()
  @ApiProperty(PostFieldDescription.titleVideo)
  public titleVideo?: string;

  @Expose()
  @ApiProperty(PostFieldDescription.urlVideo)
  public urlVideo?: string;

  @Expose()
  @ApiProperty(PostFieldDescription.titleText)
  public titleText?: string;

  @Expose()
  @ApiProperty(PostFieldDescription.previewText)
  public previewText?: string;

  @Expose()
  @ApiProperty(PostFieldDescription.text)
  public text?: string;

  @Expose()
  @ApiProperty(PostFieldDescription.textQuote)
  public textQuote?: string;

  @Expose()
  @ApiProperty(PostFieldDescription.authorQuote)
  public authorQuote?: string;

  @Expose()
  @ApiProperty(PostFieldDescription.urlPhoto)
  public urlPhoto?: string;

  @Expose()
  @ApiProperty(PostFieldDescription.urlLink)
  public urlLink?: string;

  @Expose()
  @ApiProperty(PostFieldDescription.descriptionLink)
  public descriptionLink?: string;

  @Expose()
  @ApiProperty(PostFieldDescription.createdAt)
  public createdAt: Date;

  @Expose()
  @ApiProperty(PostFieldDescription.updatedAt)
  public updatedAt: Date;

  @Expose()
  @ApiProperty(PostFieldDescription.commentsCount)
  public commentsCount: number;

  @Expose()
  @ApiProperty(PostFieldDescription.likesCount)
  public likesCount: number;
}