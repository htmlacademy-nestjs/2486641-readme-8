import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsString, Length } from "class-validator";
import { CommentValidateMessage, CommentValidateValue } from "../blog-comment.constant";

export class CreateCommentDto {
  @ApiProperty({ description: 'Идентификатор автора публикации', example: '6766e16f90c0264a74a1f9d4' })
  @IsMongoId()
  userId: string;

  @ApiProperty({ description: 'Текст комментария', example: 'Very good!' })
  @IsString({ message: CommentValidateMessage.text.formatMessage })
  @Length(
    CommentValidateValue.text.minLength,
    CommentValidateValue.text.maxLength,
    { message: CommentValidateMessage.text.lengthMessage }
  )
  public text: string;
}
