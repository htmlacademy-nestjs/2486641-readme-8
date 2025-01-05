import { BasePost } from "./base-post.interface";
import { PostType } from "./const";

export interface PostLink extends BasePost {
  type: PostType.link,
  url: string,
  description: string
}
