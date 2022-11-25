/*
 * @Description: 查询用户管理列表参数 Dto
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-09 18:06:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-25 10:06:40
 */
import { ApiProperty } from '@nestjs/swagger';

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
  sex?: string;

  @ApiProperty({
    type: Number,
    description: '用户状态',
    default: 1,
    required: false,
  })
  status?: number;

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
