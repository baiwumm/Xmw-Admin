/*
 * @Description: 保存活动公告数据 DTO
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-25 16:50:16
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 17:15:27
 */
import { ApiProperty } from '@nestjs/swagger';

import type { AnnouncementTypes, Flag, Status } from '@/utils/types';

/**
 * @description: 保存活动公告数据 DTO
 * @author: 白雾茫茫丶
 */
export class SaveAnnouncementDto {
  @ApiProperty({
    type: String,
    description: '主键id',
    default: '0c01ef7d-2f6f-440a-b642-62564d41f473',
    required: false,
  })
  announcement_id?: string;

  @ApiProperty({
    type: String,
    description: '标题',
    default: '留学生实探日本超市，福岛产品无人问半价都不买：他们自己都不吃',
  })
  title?: string;

  @ApiProperty({
    type: String,
    description: '正文内容',
    default:
      '<p>日前，有留学生在日本逛超市发现，其他地区产的蔬菜几乎卖光，而福岛的产品... </p>',
  })
  content?: string;

  @ApiProperty({
    type: String,
    description: '类型',
    default: '1',
  })
  type?: AnnouncementTypes;

  @ApiProperty({
    type: Number,
    description: '状态',
    default: 1,
  })
  status?: Status;

  @ApiProperty({
    type: Number,
    description: '是否置顶',
    default: 1,
  })
  pinned?: Flag;
}

/**
 * @description: 更新是否置顶 Dto
 * @author: 白雾茫茫丶
 */
export class UpdatePinnedDto {
  @ApiProperty({
    type: Number,
    description: '是否置顶',
    default: 1,
  })
  pinned: Flag;
}

/**
 * @description: 已读活动公告数据 DTO
 * @author: 白雾茫茫丶
 */
export class SaveAlreadyDto {
  @ApiProperty({
    type: String,
    description: '活动公告id',
    default: '0c01ef7d-2f6f-440a-b642-62564d41f473',
  })
  announcement_id: string;

  @ApiProperty({
    type: String,
    description: '用户id',
    default: '0c01ef7d-2f6f-440a-b642-62564d41f473',
  })
  user_id: string;
}

/**
 * @description: 未读消息条数
 * @author: 白雾茫茫丶
 */
export class unAlreadyDto {
  @ApiProperty({
    type: Number,
    description: '总条数',
    default: 88,
  })
  total: number;

  @ApiProperty({
    type: Number,
    description: '公告',
    default: 32,
  })
  announcement: number;

  @ApiProperty({
    type: Number,
    description: '活动',
    default: 20,
  })
  activity: number;

  @ApiProperty({
    type: Number,
    description: '消息',
    default: 16,
  })
  message: number;

  @ApiProperty({
    type: Number,
    description: '通知',
    default: 20,
  })
  notification: number;
}
