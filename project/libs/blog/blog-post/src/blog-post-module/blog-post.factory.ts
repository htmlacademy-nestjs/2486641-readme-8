import { EntityFactory, Post, PostType } from "@project/core";
import { Injectable } from "@nestjs/common";
import { BlogPostEntity } from "./blog-post.entity";
import { CreatePostDto } from "./dto/create-post.dto";

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: Post): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

  public static createFromCreateDto(dto: CreatePostDto): BlogPostEntity {
    return new BlogPostEntity({ ...dto, isPublished: true, postDate: new Date(), isReposted: false });
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

  public static preparePost(postEntity: BlogPostEntity): void {
    delete postEntity.commentsCount;
    delete postEntity.likesCount;
    delete postEntity.createdAt;
    delete postEntity.updatedAt;
    if (postEntity.type === PostType.Text) {
      postEntity.titleVideo = null;
      postEntity.urlVideo = null;
      postEntity.textQuote = null;
      postEntity.authorQuote = null;
      postEntity.urlPhoto = null;
      postEntity.urlLink = null;
      postEntity.descriptionLink = null;
    }
    if (postEntity.type === PostType.Link) {
      postEntity.titleVideo = null;
      postEntity.urlVideo = null;
      postEntity.titleText = null;
      postEntity.previewText = null;
      postEntity.text = null;
      postEntity.textQuote = null;
      postEntity.authorQuote = null;
      postEntity.urlPhoto = null;
    }
    if (postEntity.type === PostType.Photo) {
      postEntity.titleVideo = null;
      postEntity.urlVideo = null;
      postEntity.titleText = null;
      postEntity.previewText = null;
      postEntity.text = null;
      postEntity.textQuote = null;
      postEntity.authorQuote = null;
      postEntity.urlLink = null;
      postEntity.descriptionLink = null;
    }
    if (postEntity.type === PostType.Quote) {
      postEntity.titleVideo = null;
      postEntity.urlVideo = null;
      postEntity.titleText = null;
      postEntity.previewText = null;
      postEntity.text = null;
      postEntity.urlPhoto = null;
      postEntity.urlLink = null;
      postEntity.descriptionLink = null;
    }
    if (postEntity.type === PostType.Video) {
      postEntity.textQuote = null;
      postEntity.authorQuote = null;
      postEntity.titleText = null;
      postEntity.previewText = null;
      postEntity.text = null;
      postEntity.urlPhoto = null;
      postEntity.urlLink = null;
      postEntity.descriptionLink = null;
    }
  }
}