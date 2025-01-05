import { BasePost } from "./base-post.interface";
import { PostType } from "./const";

export interface PostPhoto extends BasePost {
  type: PostType.photo,
  url: string
}
