/*
 * @Description: 公共 interface 接口定义
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:14:06
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-28 15:04:15
 */
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
/**
 * @description: 动态对象属性
 * @return {*}
 * @author: Cyan
 */
export type ResData = Record<string, any>;

/**
 * @description: 分页查询
 * @return {*}
 * @author: Cyan
 */
export type PageResModel<T> = {
  total: number;
  list: T[];
};

/**
 * @description: Response 返回体，默认是不分页，如果是分页查询，需要自己将 Model 带入
 * @return {*}
 * @author: Cyan
 */
export type ResponseModel<T> = {
  code?: number;
  data: T;
  msg?: string;
};

/**
 * @description: 默认分页查询参数
 * @return {*}
 * @author: Cyan
 */
export type PaginationProps = {
  current: number; // 当前页码
  pageSize: number; // 每页条数
}

/**
 * @description: App.tsx 全局初始数据
 * @return {*}
 * @author: Cyan
 */
export type InitialStateModel = {
  Locales?: Record<string, any>;
  Access_token?: string;
  Settings?: Partial<LayoutSettings>;
  CurrentUser?: API.USERMANAGEMENT;
  Permissions?: string[];
  RouteMenu?: API.MENUMANAGEMENT[];
  fetchUserInfo?: () => Promise<API.USERMANAGEMENT | undefined>;
  fetchPermissions?: () => Promise<string[] | undefined>;
  fetchRouteMenu?: () => Promise<API.MENUMANAGEMENT[] | undefined>;
}

/**
 * @description: 存储在 localstorage 的值
 * @return {*}
 * @author: Cyan
 */
export type AppLocalCacheModel = {
  UMI_LAYOUT?: Partial<LayoutSettings>;
  ACCESS_TOKEN?: string
}

/**
 * @description: 用户登录
 * @return {*}
 * @author: Cyan
 */
export type LoginModel = {
  access_token: string;
  login_last_time: Date;
}

/**
 * @description: 下拉菜单 Props
 * @return {*}
 * @author: Cyan
 */
export type DropdownMenuProps = {
  name: React.ReactNode;
  key: string;
}