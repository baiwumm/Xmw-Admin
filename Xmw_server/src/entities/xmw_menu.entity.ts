/*
 * @Description: XmwMenu Entity
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-16 17:44:07
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-16 19:00:58
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsNotEmpty,
  Length,
  IsInt,
  Min,
  Max,
  IsEmail,
  IsIP,
  IsJWT,
  IsMobilePhone,
  IsUUID,
} from 'class-validator'; // entity validator

@Entity()
export class XmwMenu {
  //菜单id
  @PrimaryGeneratedColumn('uuid', { comment: '菜单id' })
  menu_id: string;

  //国际化对应的name
  @Column('char', {
    length: 36,
    nullable: true,
    comment: '国际化对应的name',
  })
  @IsUUID()
  name: string;

  //菜单类型
  @Column('enum', {
    enum: ['dir', 'menu', 'button'],
    comment: '菜单类型（dir:目录，menu:菜单,button:按钮）',
  })
  menu_type: string;

  //路由url
  @Column('varchar', {
    length: 100,
    nullable: true,
    comment: '路由url',
  })
  path: string;

  //菜单图标
  @Column('varchar', {
    length: 50,
    nullable: true,
    comment: '菜单图标',
  })
  icon: string;

  //菜单对应的文件路径
  @Column('varchar', {
    length: 200,
    nullable: true,
    comment: '菜单对应的文件路径',
  })
  component: string;

  //路由重定向地址
  @Column('varchar', {
    length: 100,
    nullable: true,
    comment: '路由重定向地址',
  })
  redirect: string;

  //父级id
  @Column('char', {
    length: 36,
    nullable: true,
    comment: '父级id',
  })
  @IsUUID()
  parent_id: string;

  //当path是一个url，点击新窗口打开
  @Column('enum', {
    enum: ['_blank', '_self', '_parent', '_top'],
    nullable: true,
    comment: '当path是一个url，点击新窗口打开（0:女，1:男）',
  })
  target: string;

  //菜单标识(页面按钮权限控制)
  @Column('varchar', {
    length: 100,
    nullable: true,
    comment: '菜单标识(页面按钮权限控制)',
  })
  permission: string;

  //路由和菜单的权限控制
  @Column('varchar', {
    length: 50,
    nullable: true,
    comment: '路由和菜单的权限控制',
  })
  access: string;

  //是否显示layout布局
  @Column('enum', {
    enum: ['side', 'top', 'mix'],
    nullable: true,
    comment: '是否显示layout布局（side:侧边菜单，top:顶部菜单,mix:混合菜单）',
  })
  layout: string;

  //导航菜单的主题
  @Column('enum', {
    enum: ['dark', 'light'],
    nullable: true,
    comment: '导航菜单的主题（dark:暗黑风格，light:亮色风格）',
  })
  navTheme: string;

  //顶部导航的主题，mix 模式生效
  @Column('enum', {
    enum: ['dark', 'light'],
    nullable: true,
    comment: '顶部导航的主题，mix 模式生效（dark:暗黑风格，light:亮色风格）',
  })
  headerTheme: string;

  //是否隐藏子路由
  @Column('tinyint', {
    comment: '是否隐藏子路由（0:否，1:是）',
  })
  hideChildrenInMenu: number;

  //是否隐藏菜单，包括子路由
  @Column('tinyint', {
    comment: '是否隐藏菜单，包括子路由（0:否，1:是）',
  })
  hideInMenu: number;

  //是否在面包屑中显示
  @Column('tinyint', {
    comment: '是否在面包屑中显示（0:否，1:是）',
  })
  hideInBreadcrumb: number;

  //是否显示顶栏
  @Column('tinyint', {
    comment: '是否显示顶栏（0:否，1:是）',
  })
  headerRender: number;

  //是否显示页脚
  @Column('tinyint', {
    comment: '是否显示页脚（0:否，1:是）',
  })
  footerRender: number;

  //当前路由是否展示菜单
  @Column('tinyint', {
    comment: '当前路由是否展示菜单（0:否，1:是）',
  })
  menuRender: number;

  //当前路由是否展示菜单顶栏
  @Column('tinyint', {
    comment: '当前路由是否展示菜单顶栏（0:否，1:是）',
  })
  menuHeaderRender: number;

  //子项往上提，只是不展示父菜单
  @Column('tinyint', {
    comment: '子项往上提，只是不展示父菜单（0:否，1:是）',
  })
  flatMenu: number;

  //固定顶栏
  @Column('tinyint', {
    comment: '固定顶栏（0:否，1:是）',
  })
  fixedHeader: number;

  //固定菜单
  @Column('tinyint', {
    comment: '固定菜单（0:否，1:是）',
  })
  fixSiderbar: number;

  //创建人
  @Column('char', {
    length: 36,
    nullable: true,
    comment: '创建人',
  })
  @IsUUID()
  founder: string;

  //排序
  @Column('int', {
    comment: '排序',
  })
  @IsInt()
  @Min(1)
  @Max(999)
  sort: number;

  //菜单状态
  @Column('tinyint', {
    comment: '菜单状态（0:禁用，1:正常）',
  })
  status: number;

  // 创建时间
  @CreateDateColumn({ comment: '创建时间' })
  created_time: Date;

  // 最后一次更新时间
  @UpdateDateColumn({ nullable: true, comment: '最后一次更新时间' })
  updated_time: Date;
}
