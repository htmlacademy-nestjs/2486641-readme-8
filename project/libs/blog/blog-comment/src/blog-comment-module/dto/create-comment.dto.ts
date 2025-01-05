import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty({
    description: 'Text of comment',
    example: 'Very good!'
  })
  public text: string;
}
