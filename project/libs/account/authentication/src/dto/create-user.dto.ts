import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import { AuthenticationValidateMessage, AuthFieldDescription, AuthValidateValue } from "../authentication-module/authentication.constant";

export class CreateUserDto {
  @ApiProperty(AuthFieldDescription.email)
  @IsEmail({}, { message: AuthenticationValidateMessage.Email })
  public email: string;

  @ApiProperty(AuthFieldDescription.name)
  @Length(
    AuthValidateValue.name.minLength, 
    AuthValidateValue.name.maxLength, 
    { message: AuthenticationValidateMessage.Password }
  )
  @IsString()
  public name: string;

  @ApiProperty(AuthFieldDescription.password)
  @Length(
    AuthValidateValue.password.minLength, 
    AuthValidateValue.password.maxLength, 
    { message: AuthenticationValidateMessage.Password }
  )
  @IsString()
  public password: string;
}
