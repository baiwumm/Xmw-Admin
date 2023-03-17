/*
 * @Description: OperationLogs Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-12-12 10:10:55
 * @LastEditors: Cyan
 * @LastEditTime: 2023-03-17 16:33:40
 */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { OperationLogsService } from './operation-logs.service'; // OperationLogs Service
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger'; // swagger 接口文档
import { XmwLogs } from '@/models/xmw_logs.model'; // Xmw_logs 实体
import { ResponseModel, PageResModel } from '@/global/interface'; // TS类型注解
import { ListOperationLogsDto, ResponseOperationLogsDto } from './dto';
import { responseMessage } from '@/utils'; // 全局工具函数

@Controller('system/operation-logs')
export class OperationLogsController {
  constructor(private readonly operationLogsService: OperationLogsService) { }
  /**
   * @description: 获取用户管理列表
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ type: ResponseOperationLogsDto })
  @ApiOperation({ summary: '获取操作日志列表' })
  async getUserList(
    @Query() logsInfo: ListOperationLogsDto,
  ): Promise<ResponseModel<PageResModel<XmwLogs[]>>> {
    const response = await this.operationLogsService.getLogsList(logsInfo);
    return responseMessage(response);
  }
}
