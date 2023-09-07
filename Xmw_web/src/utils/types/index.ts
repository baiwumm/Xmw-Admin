/*
 * @Description: 全局公共 type 接口
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-31 08:56:55
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-08-31 09:04:34
 */
import type { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @description: Response 返回体
 * @author: 白雾茫茫丶
 */
export type Response<T = any> = {
  code?: number;
  data: T;
  msg?: string;
};

/**
 * @description: 分页查询
 * @author: 白雾茫茫丶
 */
export type PageResponse<T> = {
  total: number;
  list: T[];
};

/**
 * @description: 默认分页查询参数
 * @author: 白雾茫茫丶
 */
export type PaginationParams = {
  current: number; // 当前页码
  pageSize: number; // 每页条数
}

/**
 * @description: 全局状态数据流
 * @author: 白雾茫茫丶
 */
export type InitialStateTypes = {
  Locales?: Record<string, any>;
  Access_token?: string;
  Settings?: Partial<LayoutSettings>;
  CurrentUser?: API.USERMANAGEMENT;
  Permissions?: string[];
  RouteMenu?: API.MENUMANAGEMENT[];
  Collapsed?: boolean;
  fetchUserInfo?: () => Promise<API.USERMANAGEMENT | undefined>;
  fetchPermissions?: () => Promise<string[] | undefined>;
  fetchRouteMenu?: () => Promise<API.MENUMANAGEMENT[] | undefined>;
  PageLoading?: boolean;
}

/**
 * @description: 存储在 localstorage 的值
 * @author: 白雾茫茫丶
 */
export type AppLocalCacheTypes = {
  USER_INFO?: API.USERMANAGEMENT;
  LAYOUT?: Partial<LayoutSettings>;
  ACCESS_TOKEN?: string;
}

/**
 * @description: 用户登录
 * @author: 白雾茫茫丶
 */
export type LoginTypes = {
  access_token: string;
  login_last_time: Date;
}

/**
 * @description: 用户休眠
 * @author: 白雾茫茫丶
 */
export type LockSleepTypes = {
  last_time: number;
  isSleep: boolean;
}

/**
 * @description: 表格下拉菜单
 * @author: 白雾茫茫丶
 */
export type DropdownMenuTypes = {
  name: React.ReactNode;
  key: string;
  show?: number;
}

/**
 * @description: 语言类型
 * @author: 白雾茫茫丶
 */
export type LANGS = 'zh-CN' | 'en-US' | 'ja-JP' | 'zh-TW'