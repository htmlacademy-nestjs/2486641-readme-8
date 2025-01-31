import { EntityFactory, Post } from "@project/core";
import { Injectable } from "@nestjs/common";
import { BlogPostEntity } from "./blog-post.entity";

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: Post): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

  public static createRepostFromPost(postData: Post, userId: string): BlogPostEntity {
    postData.originalId = postData.id;
    postData.originalUserId = postData.userId;
    postData.userId = userId;
    postData.postDate = new Date();
    postData.isReposted = true;
    postData.id = undefined;
    postData.commentsCount = 0;
    postData.likesCount = 0;
    postData.createdAt = undefined;
    postData.updatedAt = undefined;
    const newPost = new BlogPostEntity(postData);
    return newPost;
  }
}