import { BasePost } from "./base-post.interface";

export interface PostQuote extends BasePost {
  text: string,
  author: string
}
