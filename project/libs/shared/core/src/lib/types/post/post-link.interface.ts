import { BasePost } from "./base-post.interface";

export interface PostLink extends BasePost {
  url: string,
  description: string
}
