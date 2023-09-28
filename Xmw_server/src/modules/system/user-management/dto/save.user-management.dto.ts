/*
 * @Description: 保存用户数据 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-11-10 11:30:40
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 17:06:18
 */
import { ApiProperty } from '@nestjs/swagger';

import type { Sex, Status } from '@/utils/types';

/**
 * @description: 保存用户数据
 * @author: 白雾茫茫丶
 */
export class SaveUserManagementDto {
  @ApiProperty({
    type: String,
    description: '用户名称',
    default: 'admin',
  })
  user_name: string;

  @ApiProperty({
    type: String,
    description: '用户工号',
    default: 'SZ001',
  })
  work_no: string;

  @ApiProperty({
    type: String,
    description: '中文名',
    default: '李知恩',
  })
  cn_name: string;

  @ApiProperty({
    type: String,
    description: '中文名',
    default: '李知恩',
    required: false,
  })
  en_name?: string;

  @ApiProperty({
    type: String,
    description: '性别',
    default: '1',
  })
  sex: Sex;

  @ApiProperty({
    type: Number,
    description: '年龄',
    default: 18,
  })
  age: number;

  @ApiProperty({
    type: String,
    description: '电子邮箱',
    default: '843348394@qq.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    type: String,
    description: '电话号码',
    default: '13800138000',
  })
  phone: string;

  @ApiProperty({
    type: Number,
    description: '排序',
    default: 1,
  })
  sort: number;

  @ApiProperty({
    type: Number,
    description: '用户状态',
    default: 1,
  })
  status: Status;

  @ApiProperty({
    type: String,
    description: '座右铭',
    default: '真正的大师永远怀着一颗学徒的心',
    required: false,
  })
  motto?: string;

  @ApiProperty({
    type: String,
    description: '所属角色',
    default: 'c49aeeca-bc95-444e-a437-a2d36e79def',
  })
  role_id: string;

  @ApiProperty({
    type: String,
    description: '所属组织',
    default: '9e0d462d-5254-41ba-b8f3-982a7cf588f0',
  })
  org_id: string;

  @ApiProperty({
    type: String,
    description: '所属岗位',
    default: '046aeaa4-f707-4981-8a30-6e4a8488eb52',
  })
  jobs_id: string;

  @ApiProperty({
    type: Array,
    description: '所属城市',
    default: ['13', '1302', '130203'],
  })
  city: string[];

  @ApiProperty({
    type: String,
    description: '详细地址',
    default: '公寓888',
  })
  addredd: string;

  @ApiProperty({
    type: Array,
    description: '人物标签',
    default: ['善良', '阳光'],
    required: false,
  })
  tags?: string[];

  @ApiProperty({
    type: String,
    description: '用户头像',
    default:
      'https://react.baiwumm.com/static/image/2023-01-13/5d7453ad-477c-47b9-be6e-212227710033.gif',
    required: false,
  })
  avatar_url?: string;

  @ApiProperty({
    type: Array,
    description: '用户头像',
    default: 'v+M+IRi7oG0tn2sJGZUHRQ==',
    required: false,
  })
  password?: string;
}

/**
 * @description: 更新用户状态 Dto
 * @author: 白雾茫茫丶
 */
export class UpdateUserStatusDto {
  @ApiProperty({
    type: Number,
    description: '用户状态',
    default: 1,
  })
  status: Status;
}
