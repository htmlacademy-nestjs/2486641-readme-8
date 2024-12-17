import { User } from "../user/user.interface";
import { PostType } from "./const"

export abstract class BasePost {
  id: string;
  type: PostType;
  tags?: string;
  originalUser: User;
  user: User;
  createDate: Date;
  postDate: Date;
  isPublished: boolean;
  isReposted: boolean;
  originalId: string;
}
