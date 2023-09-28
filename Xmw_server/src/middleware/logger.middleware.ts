/*
 * @Description: 日志收集管理中间件
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-17 08:54:02
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 15:22:15
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { Logger } from '@/utils/log4js';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 响应状态码
    const { statusCode } = res;
    const { method, originalUrl, ip } = req;
    next();
    // 组装日志信息
    const logFormat = `Method: ${method} \n Request original url: ${originalUrl} \n IP: ${ip} \n Status code: ${statusCode} \n`;
    // 根据状态码，进行日志类型区分
    if (statusCode >= 500) {
      Logger.error(logFormat);
    } else if (statusCode >= 400) {
      Logger.warn(logFormat);
    } else {
      Logger.access(logFormat);
      Logger.log(logFormat);
    }
  }
}

// 函数式中间件
export function logger(req: Request, res: Response, next: NextFunction) {
  // 响应状态码
  const { statusCode } = res;
  const { method, originalUrl, ip, params, query, body } = req;
  next();
  // 组装日志信息
  const logFormat = `
      --------------------- Logger中间件，日志收集 ---------------------
      Request original url: ${originalUrl}
      Method: ${method}
      IP: ${ip}
      Status code: ${statusCode}
      Parmas: ${JSON.stringify(params)}
      Query: ${JSON.stringify(query)}
      Body: ${JSON.stringify(body)} 
      --------------------- Logger中间件，日志收集 --------------------- 
      `;
  // 根据状态码，进行日志类型区分
  if (statusCode >= 500) {
    Logger.error(logFormat);
  } else if (statusCode >= 400) {
    Logger.warn(logFormat);
  } else {
    Logger.access(logFormat);
    Logger.log(logFormat);
  }
}
