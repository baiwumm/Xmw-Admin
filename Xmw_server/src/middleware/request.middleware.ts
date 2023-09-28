/*
 * @Description: 全局请求拦截中间件
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-04-13 20:28:08
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 15:22:29
 */
import { NextFunction, Request, Response } from 'express';
export function requestMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (
    req.method === 'GET' ||
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/logout')
  ) {
    next();
  } else {
    res.send({ code: -1, msg: '演示系统,禁止操作!', data: null });
  }
}
