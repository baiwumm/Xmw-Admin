/*
 * @Description: 接口数据类型定义
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-23 10:23:23
 * @LastEditors: Cyan
 * @LastEditTime: 2023-07-10 15:17:25
 */
declare namespace API {
  import type { OrgTypeProps } from '@/pages/Administrative/Organization/utils/interface'
  /**
   * @description: 智能行政-组织管理
   * @return {*}
   * @author: Cyan
   */
  type ORGANIZATION = {
    org_id: string; // 组织id
    org_name: string; // 组织名称
    org_code: string; // 组织编码
    org_type: OrgTypeProps; // 组织类型
    describe: string; // 组织描述
    parent_id: string; // 父级id
    status: number; // 组织状态
    sort: number; // 排序
    created_time: Date; // 创建时间
    updated_time: Date; // 最后一次更新时间
    leader: string; // 岗位负责人
    founder: string; // 创建人
    children?: ORGANIZATION[];
  };

  /**
   * @description: 智能行政-岗位管理
   * @return {*}
   * @author: Cyan
   */
  type JOBSMANAGEMENT = {
    jobs_id: string; // 岗位id
    jobs_name: string; // 岗位名称
    org_id: string; // 所属组织
    describe: string; // 岗位描述
    parent_id: string; // 父级id
    created_time: Date; // 创建时间
    updated_time: Date; // 最后一次更新时间
    leader: string; // 岗位负责人
    founder: string; // 创建人
    org_name: string; // 组织名称
    sort: number; // 排序
    children?: JOBSMANAGEMENT[];
  };

  /**
   * @description: 系统设置-菜单管理
   * @return {*}
   * @author: Cyan
   */
  type MENUMANAGEMENT = {
    menu_id: string; // 菜单id
    name: string; // 国际化对应的name
    menu_type: string; // 菜单类型
    path?: string; // 路由url
    icon?: string; // 菜单图标
    component?: string; // 菜单对应的文件路径
    redirect?: string; // 路由重定向地址
    parent_id?: string; // 父级id
    target?: string; // 当path是一个url，点击新窗口打开
    permission?: string; // 菜单标识(页面按钮权限控制)
    layout?: string; // 是否显示layout布局
    navTheme?: string; // 导航菜单的主题
    headerTheme?: string; // 顶部导航的主题，mix 模式生效
    hideChildrenInMenu: number; // 是否隐藏子路由
    hideInMenu: number; // 是否隐藏菜单，包括子路由
    hideInBreadcrumb: number; // 是否在面包屑中隐藏
    headerRender: number; // 是否显示顶栏
    footerRender: number; // 是否显示页脚
    menuRender: number; // 当前路由是否展示菜单
    menuHeaderRender: number; // 当前路由是否展示菜单顶栏
    flatMenu: number; // 子项往上提，只是不展示父菜单
    fixedHeader: number; // 固定顶栏
    fixSiderbar: number; // 固定菜单
    founder?: string; // 创建人
    sort: number; // 排序
    status: number; // 菜单状态
    created_time: Date; // 创建时间
    updated_time: Date; // 最后一次更新时间
    'zh-CN': string;
    'en-US': string;
    'ja-JP': string;
    'zh-TW': string;
    routes?: MENUMANAGEMENT[];
    [key: string]: string
  };

  /**
   * @description: 系统设置-用户管理
   * @return {*}
   * @author: Cyan
   */
  type USERMANAGEMENT = {
    user_id: string; // 用户id
    user_name: string; // 用户名称
    work_no: string; // 用户工号
    password: string; // 密码(加密)
    confirmPassword?: string // 确认密码
    cn_name: string; // 中文名
    en_name?: string; // 英文名
    age: number; // 年龄
    email: string; // 电子邮箱
    phone: string; // 电话号码
    avatar_url: string; // 头像地址
    sex: string; // 用户性别
    sort: number; // 排序
    status: number; // 用户状态
    token: string; // 用户令牌
    motto: string; // 座右铭
    tags: string[]; // 人物标签
    city: string[]; // 所属城市
    address: string; // 详细地址
    jobs_id: string; // 岗位id
    jobs_name: string; // 岗位名称
    org_id: string; // 组织id
    org_name: string; // 组织名称
    role_id: string; // 角色id
    role_name: string; // 角色名称
    founder: string; // 创建人
    login_num: number; // 登录次数
    login_last_ip: string; // 最后一次登录ip
    login_last_time: Date; // 最后一次登录时间
    created_time: Date; // 创建时间
    updated_time: Date; // 最后一次更新时间
  };

  /**
   * @description: 系统设置-角色管理
   * @return {*}
   * @author: Cyan
   */
  type ROLEMENU = {
    menu_id: string;
    role_id: string
  }
  type ROLEMANAGEMENT = {
    role_id: string;
    role_name: string;
    role_code: string;
    sort: number;
    founder: string;
    status: number;
    describe: string;
    menu_permission: ROLEMENU[];
    created_time: Date;
    updated_time: Date;
  };
  /**
   * @description: 系统设置-国际化
   * @return {*}
   * @author: Cyan
   */
  type LOCALESLANG = 'zh-CN' | 'en-US' | 'ja-JP' | 'zh-TW'
  type INTERNATIONALIZATION<T = string> = { [key in LOCALESLANG]: T } & {
    id: string;
    name: string;
    parent_id: string;
    created_time: Date;
    updated_time: Date;
    founder: string;
    sort: number; // 排序
    children?: INTERNATIONALIZATION[];
  };

  /**
 * @description: 系统设置-操作日志
 * @return {*}
 * @author: Cyan
 */
  export type OPERATIONLOG = {
    log_id: string; // id
    user_id: string; // 用户id
    content: string; // 日志内容
    ip: string; // ip
    path: string; // 前端路由
    user_agent: string; // 代理
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'; // 请求方式
    params: Record<string, any>; // 请求参数
    api_url: string; // 请求地址
    created_time?: Date; // 创建时间
    updated_time?: Date; // 最后一次更新时间
  };

  /**
 * @description: 国际化多语言层级对象
 * @return {*}
 * @author: Cyan
 */
  type LOCALESLANGAll = Pick<INTERNATIONALIZATION<ResData>, LOCALESLANG> & {
    [key: string]: string
  }
}
