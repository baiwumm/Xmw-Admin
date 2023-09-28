/*
 * @Description: 查询用户管理列表参数 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-11-09 18:06:19
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 17:02:38
 */
import { ApiProperty } from '@nestjs/swagger';

import type { Sex, Status } from '@/utils/types';

export class ListUserManagementDto {
  @ApiProperty({
    type: String,
    description: '用户名称',
    default: 'admin',
    required: false,
  })
  user_name?: string;

  @ApiProperty({
    type: String,
    description: '用户性别',
    default: '1',
    required: false,
  })
  sex?: Sex;

  @ApiProperty({
    type: Number,
    description: '用户状态',
    default: 1,
    required: false,
  })
  status?: Status;

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
}
