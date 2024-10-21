/*
 * @Description: 全局公共 type 接口
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-31 08:56:55
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-21 09:20:33
 */
import type { Settings as LayoutSettings } from '@ant-design/pro-components';

import { FLAG, LANGS, LOCAL_STORAGE, REQUEST_METHODS, ROUTES, STATUS } from '@/utils/enums'

/**
 * @description: 获取枚举的所有 key
 * @author: 白雾茫茫丶
 */
export type EnumKeys<T> = keyof T;

/**
 * @description: 获取枚举的所有可能值
 * @author: 白雾茫茫丶
 */
export type EnumValues<T> = T[EnumKeys<T>];

/**
 * @description: 状态
 * @author: 白雾茫茫丶
 */
export type Status = EnumValues<typeof STATUS>

/**
 * @description: 反推数组的类型，type B = A[]，ArrayType<B> 等同于 返回 A
 * @author: 白雾茫茫丶
 */
export type ArrayType<T extends any[]> = T extends Array<infer R> ? R : never;

/**
 * @description: 公共的类型
 * @author: 白雾茫茫丶
 */
export type CommonTypes = {
  parent_id?: string; // 父级id
  status: Status; // 组织状态
  sort: number; // 排序
  leader: string; // 岗位负责人
  founder: string; // 创建人
  describe: string; // 描述
}

/**
 * @description: 创建和更新时间
 * @author: 白雾茫茫丶
 */
export type TableTimes = {
  created_time: string; // 创建时间
  updated_time: string; // 最后一次更新时间
}

/**
 * @description: 查询时间
 * @author: 白雾茫茫丶
 */
export type SearchTimes = {
  start_time?: string; // 开始日期
  end_time?: string; // 结束日期
}

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
 * @description: 请求方法
 * @author: 白雾茫茫丶
 */
export type RequestMethods = EnumValues<typeof REQUEST_METHODS>

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
}

/**
 * @description: 存储在 localstorage 的值
 * @author: 白雾茫茫丶
 */
export type AppLocalCacheTypes = {
  [LOCAL_STORAGE.USER_INFO]?: API.USERMANAGEMENT;
  [LOCAL_STORAGE.LAYOUT]?: Partial<LayoutSettings>;
  [LOCAL_STORAGE.ACCESS_TOKEN]?: string;
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
 * @description: 语言类型
 * @author: 白雾茫茫丶
 */
export type Langs = EnumValues<typeof LANGS>

/**
 * @description: 是否
 * @author: 白雾茫茫丶
 */
export type Flag = EnumValues<typeof FLAG>

/**
 * @description: 路由集合
 * @author: 白雾茫茫丶
 */
export type PathNames = EnumValues<typeof ROUTES>

/**
 * @description: 图标格式
 * @author: 白雾茫茫丶
 */
export type UmiIcon = `${'ri' | 'local' | 'fa6-solid' | 'simple-icons'}:${string}`