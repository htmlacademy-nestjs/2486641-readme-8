export const DEFAULT_COMMENT_COUNT_LIMIT = 50;
export const DEFAULT_PAGE_COUNT = 1;

export const CommentValidateValue = {
  text: {
    minLength: 10,
    maxLength: 300,
  }
} as const;

export const CommentValidateMessage = {
  text: {
    lengthMessage: `min length for comment is ${CommentValidateValue.text.minLength}, max is ${CommentValidateValue.text.maxLength}`,
    formatMessage: 'text is required',
  }
} as const;

export const PostFieldDescription = {
  id: { description: 'Уникальный идентификатор комментария', example: 'fc57663c-3675-4543-8653-2e29fbb37b1d' },
  userId: { description: 'Идентификатор автора комментария', example: '6766e16f90c0264a74a1f9d4' },
  postId: { description: 'Идентификатор публикации', example: 'dd4319c5-5454-420c-8025-b4af417d7f47' },
  text: { description: 'Текст комментария', example: 'Пример комментария' },
  createdAt: { description: 'Дата создания', example: new Date() },
  updatedAt: { description: 'Дата редактирования', example: new Date() },
} as const;