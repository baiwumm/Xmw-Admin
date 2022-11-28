/*
 * @Description: 全局响应拦截器
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-14 09:58:57
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-28 10:47:38
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseModel } from '@/global/interface'; // 返回体结构
import { responseMessage } from '@/utils'; // 全局工具函数

@Injectable()
export class HttpReqTransformInterceptor<T>
  implements NestInterceptor<T, ResponseModel>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseModel> {
    return next.handle().pipe(
      map(({ data, msg, code }) => {
        /**
         * @description: response 将返回一个对象
         * @description: 报装返回体，设计返回的逻辑
         * @author: Cyan
         */
        return responseMessage(data, msg, code);
      }),
    );
  }
}
