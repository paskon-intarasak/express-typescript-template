import { Response } from 'express';

declare global {
  namespace Express {
    interface Response {
      sendResponse(data?: any, code?: number, message?: string): void;

      sendErrorResponse(errorMsg?: any, code?: number, errorData?: any);
    }
  }
}
