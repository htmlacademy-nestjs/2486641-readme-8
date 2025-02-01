import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AuthFieldDescription } from '../authentication-module/authentication.constant';

export class LoggedUserRdo {
  @ApiProperty(AuthFieldDescription.id)
  @Expose()
  public id: string;

  @ApiProperty(AuthFieldDescription.email)
  @Expose()
  public email: string;

  @ApiProperty(AuthFieldDescription.accessToken)
  @Expose()
  public accessToken: string;

  @ApiProperty(AuthFieldDescription.refreshToken)
  @Expose()
  public refreshToken: string;
}
