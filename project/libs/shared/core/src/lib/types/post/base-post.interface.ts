import { Comment } from "../comment/comment.interface";
import { Like } from "../like/like.interface";
import { PostType } from "./const"

export abstract class BasePost {
  id: string;
  type: PostType;
  tags?: string[];
  originalUserId: string;
  userId: string;
  createDate: Date;
  postDate: Date;
  isPublished: boolean;
  isReposted: boolean;
  originalId: string;
  comments: Comment[];
  likes: Like[];
}
