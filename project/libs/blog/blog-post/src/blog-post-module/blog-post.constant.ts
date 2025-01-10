import { SortDirection } from "@project/core";

export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_PAGE_COUNT = 1;

export const PostValidateValue = {
  titleVideo: {
    minLength: 20,
    maxLength: 50,
  },
  titleText: {
    minLength: 20,
    maxLength: 50,
  },
  tags: {
    maxCount: 8,
    minLength: 3,
    maxLength: 10,
  },
  descriptionLink: {
    maxLength: 300
  },
  text: {
    minLength: 100,
    maxLength: 1024,
  },
  previewText: {
    minLength: 50,
    maxLength: 255,
  },
  textQuote: {
    minLength: 20,
    maxLength: 300,
  },
  authorQuote: {
    minLength: 3,
    maxLength: 50,
  }
} as const;

export const PostValidateMessage = {
  isPublished: {
    formatMessage: 'isPublished must be boolean',
  },
  titleVideo: {
    formatMessage: 'title must be string',
    lengthMessage: `min length for title is ${PostValidateValue.titleVideo.minLength}, max is ${PostValidateValue.titleVideo.maxLength}`,
  },
  titleText: {
    formatMessage: 'title must be string',
    lengthMessage: `min length for title is ${PostValidateValue.titleText.minLength}, max is ${PostValidateValue.titleText.maxLength}`,
  },
  tags: {
    lengthMessage: `min length for tag is ${PostValidateValue.tags.minLength}, max is ${PostValidateValue.tags.maxLength}`,
    countMessage: `max count of tags is ${PostValidateValue.tags.maxCount}`,
  },
  descriptionLink: {
    lengthMessage: `max length for description link is ${PostValidateValue.descriptionLink.maxLength}`,
  },
  text: {
    lengthMessage: `min length for text is ${PostValidateValue.text.minLength}, max is ${PostValidateValue.text.maxLength}`,
  },
  previewText: {
    lengthMessage: `min length for preview is ${PostValidateValue.previewText.minLength}, max is ${PostValidateValue.previewText.maxLength}`,
  },
  textQuote: {
    lengthMessage: `min length for text quote is ${PostValidateValue.textQuote.minLength}, max is ${PostValidateValue.textQuote.maxLength}`,
  },
  authorQuote: {
    lengthMessage: `min length for author quote is ${PostValidateValue.authorQuote.minLength}, max is ${PostValidateValue.authorQuote.maxLength}`,
  },
} as const;