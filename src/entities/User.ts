import {IUser, TUserResponse} from '../interfaces/IUser';

export default class User implements IUser {
  private readonly _id: string;
  private readonly _email: string;

  constructor(user: TUserResponse) {
    this._id = user.id;
    this._email = user.email;
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  toJSON(): Partial<User> {
    return {
      id: this.id,
      email: this.email
    };
  }
}
