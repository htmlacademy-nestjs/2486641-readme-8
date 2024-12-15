import { AuthUser, Entity, StorableEntity } from '@project/core';

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser>{
  public email: string;
  public name: string;
  public passwordHash: string;

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
  }

  toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      passwordHash: this.passwordHash
    };
  }
}
