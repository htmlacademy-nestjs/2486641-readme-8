import { Comment } from "../comment/comment.interface";
import { Like } from "../like/like.interface";
import { AppPostType } from "./const"

export interface Post {
  id?: string;
  type: AppPostType;
  tags?: string[];
  originalUserId?: string;
  userId: string;
  postDate?: Date;
  isPublished: boolean;
  isReposted: boolean;
  originalId?: string;
  url?: string;
  description?: string;
  text?: string;
  author?: string;
  title?: string;
  preview?: string;
  createdAt?: Date;
  updatedAt?: Date;
  comments: Comment[];
  likes: Like[];
}
