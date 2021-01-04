import {IUser, TUserResponse} from '../interfaces/IUser';

export default class User implements IUser {
  private readonly _name: string;
  private readonly _email: string;

  constructor(user: TUserResponse) {;
    this._name = user.name;
    this._email = user.email;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  toJSON(): Partial<User> {
    return {
      name: this.name,
      email: this.email
    };
  }
}
