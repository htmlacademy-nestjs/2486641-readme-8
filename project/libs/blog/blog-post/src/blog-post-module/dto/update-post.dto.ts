import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { PostFieldDescription, PostValidateMessage, PostValidateValue } from "../blog-post.constant";
import { ArrayMaxSize, IsArray, IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString, IsUrl, Length, MaxLength, ValidateIf } from "class-validator";
import { PostType } from "@project/core";
import { TagsArray } from "./tags-array-validator";

export class UpdatePostDto {
  @ApiProperty(PostFieldDescription.Type)
  @IsIn(Object.values(PostType))
  @IsNotEmpty()
  @IsOptional()
  type?: PostType;

  @ApiProperty(PostFieldDescription.Tags)
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @ArrayMaxSize(
    PostValidateValue.Tags.MaxCount,
    { message: PostValidateMessage.Tags.CountMessage }
  )
  @Length(
    PostValidateValue.Tags.MinLength,
    PostValidateValue.Tags.MaxLength,
    {
      each: true,
      message: PostValidateMessage.Tags.LengthMessage
    }
  )
  @Transform(({ value }) => {
    const uniq: Set<string> = new Set(value);
    return Array.from(uniq).map((item) => item.toLowerCase());
  })
  @TagsArray()
  tags?: string[];

  @ApiProperty(PostFieldDescription.TitleVideo)
  @ValidateIf((o) => o.type === PostType.Video)
  @Length(
    PostValidateValue.TitleVideo.MinLength,
    PostValidateValue.TitleVideo.MaxLength,
    { message: PostValidateMessage.TitleVideo.LengthMessage }
  )
  titleVideo?: string;

  @ApiProperty(PostFieldDescription.UrlVideo)
  @ValidateIf((o) => o.type === PostType.Video)
  @IsUrl()
  urlVideo?: string;

  @ApiProperty(PostFieldDescription.TitleText)
  @ValidateIf((o) => o.type === PostType.Text)
  @Length(
    PostValidateValue.TitleText.MinLength,
    PostValidateValue.TitleText.MaxLength,
    { message: PostValidateMessage.TitleText.LengthMessage }
  )
  titleText?: string;

  @ApiProperty(PostFieldDescription.PreviewText)
  @ValidateIf((o) => o.type === PostType.Text)
  @Length(
    PostValidateValue.PreviewText.MinLength,
    PostValidateValue.PreviewText.MaxLength,
    { message: PostValidateMessage.PreviewText.LengthMessage }
  )
  previewText?: string;

  @ApiProperty(PostFieldDescription.Text)
  @ValidateIf((o) => o.type === PostType.Text)
  @IsNotEmpty()
  @IsString()
  @Length(
    PostValidateValue.Text.MinLength,
    PostValidateValue.Text.MaxLength,
    { message: PostValidateMessage.Text.LengthMessage }
  )
  text?: string;

  @ApiProperty(PostFieldDescription.TextQuote)
  @ValidateIf((o) => o.type === PostType.Quote)
  @IsString()
  @Length(
    PostValidateValue.TextQuote.MinLength,
    PostValidateValue.TextQuote.MaxLength,
    { message: PostValidateMessage.TextQuote.LengthMessage }
  )
  textQuote?: string;

  @ApiProperty(PostFieldDescription.AuthorQuote)
  @ValidateIf((o) => o.type === PostType.Quote)
  @IsString()
  @Length(
    PostValidateValue.AuthorQuote.MinLength,
    PostValidateValue.AuthorQuote.MaxLength,
    { message: PostValidateMessage.AuthorQuote.LengthMessage }
  )
  authorQuote?: string;

  @ApiProperty(PostFieldDescription.UrlPhoto)
  @ValidateIf((o) => o.type === PostType.Photo)
  @IsUrl()
  urlPhoto?: string;

  @ApiProperty(PostFieldDescription.UrlLink)
  @ValidateIf((o) => o.type === PostType.Link)
  @IsUrl()
  urlLink?: string;

  @ApiProperty(PostFieldDescription.DescriptionLink)
  @ValidateIf((o) => o.type === PostType.Link)
  @IsOptional()
  @IsString()
  @MaxLength(
    PostValidateValue.DescriptionLink.MaxLength,
    { message: PostValidateMessage.DescriptionLink.LengthMessage }
  )
  descriptionLink?: string;
  
  @Expose()
  @ApiProperty(PostFieldDescription.IsPublished)
  @IsBoolean()
  @IsOptional()
  public isPublished?: boolean;
}
