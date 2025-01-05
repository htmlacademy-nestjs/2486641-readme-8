import { EntityFactory, Like } from "@project/core";
import { BlogLikeEntity } from "./blog-like.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BlogLikeFactory implements EntityFactory<BlogLikeEntity> {
    public create(entityPlainData: Like): BlogLikeEntity {
        return new BlogLikeEntity(entityPlainData);
    }
}