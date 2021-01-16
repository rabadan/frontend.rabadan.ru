import {IUser, TUserResponse} from '../interfaces/IUser';

export default class User implements IUser {
  private readonly _name: string;
  private readonly _email: string;
  private readonly _role: string;

  constructor(user: TUserResponse) {;
    this._name = user.name;
    this._email = user.email;
    this._role = user.role;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get is_admin(): boolean {
    return this._role === "role_admin";
  }

  toJSON(): Partial<User> {
    return {
      name: this.name,
      email: this.email
    };
  }
}
