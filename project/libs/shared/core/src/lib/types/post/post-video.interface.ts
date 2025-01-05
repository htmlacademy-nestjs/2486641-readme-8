import { BasePost } from "./base-post.interface";
import { PostType } from "./const";

export interface PostVideo extends BasePost {
  type: PostType.video,
  title: string,
  ulr: string
}
