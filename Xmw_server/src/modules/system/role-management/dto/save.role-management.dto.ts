/*
 * @Description: 保存角色数据 Dto
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-28 18:06:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-28 18:19:24
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator'; // entity validator

/**
 * @description: 保存角色数据 Dto
 * @return {*}
 * @author: Cyan
 */
export class SaveRoleManagementDto {
  @ApiProperty({
    type: String,
    description: '角色名称',
    default: '超级管理员',
  })
  @IsNotEmpty({ message: '角色名称不能为空' })
  @Length(2, 32, { message: '角色名称的长度在2-36个字符' })
  role_name: string;

  @ApiProperty({
    type: String,
    description: '角色编码',
    default: 'Super Admin',
  })
  role_code: string;

  @ApiProperty({
    type: Array,
    description: '菜单权限',
    default: ['79581210-60b7-4c66-b6ae-14b013c3661e'],
  })
  menu_permission: string[];

  @ApiProperty({
    type: String,
    description: '排序',
    default: 1,
  })
  sort: number;

  @ApiProperty({
    type: String,
    description: '角色状态',
    default: '1',
  })
  status: string;

  @ApiProperty({
    type: String,
    description: '角色描述',
    default: '拥有系统全部权限',
  })
  describe: string;
}
