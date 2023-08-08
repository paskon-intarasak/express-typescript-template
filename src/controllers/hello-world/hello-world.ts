import { Request, Response } from "express";
import { ApiResponse } from '../../base/common';

export class HelloWorldCTRL {
  constructor() { }

  hello = (req: Request, res: Response) => {
    try {
      return ApiResponse.OK(res, 'Ok')
    } catch (err) {
      console.error(err)
      return ApiResponse.InternalError(err)
    }
  }
}