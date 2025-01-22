import { PostType } from "@project/core";

export class AddNewPostDto {
  public type: PostType;
  public tags?: string[];
  public userId: string;
  public postDate?: Date;
  public isPublished: boolean;
  public titleVideo?: string;
  public urlVideo?: string;
  public titleText?: string;
  public previewText?: string;
  public text?: string;
  public textQuote?: string;
  public authorQuote?: string;
  public urlPhoto?: string;
  public urlLink?: string;
  public descriptionLink?: string;
}