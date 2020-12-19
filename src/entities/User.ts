import {IUser, TUserResponse} from '../interfaces/IUser';

export default class User implements IUser {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _email: string;

  constructor(user: TUserResponse) {
    this._id = user.id;
    this._name = user.name;
    this._email = user.email;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  toJSON(): Partial<User> {
    return {
      id: this.id,
      name: this.name,
      email: this.email
    };
  }
}
