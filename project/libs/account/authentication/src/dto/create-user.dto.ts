import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ description: 'User email', example: 'example@email.com' })
  public email: string;

  @ApiProperty({ description: 'User name', example: 'Ivanov Ivan' })
  public name: string;

  @ApiProperty({ description: 'User password', example: 'Pa$$w0rD' })
  public password: string;
}
