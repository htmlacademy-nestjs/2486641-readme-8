import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsString, Length } from "class-validator";
import { AuthenticationValidateMessage, AuthFieldDescription, AuthValidateValue } from "../authentication-module/authentication.constant";

export class ChangePasswordDto {
  @ApiProperty(AuthFieldDescription.id)
  @IsMongoId()
  public userId: string;

  @ApiProperty(AuthFieldDescription.currentPassword)
  @Length(
    AuthValidateValue.password.minLength, 
    AuthValidateValue.password.maxLength, 
    { message: AuthenticationValidateMessage.Password }
  )
  @IsString()
  public currentPassword: string;

  @ApiProperty(AuthFieldDescription.newPassword)
  @Length(
    AuthValidateValue.password.minLength, 
    AuthValidateValue.password.maxLength, 
    { message: AuthenticationValidateMessage.Password }
  )
  @IsString()
  public newPassword: string;
}