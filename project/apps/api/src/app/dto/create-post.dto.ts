import { CreatePostDto as CreateBlogPostDto } from '@project/blog-post';
import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsNotEmpty, ValidateIf } from 'class-validator';
import { PostType } from '@project/core';

export class CreatePostDto extends OmitType(CreateBlogPostDto, ['userId', 'urlPhoto'] as const) {
    @ApiProperty({ 
      description: 'Photo', 
      type: 'string',
      format: 'binary',
      required: false
    })
    @ValidateIf((o) => o.type === PostType.Photo)
    @IsNotEmpty()
    public photo?: Express.Multer.File;
}