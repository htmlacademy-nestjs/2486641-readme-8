import { PostType, SortDirection } from "@project/core";

export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_PAGE_COUNT = 1;

export const PostValidateValue = {
  TitleVideo: {
    MinLength: 20,
    MaxLength: 50,
  },
  TitleText: {
    MinLength: 20,
    MaxLength: 50,
  },
  Tags: {
    MaxCount: 8,
    MinLength: 3,
    MaxLength: 10,
  },
  DescriptionLink: {
    MaxLength: 300
  },
  Text: {
    MinLength: 100,
    MaxLength: 1024,
  },
  PreviewText: {
    MinLength: 50,
    MaxLength: 255,
  },
  TextQuote: {
    MinLength: 20,
    MaxLength: 300,
  },
  AuthorQuote: {
    MinLength: 3,
    MaxLength: 50,
  }
} as const;

export const PostValidateMessage = {
  IsPublished: {
    FormatMessage: 'isPublished must be boolean',
  },
  TitleVideo: {
    FormatMessage: 'title must be string',
    LengthMessage: `min length for title is ${PostValidateValue.TitleVideo.MinLength}, max is ${PostValidateValue.TitleVideo.MaxLength}`,
  },
  TitleText: {
    FormatMessage: 'title must be string',
    LengthMessage: `min length for title is ${PostValidateValue.TitleText.MinLength}, max is ${PostValidateValue.TitleText.MaxLength}`,
  },
  Tags: {
    LengthMessage: `min length for tag is ${PostValidateValue.Tags.MinLength}, max is ${PostValidateValue.Tags.MaxLength}`,
    CountMessage: `max count of Tags is ${PostValidateValue.Tags.MaxCount}`,
    SpaceMessage: `must not contain a space`,
    FirstSymbolMessage: `tag must start with a letter`
  },
  DescriptionLink: {
    LengthMessage: `max length for description link is ${PostValidateValue.DescriptionLink.MaxLength}`,
  },
  Text: {
    LengthMessage: `min length for text is ${PostValidateValue.Text.MinLength}, max is ${PostValidateValue.Text.MaxLength}`,
  },
  PreviewText: {
    LengthMessage: `min length for preview is ${PostValidateValue.PreviewText.MinLength}, max is ${PostValidateValue.PreviewText.MaxLength}`,
  },
  TextQuote: {
    LengthMessage: `min length for text quote is ${PostValidateValue.TextQuote.MinLength}, max is ${PostValidateValue.TextQuote.MaxLength}`,
  },
  AuthorQuote: {
    LengthMessage: `min length for author quote is ${PostValidateValue.AuthorQuote.MinLength}, max is ${PostValidateValue.AuthorQuote.MaxLength}`,
  },
} as const;

export const PostFieldDescription = {
  Id: { description: 'Уникальный идентификатор публикации', example: 'dd4319c5-5454-420c-8025-b4af417d7f47' },
  OriginalId: { description: 'Идентификатор оригинальной публикации', example: 'dd4319c5-5454-420c-8025-b4af417d7f47' },
  Type: { description: 'Тип контента', example: PostType.Text, enum: PostType },
  Tags: { description: 'Список тэгов', example: ['Tag1', 'Tag2'], required: false },
  UserId: { description: 'Идентификатор автора публикации', example: '6766e16f90c0264a74a1f9d4' },
  OriginalUserId: { description: 'Идентификатор оригинального автора публикации', example: '6766e16f90c0264a74a1f9d4' },
  PostDate: { description: 'Дата публикации', example: new Date() },
  IsPublished: { description: 'Признак "опубликована"', example: 'true' },
  TitleVideo: { description: 'Название публикации', example: 'Моя видео публикация', required: false },
  UrlVideo: { description: 'Ссылка на видео', example: 'https://my-videos.com/example-video', required: false },
  TitleText: { description: 'Название публикации', example: 'Моя текстовая публикация', required: false },
  PreviewText: { description: 'Анонс публикации', example: 'Пример анонса публикации', required: false },
  Text: { description: 'Текст публикации', example: 'Пример текста публикации', required: false },
  TextQuote: { description: 'Текст цитаты', example: `I'll be back`, required: false },
  AuthorQuote: { description: 'Автор цитаты', example: 'T-900', required: false },
  UrlPhoto: { description: 'Фотография', example: 'upload/example.jpg', required: false },
  UrlLink: { description: 'Ссылка', example: 'https://up.htmlacademy.ru/profession/fullstack/8/nodejs-2/8/project/readme', required: false },
  DescriptionLink: { description: 'Описание ссылки', example: 'Личный проект «Readme»', required: false },
  IsReposted: { description: 'Признак "репост"', example: 'true' },
  CreatedAt: { description: 'Дата создания', example: new Date() },
  UpdatedAt: { description: 'Дата редактирования', example: new Date() },
  CommentsCount: { description: 'Количество комментариев', example: 50 },
  LikesCount: { description: 'Количество лайков', example: 77 },
} as const;

export enum SortField {
  PostDate = 'Дата публикации',
  LikesCount = 'Количество лайков',
  CommentsCount = 'Количество комментариев',
};

export const DEFAULT_SORT_FIELD = SortField.PostDate;