import { PartialType } from '@nestjs/swagger';
import { CreateBlogPostModuleDto } from './create-blog-post.dto';

export class UpdateBlogPostModuleDto extends PartialType(
  CreateBlogPostModuleDto
) {}
