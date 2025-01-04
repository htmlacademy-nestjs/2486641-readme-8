import { BasePost } from "./base-post.interface";

export interface PostText extends BasePost {
  title: string,
  preview: string,
  text: string
}
