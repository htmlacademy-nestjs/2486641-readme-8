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
    if (postEntity.type === PostType.text) {
      // video  
      postEntity.titleVideo = null;
      postEntity.urlVideo = null;
      // quote
      postEntity.textQuote = null;
      postEntity.authorQuote = null;
      // photo
      postEntity.urlPhoto = null;
      // link
      postEntity.urlLink = null;
      postEntity.descriptionLink = null;
    }
    if (postEntity.type === PostType.link) {
      // video  
      postEntity.titleVideo = null;
      postEntity.urlVideo = null;
      // text
      postEntity.titleText = null;
      postEntity.previewText = null;
      postEntity.text = null;
      // quote
      postEntity.textQuote = null;
      postEntity.authorQuote = null;
      // photo
      postEntity.urlPhoto = null;
    }
    if (postEntity.type === PostType.photo) {
      // video  
      postEntity.titleVideo = null;
      postEntity.urlVideo = null;
      // text
      postEntity.titleText = null;
      postEntity.previewText = null;
      postEntity.text = null;
      // quote
      postEntity.textQuote = null;
      postEntity.authorQuote = null;
      // link
      postEntity.urlLink = null;
      postEntity.descriptionLink = null;
    }
    if (postEntity.type === PostType.quote) {
      // video  
      postEntity.titleVideo = null;
      postEntity.urlVideo = null;
      // text
      postEntity.titleText = null;
      postEntity.previewText = null;
      postEntity.text = null;
      // photo
      postEntity.urlPhoto = null;
      // link
      postEntity.urlLink = null;
      postEntity.descriptionLink = null;
    }
    if (postEntity.type === PostType.video) {
      // quote
      postEntity.textQuote = null;
      postEntity.authorQuote = null;
      // text
      postEntity.titleText = null;
      postEntity.previewText = null;
      postEntity.text = null;
      // photo
      postEntity.urlPhoto = null;
      // link
      postEntity.urlLink = null;
      postEntity.descriptionLink = null;
    }
  }
}