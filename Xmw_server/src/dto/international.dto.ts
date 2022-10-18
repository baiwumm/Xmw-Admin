/*
 * @Description: InternationalListEto
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-17 09:34:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-18 18:07:25
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator'; // entity validator

/**
 * @description: 查询国际化列表参数 Dto
 * @return {*}
 * @author: Cyan
 */
export class InternationalListEto {
  @ApiProperty({
    type: String,
    description: '国际化字段',
    default: 'international',
    required: false,
  })
  international_name?: string;

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

  @ApiProperty({
    type: Boolean,
    description: '是否是菜单，用于展示菜单树形结构',
    default: false,
    required: false,
  })
  isMenu?: boolean;
}

/**
 * @description:查询列表返回响应体 Dto
 * @return {*}
 * @author: Cyan
 */
export class InternationalResponseEto {
  @ApiProperty({
    type: String,
    description: '国际化id',
    default: '0c01ef7d-2f6f-440a-b642-62564d41f473',
  })
  international_id: string;

  @ApiProperty({
    type: String,
    description: '国际化字段',
    default: 'international',
  })
  international_name: string;

  @ApiProperty({
    type: String,
    description: '中文',
    default: '登录成功！',
  })
  'zh-CN': string;

  @ApiProperty({
    type: String,
    description: '英文',
    default: 'Login successful!',
  })
  'en-US': string;

  @ApiProperty({
    type: String,
    description: '日文',
    default: 'ログイン成功!',
  })
  'ja-JP': string;

  @ApiProperty({
    type: String,
    description: '繁体中文',
    default: '	登錄成功！',
  })
  'zh-TW': string;

  @ApiProperty({
    type: String,
    description: '父级id',
    default: '0c01ef7d-2f6f-440a-b642-62564d41f473',
  })
  parent_id: string;

  @ApiProperty({
    type: String,
    description: '创建人',
    default: '0c01ef7d-2f6f-440a-b642-62564d41f473',
  })
  founder: string;

  @ApiProperty({
    type: String,
    description: '排序',
    default: 1,
  })
  sort: number;

  @ApiProperty({
    type: Date,
    description: '创建时间',
    default: '2022-10-01 00:00:00',
  })
  created_time: Date;

  @ApiProperty({
    type: Date,
    description: '最后一次更新时间',
    default: '2022-10-02 23:59:59',
  })
  updated_time: Date;
}

/**
 * @description: 创建国际化 Dto
 * @return {*}
 * @author: Cyan
 */
export class InternationalSaveEto {
  @ApiProperty({
    type: String,
    description: '国际化id',
    default: '0c01ef7d-2f6f-440a-b642-62564d41f473',
    required: false,
  })
  international_id?: string;

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
  @IsNotEmpty({ message: '国际化字段不能为空' })
  international_name: string;

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
    default: '	登錄成功！',
    required: false,
  })
  'zh-TW'?: string;

  @ApiProperty({
    type: String,
    description: '排序',
    default: 1,
  })
  sort: number;
}

/**
 * @description: 删除国际化 Dto
 * @return {*}
 * @author: Cyan
 */
export class InternationalDeleteEto {
  @ApiProperty({
    type: String,
    description: 'international_id',
    default: '0c01ef7d-2f6f-440a-b642-62564d41f473',
  })
  international_id?: string;
}
