import { Request, Response } from 'express';
import { ReasonPhrases as httpReason } from 'http-status-codes';
import { StatusCodes as httpStatus } from 'http-status-codes';

export class HelloWorldCTRL {
  constructor() {}

  helloworld = async (req: Request, res: Response) => {
    try {
      return res.send(httpStatus.OK).sendResponse(httpReason.OK);
    } catch (err) {
      console.error(err);
      return res
        .send(httpStatus.INTERNAL_SERVER_ERROR)
        .sendErrorResponse(httpStatus.INTERNAL_SERVER_ERROR);
    }
  };
}
