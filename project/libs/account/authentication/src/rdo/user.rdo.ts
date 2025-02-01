import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AuthFieldDescription } from '../authentication-module/authentication.constant';

export class UserRdo {
  @ApiProperty(AuthFieldDescription.id)
  @Expose()
  public id: string;

  @ApiProperty(AuthFieldDescription.email)
  @Expose()
  email: string;

  @ApiProperty(AuthFieldDescription.name)
  @Expose()
  name: string;

  @ApiProperty(AuthFieldDescription.createdAt)
  @Expose()
  public createdAt: Date;

  @ApiProperty(AuthFieldDescription.countPosts)
  @Expose()
  public countPosts: number;

  @ApiProperty(AuthFieldDescription.countSubscribers)
  @Expose()
  public countSubscribers: number;
}
