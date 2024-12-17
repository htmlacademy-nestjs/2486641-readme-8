import { Post } from "../post/post";
import { User } from "../user/user.interface";

export interface Comment {
  id: string,
  user: User,
  post: Post,
  text: string,
  createDate: Date
}
