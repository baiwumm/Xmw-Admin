/*
 * @Description: XmwMenu Entity
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-27 10:13:54
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 17:23:20
 */
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsIn,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { XmwInternational } from '@/models/xmw_international.model'; // 数据库实体
import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体
import type {
  Layouts,
  MenuTheme,
  MenuTypes,
  Status,
  TargetTypes,
} from '@/utils/types';
import type { MenuAttributes } from '@/utils/types/system';
@Table({ tableName: 'xmw_menu', underscored: false })
export class XmwMenu
  extends Model<MenuAttributes, MenuAttributes>
  implements MenuAttributes {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: '菜单id',
  })
  menu_id: string;

  //国际化对应的name
  @IsUUID(4)
  @ForeignKey(() => XmwInternational)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: '国际化对应的name',
  })
  name: string;

  //菜单类型
  @IsIn({
    args: [['dir', 'menu', 'button']],
    msg: '菜单类型：menu_type 字段值错误',
  })
  @Column({
    type: DataType.ENUM,
    values: ['dir', 'menu', 'button'],
    allowNull: false,
    comment: '菜单类型（dir:目录，menu:菜单,button:按钮）',
  })
  menu_type: MenuTypes;

  //路由url
  @Column({ type: DataType.STRING(100), comment: '路由url' })
  path?: string;

  //菜单图标
  @Column({ type: DataType.STRING(50), comment: '菜单图标' })
  icon?: string;

  //菜单对应的文件路径
  @Column({ type: DataType.STRING(200), comment: '菜单对应的文件路径' })
  component?: string;

  //路由重定向地址
  @Column({ type: DataType.STRING(100), comment: '路由重定向地址' })
  redirect?: string;

  //父级id
  @IsUUID(4)
  @Column({ type: DataType.UUID, comment: '父级id' })
  parent_id?: string;

  //当path是一个url，点击新窗口打开
  @IsIn({
    args: [['_blank', '_self', '_parent', '_top']],
    msg: 'target 字段值错误',
  })
  @Column({
    type: DataType.ENUM,
    values: ['_blank', '_self', '_parent', '_top'],
    comment: '当path是一个url，点击新窗口打开',
  })
  target?: TargetTypes;

  //菜单标识(页面按钮权限控制)
  @Column({ type: DataType.STRING(100), comment: '菜单标识(页面按钮权限控制)' })
  permission?: string;

  //是否显示layout布局
  @IsIn({
    args: [['side', 'top', 'mix']],
    msg: 'layout 字段值错误',
  })
  @Column({
    type: DataType.ENUM,
    values: ['side', 'top', 'mix'],
    comment: '是否显示layout布局（side:侧边菜单，top:顶部菜单,mix:混合菜单）',
  })
  layout?: Layouts;

  //导航菜单的主题
  @IsIn({
    args: [['dark', 'light']],
    msg: 'navTheme 字段值错误',
  })
  @Column({
    type: DataType.ENUM,
    values: ['dark', 'light'],
    comment: '导航菜单的主题（dark:暗黑风格，light:亮色风格）',
  })
  navTheme?: MenuTheme;

  //顶部导航的主题，mix 模式生效
  @IsIn({
    args: [['dark', 'light']],
    msg: 'headerTheme 字段值错误',
  })
  @Column({
    type: DataType.ENUM,
    values: ['dark', 'light'],
    comment: '顶部导航的主题，mix 模式生效（dark:暗黑风格，light:亮色风格）',
  })
  headerTheme?: MenuTheme;

  //是否隐藏子路由
  @Column({
    type: DataType.INTEGER,
    comment: '是否隐藏子路由',
    get() {
      return !!this.getDataValue('hideChildrenInMenu');
    },
  })
  hideChildrenInMenu: number;

  //是否隐藏菜单，包括子路由
  @Column({
    type: DataType.INTEGER,
    comment: '是否隐藏菜单，包括子路由',
    get() {
      return !!this.getDataValue('hideInMenu');
    },
  })
  hideInMenu: number;

  //是否在面包屑中隐藏
  @Column({
    type: DataType.INTEGER,
    comment: '是否在面包屑中隐藏',
    get() {
      return !!this.getDataValue('hideInBreadcrumb');
    },
  })
  hideInBreadcrumb: number;

  //是否显示顶栏
  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
    comment: '是否显示顶栏',
    get() {
      return !!this.getDataValue('headerRender');
    },
  })
  headerRender: number;

  //是否显示页脚
  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
    comment: '是否显示页脚',
    get() {
      const footerRender = this.getDataValue('footerRender');
      return footerRender ? undefined : false;
    },
  })
  footerRender: number;

  //当前路由是否展示菜单
  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
    comment: '当前路由是否展示菜单',
    get() {
      const menuRender = this.getDataValue('menuRender');
      return menuRender ? undefined : false;
    },
  })
  menuRender: number;

  //当前路由是否展示菜单顶栏
  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
    comment: '当前路由是否展示菜单顶栏',
    get() {
      const menuHeaderRender = this.getDataValue('menuHeaderRender');
      return menuHeaderRender ? undefined : false;
    },
  })
  menuHeaderRender: number;

  //子项往上提，只是不展示父菜单
  @Column({
    type: DataType.INTEGER,
    comment: '子项往上提，只是不展示父菜单',
    get() {
      return !!this.getDataValue('flatMenu');
    },
  })
  flatMenu: number;

  //固定顶栏
  @Column({
    type: DataType.INTEGER,
    comment: '固定顶栏',
    get() {
      return !!this.getDataValue('fixedHeader');
    },
  })
  fixedHeader: number;

  //固定菜单
  @Column({
    type: DataType.INTEGER,
    comment: '固定菜单',
    get() {
      return !!this.getDataValue('fixSiderbar');
    },
  })
  fixSiderbar: number;

  //创建人
  @IsUUID(4)
  @ForeignKey(() => XmwUser)
  @Column({ type: DataType.UUID, allowNull: false, comment: '创建人' })
  founder: string;

  //排序
  @Column({ type: DataType.INTEGER, allowNull: false, comment: '排序' })
  sort: number;

  //菜单状态
  @IsIn({
    args: [[0, 1]],
    msg: 'status 字段值错误',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '菜单状态（0:禁用，1：正常）',
  })
  status: Status;

  @BelongsTo(() => XmwInternational, { as: 'i' }) // 定义多对一关系。注意使用BelongsTo是多对一关系的【多】表
  interInfo: XmwInternational;

  @BelongsTo(() => XmwUser, { as: 'u' }) // 定义多对一关系。注意使用BelongsTo是多对一关系的【多】表
  userInfo: XmwUser;
}
