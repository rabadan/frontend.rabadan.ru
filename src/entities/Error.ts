import { IError } from '../interfaces/IError';

export default class Error implements IError {
  private readonly _description: string;

  constructor(description: string) {
    this._description = description;
  }

  static parseResponse(error_response: any) {
    const message =
      (error_response.response &&
        error_response.response.data &&
        (error_response.response.data.message || error_response.response.data.error)) ||
      error_response.message ||
      error_response.toString();

    return new Error(message);
  }

  get description(): string {
    return this._description;
  }
}
