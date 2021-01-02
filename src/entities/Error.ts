import { IError } from '../interfaces/IError';

export default class Error implements IError {
  private readonly _code: number;
  private readonly _description: string;

  constructor(code: number, description: string) {
    this._code = code;
    this._description = description;
  }

  static parseResponse(error_response: any) {
    const code = (error_response.response && error_response.response.status) || 0;

    const message =
      (error_response.response &&
        error_response.response.data &&
        (error_response.response.data.message || error_response.response.data.error)) ||
      error_response.message ||
      error_response.toString();

    return new Error(code, message);
  }

  get description(): string {
    return this._description;
  }

  get code(): number {
    return this._code;
  }
}
