import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsString, Length } from "class-validator";
import { CommentValidateMessage, CommentValidateValue } from "../blog-comment.constant";

export class CreateCommentDto {
  @ApiProperty({ description: 'Идентификатор автора публикации', example: '6766e16f90c0264a74a1f9d4' })
  @IsMongoId()
  userId: string;

  @ApiProperty({ description: 'Текст комментария', example: 'Very good!' })
  @IsString({ message: CommentValidateMessage.Text.FormatMessage })
  @Length(
    CommentValidateValue.Text.MinLength,
    CommentValidateValue.Text.MaxLength,
    { message: CommentValidateMessage.Text.LengthMessage }
  )
  public text: string;
}
