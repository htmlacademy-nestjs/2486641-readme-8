import { BasePost } from "./base-post.interface";

export interface PostText extends BasePost {
  name: string,
  preview: string,
  text: string
}
