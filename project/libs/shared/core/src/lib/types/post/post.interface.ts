import { PostType } from "./const"

export interface Post {
  id?: string;
  type: PostType;
  tags?: string[];
  originalUserId?: string;
  userId: string;
  postDate?: Date;
  isPublished: boolean;
  originalId?: string;
  isReposted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  commentsCount?: number;
  likesCount?: number;
  // video  
  titleVideo?: string;
  urlVideo?: string;
  // text
  titleText?: string;
  previewText?: string;
  text?: string;
  // quote
  textQuote?: string;
  authorQuote?: string;
  // photo
  urlPhoto?: string;
  // link
  urlLink?: string;
  descriptionLink?: string;
}
