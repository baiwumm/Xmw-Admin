/*
 * @Description: 查询组织管理列表参数 Dto
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-20 16:50:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-09 09:59:43
 */
import { ApiProperty } from '@nestjs/swagger';

export class ListOrganizationDto {
  @ApiProperty({
    type: String,
    description: '组织名称',
    default: '阿里巴巴',
    required: false,
  })
  org_name?: string;

  @ApiProperty({
    type: String,
    description: '组织编码',
    default: 'Alibaba',
    required: false,
  })
  org_code?: string;

  @ApiProperty({
    type: String,
    description: '组织类型',
    enum: ['company', 'unit', 'department', 'team'],
    default: 'company',
    required: false,
  })
  org_type?: string;

  @ApiProperty({
    type: Number,
    description: '组织状态',
    default: 1,
    required: false,
  })
  status?: number;

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
