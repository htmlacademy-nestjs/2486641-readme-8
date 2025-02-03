import { AuthUser, Entity, StorableEntity } from '@project/core';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser>{
  public email: string;
  public name: string;
  public passwordHash: string;
  public avatar: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  populate(user?: AuthUser): void {
    if (! user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.name = user.name;
    this.passwordHash = user.passwordHash;
    this.avatar = user.avatar ?? undefined;
    this.createdAt = user.createdAt ?? undefined;
    this.updatedAt = user.updatedAt ?? undefined;
  }

  toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      passwordHash: this.passwordHash,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      avatar: this.avatar,
    };
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
