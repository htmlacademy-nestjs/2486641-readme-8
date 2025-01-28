import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo {
  @ApiProperty({ description: 'User uniq ID', example: '6766e16f90c0264a74a1f9d4' })
  @Expose()
  public id: string;

  @ApiProperty({ description: 'Register date', example: '2024-12-21T15:40:31.337Z' })
  @Expose()
  public createdAt: Date;

  @ApiProperty({ description: 'Count posts', example: '3' })
  @Expose()
  public countPosts: number;

  @ApiProperty({ description: 'Count subscribers', example: '10' })
  @Expose()
  public countSubscribers: number;
}
