/*
 * @Description: 保存组织数据 Dto
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-19 17:14:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-09 09:52:00
 */
import { ApiProperty } from '@nestjs/swagger';

/**
 * @description: 保存组织数据 Dto
 * @return {*}
 * @author: Cyan
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
  org_type: string;

  @ApiProperty({
    type: Number,
    description: '组织状态',
    default: 1,
  })
  status: number;

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
