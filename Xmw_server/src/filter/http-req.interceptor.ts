/*
 * @Description: 全局响应拦截器
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-14 09:58:57
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-14 13:51:02
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseModel } from '@/common/interface'; // 返回体结构

@Injectable()
export class HttpReqTransformInterceptor<T>
  implements NestInterceptor<T, ResponseModel>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseModel> {
    return next.handle().pipe(
      map((data) => {
        // 报装返回体，设计返回的逻辑
        console.log(data);
        return { data, code: 200, msg: '', success: true };
      }),
    );
  }
}
