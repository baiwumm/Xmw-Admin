/*
 * @Description: 获取客户端真实IP
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-11-25 17:05:39
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-25 17:06:24
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import * as requestIp from 'request-ip'

export const IpAddress = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    if (req.clientIp)
      return req.clientIp;
    return requestIp.getClientIp(req);
  })