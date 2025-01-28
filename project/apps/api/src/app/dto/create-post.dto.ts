import { CreatePostDto as CreateBlogPostDto } from '@project/blog-post';
import { OmitType } from "@nestjs/swagger";

export class CreatePostDto extends OmitType(CreateBlogPostDto, ['userId'] as const) {}