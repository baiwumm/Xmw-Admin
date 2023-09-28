/*
 * @Description: 保存组织数据 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-19 17:14:38
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 17:12:42
 */
import { ApiProperty } from '@nestjs/swagger';

import type { OrgTypes, Status } from '@/utils/types';

/**
 * @description: 保存组织数据 Dto
 * @author: 白雾茫茫丶
 */
export class SaveOrganizationDto {
  @ApiProperty({
    type: String,
    description: '父级id',
    default: '0c01ef7d-2f6f-440a-b642-62564d41f473',
    required: false,
  })
  parent_id?: string;

  @ApiProperty({
    type: String,
    description: '组织名称',
    default: '阿里巴巴',
  })
  org_name: string;

  @ApiProperty({
    type: String,
    description: '组织编码',
    default: 'Alibaba',
  })
  org_code: string;

  @ApiProperty({
    type: String,
    description: '组织类型',
    default: 'company',
  })
  org_type: OrgTypes;

  @ApiProperty({
    type: Number,
    description: '组织状态',
    default: 1,
  })
  status: Status;

  @ApiProperty({
    type: Number,
    description: '排序',
    default: 1,
  })
  sort: number;

  @ApiProperty({
    type: String,
    description: '组织描述',
    default:
      '阿里巴巴集团控股有限公司（简称：阿里巴巴集团）是马云带领下的18位创始人于1999年在浙江省杭州市创立的公司。',
  })
  describe: string;
}
