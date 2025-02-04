export const DEFAULT_COMMENT_COUNT_LIMIT = 50;
export const DEFAULT_PAGE_COUNT = 1;

export const CommentValidateValue = {
  Text: {
    MinLength: 10,
    MaxLength: 300,
  }
} as const;

export const CommentValidateMessage = {
  Text: {
    LengthMessage: `min length for comment is ${CommentValidateValue.Text.MinLength}, max is ${CommentValidateValue.Text.MaxLength}`,
    FormatMessage: 'text is required',
  }
} as const;

export const PostFieldDescription = {
  Id: { description: 'Уникальный идентификатор комментария', example: 'fc57663c-3675-4543-8653-2e29fbb37b1d' },
  UserId: { description: 'Идентификатор автора комментария', example: '6766e16f90c0264a74a1f9d4' },
  PostId: { description: 'Идентификатор публикации', example: 'dd4319c5-5454-420c-8025-b4af417d7f47' },
  Text: { description: 'Текст комментария', example: 'Пример комментария' },
  CreatedAt: { description: 'Дата создания', example: new Date() },
  UpdatedAt: { description: 'Дата редактирования', example: new Date() },
} as const;