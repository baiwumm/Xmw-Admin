/*
 * @Description: InternationalEto
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-17 09:34:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-17 09:42:10
 */
import { ApiProperty } from '@nestjs/swagger';

export class InternationalEto {
  @ApiProperty({ type: String, description: 'id' })
  id: string;

  @ApiProperty({ type: String, description: '国际化字段' })
  name: string;

  @ApiProperty({ type: String, description: '中文' })
  'zh-CN'?: string;

  @ApiProperty({ type: String, description: '英文' })
  'en-US'?: string;

  @ApiProperty({ type: String, description: '日文' })
  'ja-JP'?: string;

  @ApiProperty({ type: String, description: '繁体中文' })
  'zh-TW'?: string;

  @ApiProperty({ type: String, description: '父级id' })
  parent_id?: string;

  @ApiProperty({ type: String, description: '创建人' })
  founder?: string;

  @ApiProperty({ type: Date, description: '创建时间' })
  created_time: Date;

  @ApiProperty({ type: Date, description: '最后一次更新时间' })
  updated_time?: Date;

  @ApiProperty({ type: Array, description: '子级' })
  children?: InternationalEto[];
}
