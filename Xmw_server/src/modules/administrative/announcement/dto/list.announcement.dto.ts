/*
 * @Description: 查询活动公告列表 DTO
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-25 16:33:56
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-08-25 16:36:08
 */
import { ApiProperty } from '@nestjs/swagger';

export class ListAnnouncementDto {
  @ApiProperty({
    type: String,
    description: '标题',
    default: '国庆节放假啦',
    required: false,
  })
  title?: string;

  @ApiProperty({
    type: String,
    description: '类型',
    default: '1',
    required: false,
  })
  type?: string;

  @ApiProperty({
    type: Number,
    description: '状态',
    default: 1,
    required: false,
  })
  status?: number;

  @ApiProperty({
    type: Number,
    description: '是否置顶',
    default: 1,
    required: false,
  })
  pinned?: number;

  @ApiProperty({
    type: Boolean,
    description: '只查询未读消息',
    default: false,
    required: false,
  })
  unready?: boolean;

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
}
