import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo {
  @ApiProperty({ description: 'User uniq ID', example: '1ae640b4-cd54-40ff-959c-96fc3fd2623c' })
  @Expose()
  public id: string;

  @ApiProperty({ description: 'User avatar', example: '/images/user.png' })
  @Expose()
  public avatar: string;

  @ApiProperty({ description: 'User email', example: 'example@email.com' })
  @Expose()
  public email: string;

  @ApiProperty({ description: 'User name', example: 'Ivanov Ivan' })
  @Expose()
  public name: string;
}
