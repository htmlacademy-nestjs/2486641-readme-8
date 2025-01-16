import { PostType } from "./post/const";

export interface PostMail {
  id: string;
  type: PostType;
  postDate: Date
  userId: string;
}