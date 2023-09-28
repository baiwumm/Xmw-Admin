/*
 * @Description: 保存国际化 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-19 17:14:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-09 14:52:55
 */
import { ApiProperty } from '@nestjs/swagger';
/**
 * @description: 保存国际化 Dto
 * @author: 白雾茫茫丶
 */
export class SaveInternationalDto {
  @ApiProperty({
    type: String,
    description: '父级id',
    default: '0c01ef7d-2f6f-440a-b642-62564d41f473',
    required: false,
  })
  parent_id?: string;

  @ApiProperty({
    type: String,
    description: '国际化字段',
    default: 'international',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: '中文',
    default: '登录成功！',
    required: false,
  })
  'zh-CN'?: string;

  @ApiProperty({
    type: String,
    description: '英文',
    default: 'Login successful!',
    required: false,
  })
  'en-US'?: string;

  @ApiProperty({
    type: String,
    description: '日文',
    default: 'ログイン成功!',
    required: false,
  })
  'ja-JP'?: string;

  @ApiProperty({
    type: String,
    description: '繁体中文',
    default: '登錄成功！',
    required: false,
  })
  'zh-TW'?: string;

  @ApiProperty({
    type: Number,
    description: '排序',
    default: 1,
  })
  sort: number;
}
