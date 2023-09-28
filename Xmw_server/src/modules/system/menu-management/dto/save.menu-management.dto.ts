/*
 * @Description: 保存菜单数据 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-27 14:49:01
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 16:35:34
 */
import { ApiProperty } from '@nestjs/swagger';

import type {
  Flag,
  Layouts,
  MenuTheme,
  MenuTypes,
  Status,
  TargetTypes,
} from '@/utils/types';

/**
 * @description: 保存菜单数据 Dto
 * @author: 白雾茫茫丶
 */
export class SaveMenuManagementDto {
  @ApiProperty({
    type: String,
    description: '菜单类型',
    default: 'menu',
  })
  menu_type: MenuTypes;

  @ApiProperty({
    type: String,
    description: '父级id',
    default: '0c01ef7d-2f6f-440a-b642-62564d41f473',
    required: false,
  })
  parent_id?: string;

  @ApiProperty({
    type: String,
    description: '菜单名称',
    default: '0c01ef7d-2f6f-440a-b642-62564d41f473',
    required: false,
  })
  name?: string;

  @ApiProperty({
    type: String,
    description: '路由地址',
    default: '/system/menu-management',
    required: false,
  })
  path?: string;

  @ApiProperty({
    type: String,
    description: '组件路径',
    default: './System/MenuManagement',
    required: false,
  })
  component?: string;

  @ApiProperty({
    type: String,
    description: '重定向地址',
    default: null,
    required: false,
  })
  redirect?: string;

  @ApiProperty({
    type: String,
    description: '图标',
    default: 'icon-menu-management',
    required: false,
  })
  icon?: string;

  @ApiProperty({
    type: String,
    description: '权限控制',
    default: 'normalRouteFilter',
    required: false,
  })
  access?: string;

  @ApiProperty({
    type: String,
    description: '权限标识',
    default: 'system:menu-management',
    required: false,
  })
  permission?: string;

  @ApiProperty({
    type: String,
    description: '是否显示layout布局',
    default: 'side',
    required: false,
  })
  layout?: Layouts;

  @ApiProperty({
    type: String,
    description: '导航菜单的主题',
    default: 'light',
    required: false,
  })
  navTheme?: MenuTheme;

  @ApiProperty({
    type: String,
    description: '顶部导航的主题，mix 模式生效',
    default: 'light',
    required: false,
  })
  headerTheme?: MenuTheme;

  @ApiProperty({
    type: String,
    description: '当path是一个url，点击新窗口打开',
    default: '_blank',
    required: false,
  })
  target?: TargetTypes;

  @ApiProperty({
    type: Number,
    description: '是否隐藏子路由',
    default: 0,
    required: false,
  })
  hideChildrenInMenu?: Flag;

  @ApiProperty({
    type: Number,
    description: '是否隐藏菜单，包括子路由',
    default: 0,
    required: false,
  })
  hideInMenu?: Flag;

  @ApiProperty({
    type: Number,
    description: '是否在面包屑中隐藏',
    default: 0,
    required: false,
  })
  hideInBreadcrumb?: Flag;

  @ApiProperty({
    type: Number,
    description: '是否显示顶栏',
    default: 1,
    required: false,
  })
  headerRender?: Flag;

  @ApiProperty({
    type: Number,
    description: '是否显示页脚',
    default: 1,
    required: false,
  })
  footerRender?: Flag;

  @ApiProperty({
    type: Number,
    description: '当前路由是否展示菜单',
    default: 1,
    required: false,
  })
  menuRender?: Flag;

  @ApiProperty({
    type: Number,
    description: '当前路由是否展示菜单顶栏',
    default: 1,
    required: false,
  })
  menuHeaderRender?: Flag;

  @ApiProperty({
    type: Number,
    description: '子项往上提，只是不展示父菜单',
    default: 0,
    required: false,
  })
  flatMenu?: Flag;

  @ApiProperty({
    type: Number,
    description: '固定顶栏',
    default: 1,
    required: false,
  })
  fixedHeader?: Flag;

  @ApiProperty({
    type: Number,
    description: '固定菜单',
    default: 1,
    required: false,
  })
  fixSiderbar?: Flag;

  @ApiProperty({
    type: Number,
    description: '排序',
    default: 1,
  })
  sort: number;

  @ApiProperty({
    type: Number,
    description: '菜单状态',
    default: 1,
  })
  status: Status;
}
