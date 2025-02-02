import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { PostFieldDescription, PostValidateMessage, PostValidateValue } from "../blog-post.constant";
import { ArrayMaxSize, IsArray, IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString, IsUrl, Length, MaxLength, ValidateIf } from "class-validator";
import { PostType } from "@project/core";
import { TagsArray } from "./tags-array-validator";

export class UpdatePostDto {
  @ApiProperty(PostFieldDescription.type)
  @IsIn(Object.values(PostType))
  @IsNotEmpty()
  @IsOptional()
  type?: PostType;

  @ApiProperty(PostFieldDescription.tags)
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @ArrayMaxSize(
    PostValidateValue.tags.maxCount,
    { message: PostValidateMessage.tags.countMessage }
  )
  @Length(
    PostValidateValue.tags.minLength,
    PostValidateValue.tags.maxLength,
    {
      each: true,
      message: PostValidateMessage.tags.lengthMessage
    }
  )
  @Transform(({ value }) => {
    const uniq: Set<string> = new Set(value);
    return Array.from(uniq).map((item) => item.toLowerCase());
  })
  @TagsArray()
  tags?: string[];

  @ApiProperty(PostFieldDescription.titleVideo)
  @ValidateIf((o) => o.type === PostType.video)
  @Length(
    PostValidateValue.titleVideo.minLength,
    PostValidateValue.titleVideo.maxLength,
    { message: PostValidateMessage.titleVideo.lengthMessage }
  )
  titleVideo?: string;

  @ApiProperty(PostFieldDescription.urlVideo)
  @ValidateIf((o) => o.type === PostType.video)
  @IsUrl()
  urlVideo?: string;

  @ApiProperty(PostFieldDescription.titleText)
  @ValidateIf((o) => o.type === PostType.text)
  @Length(
    PostValidateValue.titleText.minLength,
    PostValidateValue.titleText.maxLength,
    { message: PostValidateMessage.titleText.lengthMessage }
  )
  titleText?: string;

  @ApiProperty(PostFieldDescription.previewText)
  @ValidateIf((o) => o.type === PostType.text)
  @Length(
    PostValidateValue.previewText.minLength,
    PostValidateValue.previewText.maxLength,
    { message: PostValidateMessage.previewText.lengthMessage }
  )
  previewText?: string;

  @ApiProperty(PostFieldDescription.text)
  @ValidateIf((o) => o.type === PostType.text)
  @IsNotEmpty()
  @IsString()
  @Length(
    PostValidateValue.text.minLength,
    PostValidateValue.text.maxLength,
    { message: PostValidateMessage.text.lengthMessage }
  )
  text?: string;

  @ApiProperty(PostFieldDescription.textQuote)
  @ValidateIf((o) => o.type === PostType.quote)
  @IsString()
  @Length(
    PostValidateValue.textQuote.minLength,
    PostValidateValue.textQuote.maxLength,
    { message: PostValidateMessage.textQuote.lengthMessage }
  )
  textQuote?: string;

  @ApiProperty(PostFieldDescription.authorQuote)
  @ValidateIf((o) => o.type === PostType.quote)
  @IsString()
  @Length(
    PostValidateValue.authorQuote.minLength,
    PostValidateValue.authorQuote.maxLength,
    { message: PostValidateMessage.authorQuote.lengthMessage }
  )
  authorQuote?: string;

  @ApiProperty(PostFieldDescription.urlPhoto)
  @ValidateIf((o) => o.type === PostType.photo)
  @IsUrl()
  urlPhoto?: string;

  @ApiProperty(PostFieldDescription.urlLink)
  @ValidateIf((o) => o.type === PostType.link)
  @IsUrl()
  urlLink?: string;

  @ApiProperty(PostFieldDescription.descriptionLink)
  @ValidateIf((o) => o.type === PostType.link)
  @IsOptional()
  @IsString()
  @MaxLength(
    PostValidateValue.descriptionLink.maxLength,
    { message: PostValidateMessage.descriptionLink.lengthMessage }
  )
  descriptionLink?: string;
  
  @Expose()
  @ApiProperty(PostFieldDescription.isPublished)
  @IsBoolean()
  @IsOptional()
  public isPublished?: boolean;
}
