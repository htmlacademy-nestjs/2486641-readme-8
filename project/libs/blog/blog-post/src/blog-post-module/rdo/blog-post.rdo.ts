import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/core';
import { Expose } from 'class-transformer';
import { PostFieldDescription } from '../blog-post.constant';

export class BlogPostRdo {
  @Expose()
  @ApiProperty(PostFieldDescription.Id)
  public id: string;

  @Expose()
  @ApiProperty(PostFieldDescription.Type)
  public type: PostType;

  @Expose()
  @ApiProperty(PostFieldDescription.Tags)
  public tags: string[];

  @Expose()
  @ApiProperty(PostFieldDescription.OriginalUserId)
  public originalUserId: string;

  @Expose()
  @ApiProperty(PostFieldDescription.UserId)
  public userId: string;

  @Expose()
  @ApiProperty(PostFieldDescription.PostDate)
  public postDate: Date;

  @Expose()
  @ApiProperty(PostFieldDescription.IsPublished)
  public isPublished: boolean;

  @Expose()
  @ApiProperty(PostFieldDescription.IsReposted)
  public isReposted: boolean;

  @Expose()
  @ApiProperty(PostFieldDescription.OriginalId)
  public originalId: string;

  @Expose()
  @ApiProperty(PostFieldDescription.TitleVideo)
  public titleVideo?: string;

  @Expose()
  @ApiProperty(PostFieldDescription.UrlVideo)
  public urlVideo?: string;

  @Expose()
  @ApiProperty(PostFieldDescription.TitleText)
  public titleText?: string;

  @Expose()
  @ApiProperty(PostFieldDescription.PreviewText)
  public previewText?: string;

  @Expose()
  @ApiProperty(PostFieldDescription.Text)
  public text?: string;

  @Expose()
  @ApiProperty(PostFieldDescription.TextQuote)
  public textQuote?: string;

  @Expose()
  @ApiProperty(PostFieldDescription.AuthorQuote)
  public authorQuote?: string;

  @Expose()
  @ApiProperty(PostFieldDescription.UrlPhoto)
  public urlPhoto?: string;

  @Expose()
  @ApiProperty(PostFieldDescription.UrlLink)
  public urlLink?: string;

  @Expose()
  @ApiProperty(PostFieldDescription.DescriptionLink)
  public descriptionLink?: string;

  @Expose()
  @ApiProperty(PostFieldDescription.CreatedAt)
  public createdAt: Date;

  @Expose()
  @ApiProperty(PostFieldDescription.UpdatedAt)
  public updatedAt: Date;

  @Expose()
  @ApiProperty(PostFieldDescription.CommentsCount)
  public commentsCount: number;

  @Expose()
  @ApiProperty(PostFieldDescription.LikesCount)
  public likesCount: number;
}