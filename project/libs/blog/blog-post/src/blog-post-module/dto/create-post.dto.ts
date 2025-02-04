import { ApiProperty } from "@nestjs/swagger";
import { PostType } from "@project/core";
import { ArrayMaxSize, IsArray, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, IsUrl, Length, MaxLength, ValidateIf } from "class-validator";
import { PostFieldDescription, PostValidateMessage, PostValidateValue } from "../blog-post.constant";
import { TagsArray } from "./tags-array-validator";
import { Transform } from "class-transformer";

export class CreatePostDto {
  @ApiProperty(PostFieldDescription.Type)
  @IsEnum(PostType)
  @IsNotEmpty()
  type: PostType;

  @ApiProperty({...PostFieldDescription.Tags, type: 'array'})
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
    let tags: string[];
    if ((typeof value) === 'string') {
      tags = value.split(',');
    } else {
      tags = value;
    }
    const uniq: Set<string> = new Set(tags);
    return Array.from(uniq).map((item) => item.toLowerCase());
  }) 
  @TagsArray()
  tags?: string[];

  @IsMongoId()
  userId: string;

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
  @IsString()
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
}
