import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsString, Length } from "class-validator";
import { AuthenticationValidateMessage, AuthValidateValue } from "../authentication-module/authentication.constant";

export class ChangePasswordDto {
  @ApiProperty({ description: 'Идентификатор пользователя', example: '6766e16f90c0264a74a1f9d4' })
  @IsMongoId()
  public userId: string;

  @ApiProperty({ description: 'User current password', example: 'Pa$$w0rD' })
  @Length(
    AuthValidateValue.password.minLength, 
    AuthValidateValue.password.maxLength, 
    { message: AuthenticationValidateMessage.Password }
  )
  @IsString()
  public currentPassword: string;

  @ApiProperty({ description: 'User new password', example: 'New_Pa$$w0rD' })
  @Length(
    AuthValidateValue.password.minLength, 
    AuthValidateValue.password.maxLength, 
    { message: AuthenticationValidateMessage.Password }
  )
  @IsString()
  public newPassword: string;
}