/*
 * @Description: 查询岗位管理列表参数 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-19 11:19:47
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-20 15:30:39
 */
import { ApiProperty } from '@nestjs/swagger';

export class ListJobsManagementDto {
  @ApiProperty({
    type: String,
    description: '岗位名称',
    default: '前端开发',
    required: false,
  })
  jobs_name?: string;

  @ApiProperty({
    type: String,
    description: '所属组织',
    default: '0c01ef7d-2f6f-440a-b642-62564d41f473',
    required: false,
  })
  org_id?: string;

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
