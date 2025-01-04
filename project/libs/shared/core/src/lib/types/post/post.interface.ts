import { PostLink } from "./post-link.interface";
import { PostPhoto } from "./post-photo.interface";
import { PostQuote } from "./post-quote.interface";
import { PostText } from "./post-text.interface";
import { PostVideo } from "./post-video.interface";

export type Post = PostLink | PostPhoto | PostQuote | PostText | PostVideo;
