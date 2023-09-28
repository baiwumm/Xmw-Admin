/*
 * @Description: 查询操作日志列表参数 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-03-17 15:50:23
 * @LastEditors: Cyan
 * @LastEditTime: 2023-03-17 15:50:42
 */
import { ApiProperty } from '@nestjs/swagger';

export class ListOperationLogsDto {
  @ApiProperty({
    type: String,
    description: '用户名称',
    default: 'admin',
    required: false,
  })
  user_name?: string;

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
