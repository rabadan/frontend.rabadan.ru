export interface IError {
  code: number;
  description: string;
}

export type TError = {
  code: number;
  description: string;
}

export type TErrorResponse = string[];