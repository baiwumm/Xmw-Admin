/*
 * @Description: XmwMenu Entity
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-27 10:13:54
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-09 10:17:05
 */
import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import type { MenuAttributes } from '@/attributes/system';
import { XmwInternational } from '@/models/xmw_international.model'; // 数据库实体

@Table({ tableName: 'xmw_menu', underscored: false })
export class XmwMenu
  extends Model<MenuAttributes, MenuAttributes>
  implements MenuAttributes
{
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: '菜单id',
  })
  menu_id: string;

  //国际化对应的name
  @ForeignKey(() => XmwInternational)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: '国际化对应的name',
  })
  name: string;

  //菜单类型
  @Column({
    type: DataType.ENUM,
    values: ['dir', 'menu', 'button'],
    allowNull: false,
    comment: '菜单类型（dir:目录，menu:菜单,button:按钮）',
  })
  menu_type: string;

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
  @Column({ type: DataType.UUID, comment: '父级id' })
  parent_id?: string;

  //当path是一个url，点击新窗口打开
  @Column({
    type: DataType.ENUM,
    values: ['_blank', '_self', '_parent', '_top'],
    comment: '当path是一个url，点击新窗口打开',
  })
  target?: string;

  //菜单标识(页面按钮权限控制)
  @Column({ type: DataType.STRING(100), comment: '菜单标识(页面按钮权限控制)' })
  permission?: string;

  //路由和菜单的权限控制
  @Column({ type: DataType.STRING(50), comment: '路由和菜单的权限控制' })
  access?: string;

  //是否显示layout布局
  @Column({
    type: DataType.ENUM,
    values: ['side', 'top', 'mix'],
    comment: '是否显示layout布局（side:侧边菜单，top:顶部菜单,mix:混合菜单）',
  })
  layout?: string;

  //导航菜单的主题
  @Column({
    type: DataType.ENUM,
    values: ['dark', 'light'],
    comment: '导航菜单的主题（dark:暗黑风格，light:亮色风格）',
  })
  navTheme?: string;

  //顶部导航的主题，mix 模式生效
  @Column({
    type: DataType.ENUM,
    values: ['dark', 'light'],
    comment: '顶部导航的主题，mix 模式生效（dark:暗黑风格，light:亮色风格）',
  })
  headerTheme?: string;

  //是否隐藏子路由
  @Column({ type: DataType.INTEGER, comment: '是否隐藏子路由' })
  hideChildrenInMenu: number;

  //是否隐藏菜单，包括子路由
  @Column({ type: DataType.INTEGER, comment: '是否隐藏菜单，包括子路由' })
  hideInMenu: number;

  //是否在面包屑中隐藏
  @Column({ type: DataType.INTEGER, comment: '是否在面包屑中隐藏' })
  hideInBreadcrumb: number;

  //是否显示顶栏
  @Column({ type: DataType.INTEGER, comment: '是否显示顶栏' })
  headerRender: number;

  //是否显示页脚
  @Column({ type: DataType.INTEGER, comment: '是否显示页脚' })
  footerRender: number;

  //当前路由是否展示菜单
  @Column({ type: DataType.INTEGER, comment: '当前路由是否展示菜单' })
  menuRender: number;

  //当前路由是否展示菜单顶栏
  @Column({ type: DataType.INTEGER, comment: '当前路由是否展示菜单顶栏' })
  menuHeaderRender: number;

  //子项往上提，只是不展示父菜单
  @Column({ type: DataType.INTEGER, comment: '子项往上提，只是不展示父菜单' })
  flatMenu: number;

  //固定顶栏
  @Column({ type: DataType.INTEGER, comment: '固定顶栏' })
  fixedHeader: number;

  //固定菜单
  @Column({ type: DataType.INTEGER, comment: '固定菜单' })
  fixSiderbar: number;

  //创建人
  @Column({ type: DataType.UUID, comment: '创建人' })
  founder?: string;

  //排序
  @Column({ type: DataType.INTEGER, allowNull: false, comment: '排序' })
  sort: number;

  //菜单状态
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '菜单状态（0:禁用，1：正常）',
  })
  status: number;

  @BelongsTo(() => XmwInternational, { as: 'i' }) // 定义多对一关系。注意使用BelongsTo是多对一关系的【多】表
  interInfo: XmwInternational;
}
