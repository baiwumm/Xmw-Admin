/*
 * @Description: System Attributes
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-27 10:10:44
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 17:32:56
 */
import type {
  CommonTypes,
  Flag,
  Langs,
  Layouts,
  MenuTheme,
  MenuTypes,
  RequestMethods,
  Sex,
  TargetTypes,
  Times,
} from '@/utils/types';

import { JobsAttributes, OrgAttributes } from './administrative';

/**
 * @description: xmw_menu Attributes
 * @author: 白雾茫茫丶
 */
export type MenuAttributes = {
  menu_id: string; // 菜单id
  name: string; // 国际化对应的name
  menu_type: MenuTypes; // 菜单类型
  path?: string; // 路由url
  icon?: string; // 菜单图标
  component?: string; // 菜单对应的文件路径
  redirect?: string; // 路由重定向地址
  target?: TargetTypes; // 当path是一个url，点击新窗口打开
  permission?: string; // 菜单标识(页面按钮权限控制)
  access?: string; // 路由和菜单的权限控制
  layout?: Layouts; // 是否显示layout布局
  navTheme?: MenuTheme; // 导航菜单的主题
  headerTheme?: MenuTheme; // 顶部导航的主题，mix 模式生效
  hideChildrenInMenu: Flag; // 是否隐藏子路由
  hideInMenu: Flag; // 是否隐藏菜单，包括子路由
  hideInBreadcrumb: Flag; // 是否在面包屑中隐藏
  headerRender: Flag; // 是否显示顶栏
  footerRender: Flag; // 是否显示页脚
  menuRender: Flag; // 当前路由是否展示菜单
  menuHeaderRender: Flag; // 当前路由是否展示菜单顶栏
  flatMenu: Flag; // 子项往上提，只是不展示父菜单
  fixedHeader: Flag; // 固定顶栏
  fixSiderbar: Flag; // 固定菜单
  children?: MenuAttributes[];
} & Times &
  Omit<CommonTypes, 'leader' | 'describe'>;

/**
 * @description: xmw_permission Attributes
 * @author: 白雾茫茫丶
 */
export type PermissionAttributes = {
  permission_id: string; // 权限id
  role_id: string; // 角色id
} & Times &
  Pick<MenuAttributes, 'menu_id'>;

/**
 * @description: xmw_role Attributes
 * @author: 白雾茫茫丶
 */
export type RoleAttributes = {
  role_id: string; // 角色id
  role_name: string; // 角色名称
  role_code: string; // 角色编码
  menu_permission: PermissionAttributes[]; // 权限集合
} & Times &
  Omit<CommonTypes, 'parent_id' | 'leader'>;

/**
 * @description: xmw_users Attributes
 * @author: 白雾茫茫丶
 */
export type UserAttributes = {
  user_id: string; // 用户id
  user_name: string; // 用户名称
  work_no: string; // 用户工号
  password: string; // 密码(加密)
  cn_name: string; // 中文名
  en_name?: string; // 英文名
  age: number; // 年龄
  email?: string; // 电子邮箱
  phone: string; // 电话号码
  avatar_url?: string; // 用户头像
  sex: Sex; // 用户性别
  token?: string; // 用户令牌
  motto?: string; // 座右铭
  tags?: string[]; // 人物标签
  city?: string[]; // 所属城市
  address?: string; // 详细地址
  login_num: number; // 登录次数
  login_last_ip?: string; // 最后一次登录ip
  login_last_time?: Date; // 最后一次登录时间
} & Times &
  Pick<OrgAttributes, 'org_id'> &
  Pick<JobsAttributes, 'jobs_id'> &
  Pick<RoleAttributes, 'role_id'> &
  Pick<CommonTypes, 'sort' | 'founder' | 'status'>;

/**
 * @description: xmw_international Attributes
 * @author: 白雾茫茫丶
 */
export type InternationalAttributes = {
  id: string; // id
  name: string; // 国际化字段
  children?: InternationalAttributes[];
} & Times &
  Langs &
  Pick<CommonTypes, 'parent_id' | 'founder' | 'sort'>;

/**
 * @description: Logs Attributes
 * @author: 白雾茫茫丶
 */
export type LogsAttributes = {
  log_id?: string; // id
  ip: string; // ip
  method: RequestMethods | string; // 请求方式
  params: Record<string, any>; // 请求参数
  os: string; // 操作系统
  browser: string; // 浏览器
  api_url: string; // 请求地址
  province?: string; // 所在省份
  city?: string; // 所在城市
  adcode?: string; // 城市编码
} & Times &
  Pick<UserAttributes, 'user_id'>;
