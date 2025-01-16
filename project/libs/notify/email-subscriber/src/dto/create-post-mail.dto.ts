import { PostType } from '@project/core';
import { IsDateString, IsIn, IsMongoId, IsUUID } from 'class-validator';

export class CreatePostMailDto {
  @IsUUID()
  public id: string;

  @IsIn(Object.values(PostType))
  public type: string;

  @IsDateString()
  public postDate: Date;

  @IsMongoId()
  public userId: string;
}