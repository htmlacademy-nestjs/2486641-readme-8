import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({ description: 'User email', example: 'example@email.com' })
  public email: string;

  @ApiProperty({ description: 'User password', example: 'Pa$$w0rD' })
  public password: string;
}
