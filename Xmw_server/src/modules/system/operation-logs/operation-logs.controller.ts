/*
 * @Description: OperationLogs Controller
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-12-12 10:10:55
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 16:55:58
 */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'; // swagger 接口文档

import { ListOperationLogsDto, ResponseOperationLogsDto } from './dto';
import { OperationLogsService } from './operation-logs.service'; // OperationLogs Service

@Controller('system/operation-log')
export class OperationLogsController {
  constructor(private readonly operationLogsService: OperationLogsService) { }
  /**
   * @description: 获取用户管理列表
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ type: ResponseOperationLogsDto })
  @ApiOperation({ summary: '获取操作日志列表' })
  async getUserList(@Query() logsInfo: ListOperationLogsDto) {
    const response = await this.operationLogsService.getLogsList(logsInfo);
    return response;
  }
}
