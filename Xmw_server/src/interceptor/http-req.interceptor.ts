/*
 * @Description: 全局响应拦截器
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-14 09:58:57
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 15:23:17
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { responseMessage } from '@/utils'; // 全局工具函数
import type { Response } from '@/utils/types';

@Injectable()
export class HttpReqTransformInterceptor<T>
  implements NestInterceptor<T, Response>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    return next.handle().pipe(
      map(({ data, msg, code }) => {
        /**
         * @description: response 将返回一个对象
         * @description: 报装返回体，设计返回的逻辑
         * @author: 白雾茫茫丶
         */
        return responseMessage(data, msg, code);
      }),
    );
  }
}
