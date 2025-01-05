import { BasePost } from "./base-post.interface";
import { PostType } from "./const";

export interface PostQuote extends BasePost {
  type: PostType.quote,
  text: string,
  author: string
}
