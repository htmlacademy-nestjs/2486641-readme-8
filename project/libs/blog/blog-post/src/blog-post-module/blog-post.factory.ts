import { EntityFactory, Post } from "@project/core";
import { Injectable } from "@nestjs/common";
import { BlogPostEntity } from "./blog-post.entity";

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
    public create(entityPlainData: Post): BlogPostEntity {
        return new BlogPostEntity(entityPlainData);
    }

    // public static createFromCreatePostDto(dto: CreatePostDto): BlogPostEntity {
    //     const entity = new BlogPostEntity();
    //     entity.type = dto.type;
    //     entity.tags = dto.tags;
    //     entity.userId = dto.userId;
    //     entity.postDate = new Date();
    //     entity.isPublished = false;

    //     return entity;
    // }

    public static createRepostFromPost(post: Post, userId: string): BlogPostEntity {
        delete post.id;
        delete post.commentsCount;
        delete post.likesCount;
        delete post.createdAt;
        delete post.updatedAt;
        post.originalId = post.id;
        post.originalUserId = post.userId;
        post.userId = userId;
        post.postDate = new Date();
        const newPost = new BlogPostEntity(post);
        return newPost;
    }
}