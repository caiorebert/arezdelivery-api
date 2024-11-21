import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    Logger.log("entrando no middleware");
    if (req.method === 'OPTIONS') {
        console.log(1);
      res.header('Access-Control-Allow-Origin', '*'); // Altere conforme necessário
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.sendStatus(204); // No Content
    } else {
      next();
    }
  }
}