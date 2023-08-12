import { Request, Response, NextFunction } from 'express';
import { ReasonPhrases as httpReason } from 'http-status-codes';
import { StatusCodes as httpStatus } from 'http-status-codes';

export const expressResponseExtensionsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.sendResponse = (
    data: any,
    message: string = httpReason.OK, // this is default response
    code: number = httpStatus.OK,
  ) => {
    res.status(code).json({ code, message, data });
  };

  res.sendErrorResponse = (
    errorMsg: any = httpReason.BAD_REQUEST,
    code: number = httpStatus.BAD_REQUEST,
    errorData: any = null,
  ) => {
    res.status(code).json({ code, errorMsg, errorData });
  };
  next();
};
