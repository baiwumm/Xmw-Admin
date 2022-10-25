/*
 * @Description: 全局响应拦截器
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-14 09:58:57
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-24 14:41:48
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlainObject } from 'lodash';

import { RES_CODE_MAP } from '@/global/enum'; // 返回体结构
import { ResponseModel } from '@/global/interface'; // 返回体结构

@Injectable()
export class HttpReqTransformInterceptor<T>
  implements NestInterceptor<T, ResponseModel>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseModel> {
    return next.handle().pipe(
      map((response) => {
        /**
         * @description: response 将返回一个对象
         * @description: 报装返回体，设计返回的逻辑
         * @author: Cyan
         */
        // 设置默认值，默认请求成功，如果是请求失败或者自定义的需要在Service里面返回
        const initResponse = { data: {}, code: 200, msg: '', success: true };
        // 合并对象
        isPlainObject(response) && Object.assign(initResponse, response);
        // 根据状态码设置 success
        initResponse.success = initResponse.code === 200;
        // 处理参数
        !initResponse.msg &&
          (initResponse.msg = RES_CODE_MAP[initResponse.code]);
        return Object.assign(initResponse, response);
      }),
    );
  }
}
