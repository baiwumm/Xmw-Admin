/*
 * @Description: 全局请求拦截中间件
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2023-04-13 20:28:08
 * @LastEditors: Cyan
 * @LastEditTime: 2023-04-13 20:37:33
 */
import { Request, Response, NextFunction } from 'express';
export function requestMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.method === 'GET' || req.url.includes('/auth/login')) {
    next();
  } else {
    res.send({ code: -1, msg: '演示系统,禁止操作!', data: null });
  }
}
