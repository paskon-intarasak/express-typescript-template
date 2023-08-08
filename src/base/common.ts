import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';
// ## สำหรับ ApiResponse Json
export class ApiResponse<T> {
  code: number;
  message: string;
  data: T;

  constructor();
  constructor(code: number);
  constructor(code: number, message: string);
  constructor(code: number, message: string, data?: T);
  constructor(code?: number, message?: string, data?: T) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static Genesis<T>(code: number, message?: string, data?: T) {
    return new ApiResponse<T>(code, message, data);
  }

  static Create<T>(code?: number, message?: string, data?: T) {
    return new ApiResponse<T>(code, message, data);
  }

  static OK<T>(res: Response, message?: string, data?: T) {
    if (!message) message = 'OK';
    return res
      .status(StatusCodes.OK)
      .json(ApiResponse.Genesis(StatusCodes.OK, message, data));
  }

  static NOTOk<T>(data?: T) {
    return new ApiResponse<T>(0, 'NOT OK', data);
  }

  static BadRequest<T>(res: Response, message: string) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(ApiResponse.Genesis(StatusCodes.BAD_REQUEST, message));
  }
  static InternalError<T>(res: Response, message?: string, errData?: T) {
    if (!message) message = 'Internal Server Error';
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        ApiResponse.Genesis(
          StatusCodes.INTERNAL_SERVER_ERROR,
          message,
          errData,
        ),
      );
  }
}
