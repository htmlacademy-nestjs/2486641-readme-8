import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import { AuthenticationValidateMessage, AuthValidateValue } from "../authentication-module/authentication.constant";

export class CreateUserDto {
  @ApiProperty({ description: 'User email', example: 'example@email.com' })
  @IsEmail({}, { message: AuthenticationValidateMessage.Email })
  public email: string;

  @ApiProperty({ description: 'User name', example: 'Ivanov Ivan' })
  @Length(
    AuthValidateValue.name.minLength, 
    AuthValidateValue.name.maxLength, 
    { message: AuthenticationValidateMessage.Password }
  )
  @IsString()
  public name: string;

  @ApiProperty({ description: 'User password', example: 'Pa$$w0rD' })
  @Length(
    AuthValidateValue.password.minLength, 
    AuthValidateValue.password.maxLength, 
    { message: AuthenticationValidateMessage.Password }
  )
  @IsString()
  public password: string;
}
