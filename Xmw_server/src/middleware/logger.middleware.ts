/*
 * @Description: 日志收集管理中间件
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-17 08:54:02
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-17 18:26:01
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/log4js';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const code = res.statusCode; // 响应状态码
    next();
    // 组装日志信息
    const logFormat = `Method: ${req.method} \n Request original url: ${req.originalUrl} \n IP: ${req.ip} \n Status code: ${code} \n`;
    // 根据状态码，进行日志类型区分
    if (code >= 500) {
      Logger.error(logFormat);
    } else if (code >= 400) {
      Logger.warn(logFormat);
    } else {
      Logger.access(logFormat);
      Logger.log(logFormat);
    }
  }
}

// 函数式中间件
export function logger(req: Request, res: Response, next: NextFunction) {
  const code = res.statusCode; // 响应状态码
  next();
  // 组装日志信息
  const logFormat = `
      --------------------- Logger中间件，日志收集 ---------------------
      Request original url: ${req.originalUrl}
      Method: ${req.method}
      IP: ${req.ip}
      Status code: ${code}
      Parmas: ${JSON.stringify(req.params)}
      Query: ${JSON.stringify(req.query)}
      Body: ${JSON.stringify(req.body)} 
      --------------------- Logger中间件，日志收集 --------------------- 
      `;
  // 根据状态码，进行日志类型区分
  if (code >= 500) {
    Logger.error(logFormat);
  } else if (code >= 400) {
    Logger.warn(logFormat);
  } else {
    Logger.access(logFormat);
    Logger.log(logFormat);
  }
}
