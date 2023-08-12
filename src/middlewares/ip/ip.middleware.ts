import { Request, Response, NextFunction } from 'express';

export class IpMiddleware {
  constructor() {}

  public async validateIp(req: Request, res: Response, next: NextFunction) {
    console.log(req.ip);
    next();
  }
}
