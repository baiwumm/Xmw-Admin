/*
 * @Description: 保存角色数据 Dto
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-28 18:06:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-09 14:10:09
 */
import { ApiProperty } from '@nestjs/swagger';

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
    type: Number,
    description: '排序',
    default: 1,
  })
  sort: number;

  @ApiProperty({
    type: Number,
    description: '角色状态',
    default: 1,
  })
  status: number;

  @ApiProperty({
    type: String,
    description: '角色描述',
    default: '拥有系统全部权限',
  })
  describe: string;
}

/**
 * @description: 更新角色状态 Dto
 * @return {*}
 * @author: Cyan
 */
export class UpdateRoleStatusDto {
  @ApiProperty({
    type: Number,
    description: '角色状态',
    default: 1,
  })
  status: number;
}
