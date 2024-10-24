/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-24 14:00:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-24 14:01:46
 * @Description: LoggerInterceptor 日志拦截器
 */

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OperationLogsService } from '@/modules/system/operation-logs/operation-logs.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly operationLogsService: OperationLogsService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.operationLogsService.logAction();
    return next.handle().pipe(map((data) => data));
  }
}
