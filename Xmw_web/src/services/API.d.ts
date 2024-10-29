/*
 * @Description: 接口数据类型定义
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-23 10:23:23
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-07 14:24:23
 */

import type { CommonTypes, Flag, Langs, RequestMethods, TableTimes } from '@/utils/types'
import type { AnnouncementType } from '@/utils/types/administrative/announcement'
import type { OrgTypes } from '@/utils/types/administrative/organization'
import type { LayoutTypes, MenuTheme, MenuTypes, TargetTypes } from '@/utils/types/system/menu-management'

declare global {
  namespace API {

    /**
   * @description: 国际化多语言层级对象
   * @author: 白雾茫茫丶
   */
    type LOCALESLANGAll = Record<Langs, string>

    /**
    * @description: 智能行政-组织管理
    * @author: 白雾茫茫丶
    */
    type ORGANIZATION = {
      org_id: string; // 组织id
      org_name: string; // 组织名称
      org_code: string; // 组织编码
      org_type: OrgTypes; // 组织类型
      org_logo?: string; // 组织 logo
      children?: ORGANIZATION[];
    } & TableTimes & CommonTypes

    /**
     * @description: 智能行政-岗位管理
     * @author: 白雾茫茫丶
     */
    type JOBSMANAGEMENT = TableTimes & {
      jobs_id: string; // 岗位id
      jobs_name: string; // 岗位名称
      children?: JOBSMANAGEMENT[];
    } & Pick<ORGANIZATION, 'org_id' | 'org_name' | 'org_logo'>
      & Omit<CommonTypes, 'status'>;

    /**
    * @description: 系统设置-菜单管理
    * @author: 白雾茫茫丶
    */
    type MENUMANAGEMENT = {
      menu_id: string; // 菜单id
      name: string; // 国际化对应的name
      menu_type: MenuTypes; // 菜单类型
      path?: string; // 路由url
      icon?: string; // 菜单图标
      component?: string; // 菜单对应的文件路径
      redirect?: string; // 路由重定向地址
      target?: TargetTypes; // 当path是一个url，点击新窗口打开
      permission?: string; // 菜单标识(页面按钮权限控制)
      layout?: LayoutTypes; // 是否显示layout布局
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
      routes?: MENUMANAGEMENT[];
      children?: MENUMANAGEMENT[];
    } & TableTimes & LOCALESLANGAll & Omit<CommonTypes, 'leader' | 'describe'>;

    /**
    * @description: 权限菜单
    * @author: 白雾茫茫丶
    */
    type PERMISSION = TableTimes & {
      permission_id: string; // 权限id
      role_id: string; // 角色id
    } & Pick<MENUMANAGEMENT, 'menu_id'>;

    /**
       * @description: 系统设置-角色管理
       * @author: 白雾茫茫丶
       */
    type ROLEMANAGEMENT = {
      role_id: string; // 角色id
      role_name: string; // 角色名称
      role_code: string; // 角色编码
      menu_permission: PERMISSION[]; // 菜单权限
    } & TableTimes & Omit<CommonTypes, 'parent_id' | 'leader'>;

    /**
     * @description: 系统设置-用户管理
     * @author: 白雾茫茫丶
     */
    type USERMANAGEMENT = TableTimes & {
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
      token: string; // 用户令牌
      motto: string; // 座右铭
      tags: string[]; // 人物标签
      city: string[]; // 所属城市
      address: string; // 详细地址
      login_num: number; // 登录次数
      login_last_ip: string; // 最后一次登录ip
      login_last_time: Date; // 最后一次登录时间
    } & Pick<ORGANIZATION, 'org_id' | 'org_name'>
      & Pick<JOBSMANAGEMENT, 'jobs_id' | 'jobs_name'>
      & Pick<ROLEMANAGEMENT, 'role_id' | 'role_name'>
      & Pick<CommonTypes, 'sort' | 'founder' | 'status'>;

    /**
     * @description: 智能行政-活动公告
     * @author: 白雾茫茫丶
     */
    type ANNOUNCEMENT = TableTimes & {
      announcement_id: string; // id 主键
      title: string; // 标题
      content: string; // 正文内容
      type: AnnouncementType; // 类型
      pinned: Flag; // 是否置顶
      read_counts: number; // 阅读次数
      already: Flag; // 是否已读
    } & Pick<USERMANAGEMENT, 'user_id' | 'avatar_url' | 'cn_name'> & Pick<CommonTypes, 'status'>

    /**
     * @description: 智能行政-活动公告-已读
     * @author: 白雾茫茫丶
     */
    type ALREADY = TableTimes & {
      id: string;
    } & Pick<USERMANAGEMENT, 'user_id'> & Pick<ANNOUNCEMENT, 'announcement_id'>

    /**
     * @description: 系统设置-国际化
     * @author: 白雾茫茫丶
     */
    type INTERNATIONALIZATION = TableTimes & {
      id: string;
      name: string;
      children?: INTERNATIONALIZATION[];
    } & LOCALESLANGAll & Pick<CommonTypes, 'parent_id' | 'founder' | 'sort'>;

    /**
   * @description: 系统设置-操作日志
   * @author: 白雾茫茫丶
   */
    type OPERATIONLOG = TableTimes & {
      log_id: string; // id
      ip: string; // ip
      os: string; // 操作系统
      browser: string; // 浏览器
      method: RequestMethods; // 请求方式
      params: Record<string, any>; // 请求参数
      api_url: string; // 请求地址
      province: string; // 所在省份
      city: string; // 所在城市
      adcode: string; // 城市编码
      userInfo: USERMANAGEMENT;
    } & Pick<USERMANAGEMENT, 'user_id'>;
  }
}
