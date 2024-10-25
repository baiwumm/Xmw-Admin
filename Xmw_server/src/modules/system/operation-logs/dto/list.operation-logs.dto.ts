/*
 * @Description: 查询操作日志列表参数 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-03-17 15:50:23
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-25 15:17:44
 */
import { ApiProperty } from '@nestjs/swagger';

import type { RequestMethods } from '@/utils/types';

export class ListOperationLogsDto {
  @ApiProperty({
    type: String,
    description: '用户id',
    default: 'bf75a509-f90e-4a29-8bf7-470b581550f6',
    required: false,
  })
  user_id?: string;

  @ApiProperty({
    type: Number,
    description: '条数',
    default: 10,
  })
  pageSize: number;

  @ApiProperty({
    type: Number,
    description: '当前页码',
    default: 1,
  })
  current: number;

  @ApiProperty({
    type: Date,
    description: '开始日期',
    default: '2022-10-01 00:00:00',
    required: false,
  })
  start_time?: Date;

  @ApiProperty({
    type: Date,
    description: '结束日期',
    default: '2022-10-02 23:59:59',
    required: false,
  })
  end_time?: Date;

  @ApiProperty({
    type: String,
    description: '请求方法',
    enum: ['POST', 'PUT', 'DELETE', 'PATCH'],
    default: 'POST',
    required: false,
  })
  method?: RequestMethods;
}

/**
 * @description: 删除操作日志
 */
export class DelLogsDto {
  @ApiProperty({
    type: [String],
    description: 'id 集合',
    default: [
      'f45cd48b-e703-49db-91be-ae7f594e73e0',
      'fa0fc96c-6c01-459d-b904-c6f65ec369b5',
    ],
  })
  ids: string[];
}
