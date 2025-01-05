// export enum PostType {
//   video = 'video',
//   text = 'text',
//   quote = 'quote',
//   photo = 'photo',
//   link = 'link'
// }

export const PostTypes = {
  video: 'video',
  text: 'text',
  quote: 'quote',
  photo: 'photo',
  link: 'link'
} as const;

export type AppPostType = typeof PostTypes[keyof typeof PostTypes];

/*
const UserRoles = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const

type AppUserRole = typeof UserRoles[keyof typeof UserRoles]
*/

/*
export const Role: {
  USER: 'USER'
  ADMIN: 'ADMIN'
} = {
  USER: 'USER',
  ADMIN: 'ADMIN',
}

export type Role = typeof Role[keyof typeof Role]
*/

