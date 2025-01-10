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