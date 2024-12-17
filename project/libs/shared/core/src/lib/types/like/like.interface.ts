import { Post } from "../post/post";
import { User } from "../user/user.interface";

export interface Like {
  id: string,
  user: User,
  post: Post,
  createDate: Date
}
