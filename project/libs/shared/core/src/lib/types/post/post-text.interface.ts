import { BasePost } from "./base-post.interface";
import { PostType } from "./const";

export interface PostText extends BasePost {
  type: PostType.text,
  title: string,
  preview: string,
  text: string
}
