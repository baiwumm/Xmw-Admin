/*
 * @Description: xmw_menu Model
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-13 16:21:45
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-13 16:31:32
 */
import {
  Column,
  Model,
  Table,
  TableOptions,
  DataType,
} from 'sequelize-typescript';

const tableOptions: TableOptions = {
  tableName: 'xmw_menu', // 表名
};

@Table(tableOptions)
export default class XmwMenu extends Model<XmwMenu> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: '菜单id',
  })
  menu_id: string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
    comment: '国际化对应的name',
  })
  name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    comment: '路由url',
  })
  path: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    comment: '菜单图标',
  })
  icon: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
    comment: '菜单对应的文件路径',
  })
  component: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    comment: '路由重定向地址',
  })
  redirect: string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
    comment: '父级id',
  })
  parent_id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '排序',
  })
  sort: number;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    comment: '菜单状态',
  })
  status: string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
    comment: '创建人',
  })
  founder: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
    comment: '当path是一个url，点击新窗口打开',
  })
  target: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    comment: '菜单标识(页面按钮权限控制)',
  })
  permission: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    comment: '路由和菜单的权限控制',
  })
  access: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    comment: '菜单类型,{dir:目录,menu:菜单,button:按钮}',
  })
  menu_type: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
    comment: '是否显示layout布局',
  })
  layout: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: '是否隐藏子路由',
  })
  hideChildrenInMenu: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: '是否隐藏菜单，包括子路由',
  })
  hideInMenu: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: '是否在面包屑中显示',
  })
  hideInBreadcrumb: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: '是否显示顶栏',
  })
  headerRender: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: '是否显示页脚',
  })
  footerRender: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: '当前路由是否展示菜单',
  })
  menuRender: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: '当前路由是否展示菜单顶栏',
  })
  menuHeaderRender: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: '子项往上提，只是不展示父菜单',
  })
  flatMenu: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: '固定顶栏',
  })
  fixedHeader: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: '固定菜单',
  })
  fixSiderbar: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
    comment: '导航菜单的主题',
  })
  navTheme: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
    comment: '顶部导航的主题，mix 模式生效',
  })
  headerTheme: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    comment: '创建日期',
  })
  created_time: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: '最后更新时间',
  })
  update_time: string;
}
