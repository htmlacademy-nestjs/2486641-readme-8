import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { AuthenticationValidateMessage } from "../authentication-module/authentication.constant";

export class LoginUserDto {
  @ApiProperty({ description: 'User email', example: 'example@email.com' })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({ description: 'User password', example: 'Pa$$w0rD' })
  @IsString()
  public password: string;
}
