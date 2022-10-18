/*
 * @Description: 全局 拦截器 用来收集日志
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-16 22:04:12
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-18 10:41:04
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from '../utils/log4js';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { originalUrl, method, ip, params, query, body } =
      context.getArgByIndex(1).req;
    return next.handle().pipe(
      map((data) => {
        const logFormat = `
            --------------------- TransformInterceptor 日志 ---------------------
            Request original url: ${originalUrl}
            Method: ${method}
            IP: ${ip}
            Parmas: ${JSON.stringify(params)}
            Query: ${JSON.stringify(query)}
            Body: ${JSON.stringify(body)} 
            --------------------- TransformInterceptor 日志 ---------------------
            `;
        Logger.info(logFormat);
        Logger.access(logFormat);
        return data;
      }),
    );
  }
}
