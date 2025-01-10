import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";
import { CommentValidateMessage, CommentValidateValue } from "../blog-comment.constant";

export class CreateCommentDto {
  @ApiProperty({
    description: 'Text of comment',
    example: 'Very good!'
  })
  @IsString({ message: CommentValidateMessage.text.formatMessage })
  @Length(
    CommentValidateValue.text.minLength,
    CommentValidateValue.text.maxLength,
    { message: CommentValidateMessage.text.lengthMessage }
  )
  public text: string;
}
