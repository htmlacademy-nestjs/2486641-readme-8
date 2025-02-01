import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import { AuthenticationValidateMessage, AuthFieldDescription, AuthValidateValue } from "../authentication-module/authentication.constant";

export class LoginUserDto {
  @ApiProperty(AuthFieldDescription.email)
  @IsEmail({}, { message: AuthenticationValidateMessage.Email })
  public email: string;

  @ApiProperty(AuthFieldDescription.password)
  @Length(
    AuthValidateValue.password.minLength, 
    AuthValidateValue.password.maxLength, 
    { message: AuthenticationValidateMessage.Password }
  )
  @IsString()
  public password: string;
}
