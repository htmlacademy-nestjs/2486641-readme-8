import { PostType, SortDirection } from "@project/core";

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
    spaceMessage: `must not contain a space`,
    firstSymbolMessage: `must start with a letter`
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

export const PostFieldDescription = {
  id: { description: 'Уникальный идентификатор публикации', example: 'dd4319c5-5454-420c-8025-b4af417d7f47' },
  originalId: { description: 'Идентификатор оригинальной публикации', example: 'dd4319c5-5454-420c-8025-b4af417d7f47' },
  type: { description: 'Тип контента', example: PostType.text },
  tags: { description: 'Список тэгов', example: ['Tag1', 'Tag2'] },
  userId: { description: 'Идентификатор автора публикации', example: '6766e16f90c0264a74a1f9d4' },
  originalUserId: { description: 'Идентификатор оригинального автора публикации', example: '6766e16f90c0264a74a1f9d4' },
  postDate: { description: 'Дата публикации', example: new Date() },
  isPublished: { description: 'Признак "опубликована"', example: 'true' },
  titleVideo: { description: 'Название публикации', example: 'Моя видео публикация' },
  urlVideo: { description: 'Ссылка на видео', example: 'https://my-videos.com/example-video' },
  titleText: { description: 'Название публикации', example: 'Моя текстовая публикация'},
  previewText: { description: 'Анонс публикации', example: 'Пример анонса публикации' },
  text: { description: 'Текст публикации', example: 'Пример текста публикации' },
  textQuote: { description: 'Текст цитаты', example: `I'll be back` },
  authorQuote: { description: 'Автор цитаты', example: 'T-900' },
  urlPhoto: { description: 'Фотография', example: 'upload/example.jpg' },
  urlLink: { description: 'Ссылка', example: 'https://up.htmlacademy.ru/profession/fullstack/8/nodejs-2/8/project/readme' },
  descriptionLink: { description: 'Описание ссылки', example: 'Личный проект «Readme»' },
  isReposted: { description: 'Признак "репост"', example: 'true' },
  createdAt: { description: 'Дата создания', example: new Date() },
  updatedAt: { description: 'Дата редактирования', example: new Date() },
  commentsCount: { description: 'Количество комментариев', example: 50 },
  likesCount: { description: 'Количество лайков', example: 77 },
} as const;

export enum SortField {
  PostDate = 'Дата публикации',
  LikesCount = 'Количество лайков',
  CommentsCount = 'Количество комментариев',
};

export const DEFAULT_SORT_FIELD = SortField.PostDate;