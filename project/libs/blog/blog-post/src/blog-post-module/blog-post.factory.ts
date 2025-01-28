import { EntityFactory, Post } from "@project/core";
import { Injectable } from "@nestjs/common";
import { BlogPostEntity } from "./blog-post.entity";
import { CreatePostDto } from "./dto/create-post.dto";

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
    public create(entityPlainData: Post): BlogPostEntity {
        return new BlogPostEntity(entityPlainData);
    }

    public static createFromCreatePostDto(dto: CreatePostDto): BlogPostEntity {
        const entity = new BlogPostEntity();
        entity.type = dto.type;
        entity.tags = dto.tags;
        entity.userId = dto.userId;
        entity.postDate = new Date();
        entity.isPublished = false;

        return entity;
    }
}