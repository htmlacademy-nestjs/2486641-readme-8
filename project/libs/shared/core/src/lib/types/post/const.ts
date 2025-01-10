export const PostType = {
  video: 'video',
  text: 'text',
  quote: 'quote',
  photo: 'photo',
  link: 'link'
} as const;

export type PostType = typeof PostType[keyof typeof PostType];
