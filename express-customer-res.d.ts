import { Response } from 'express';

declare global {
  namespace Express {
    interface Response {
      sendResponse(data?: any, message?: string, code?: number): void;

      sendErrorResponse(errorMsg?: any, code?: number, errorData?: any);
    }
  }
}
