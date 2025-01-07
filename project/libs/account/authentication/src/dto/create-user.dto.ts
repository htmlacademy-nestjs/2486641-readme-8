import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { AuthenticationValidateMessage } from "../authentication-module/authentication.constant";

export class CreateUserDto {
  @ApiProperty({ description: 'User email', example: 'example@email.com' })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({ description: 'User name', example: 'Ivanov Ivan' })
  @IsString()
  public name: string;

  @ApiProperty({ description: 'User password', example: 'Pa$$w0rD' })
  @IsString()
  public password: string;
}
