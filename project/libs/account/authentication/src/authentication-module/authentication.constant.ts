export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';

export const AuthenticationResponseMessage = {
  LoggedSuccess: 'User has been successfully logged.',
  LoggedError: 'Password or Login is wrong.',
  UserFound: 'User found',
  UserNotFound: 'User not found',
  UserExist: 'User with the email already exists',
  UserCreated: 'The new user has been successfully created.',
} as const;

export const AuthValidateValue = {
  password: {
    minLength: 6,
    maxLength: 12,
  },
  name: {
    minLength: 3,
    maxLength: 50,
  },
} as const;

export const AuthenticationValidateMessage = {
  Email: 'The email is not valid',
  Password: `Min length for password is ${AuthValidateValue.password.minLength}, max is ${AuthValidateValue.password.maxLength}`,
  Name: `Min length for name is ${AuthValidateValue.name.minLength}, max is ${AuthValidateValue.name.maxLength}`,
} as const;

export const AuthFieldDescription = {
  id: { description: 'Уникальный идентификатор пользователя', example: 'dd4319c5-5454-420c-8025-b4af417d7f47' },
  name: { description: 'Имя пользователя', example: 'Ivanov Ivan' },
  email: { description: 'Электронная почта пользователя', example: 'example@email.com' },
  createdAt: { description: 'Дата регистрации', example: new Date() },
  countPosts: { description: 'Количество публикаций пользователя', example: 77 },
  countSubscribers: { description: 'Количество подписчиков пользователя', example: 0 },
  accessToken: { description: 'Access token' },
  refreshToken: { description: 'Refresh token' },
  currentPassword: { description: 'Текущий пароль', example: 'Pa$$w0rD' },
  newPassword: { description: 'Новый пароль', example: 'New_Pa$$w0rD' },
  password: { description: 'Пароль', example: 'Pa$$w0rD' },
  avatar: { description: 'Ссылка на аватар пользователя' },
} as const;