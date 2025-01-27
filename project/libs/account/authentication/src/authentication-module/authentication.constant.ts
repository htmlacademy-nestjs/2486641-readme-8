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