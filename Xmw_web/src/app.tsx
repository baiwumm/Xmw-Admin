/*
 * @Description: 全局入口文件
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-17 20:33:50
 * @LastEditors: Cyan
 * @LastEditTime: 2023-03-17 13:55:55
 */

// 引入第三方库
import type { RunTimeLayoutConfig } from '@umijs/max';

// 引入业务组件
import { BasiLayout } from '@/components/BasiLayout'; // 全局 layout 布局
import { TabsLayout } from '@/components/TabsLayout' // 多标签页配置
import type { AppLocalCacheModel, InitialStateModel } from '@/global/interface'
import { CACHE_KEY } from '@/utils' // 全局工具函数
import {
  fetchPermissions,
  fetchRouteMenu,
  fetchUserInfo,
  initAllRequest,
  initLocalesLang,
} from '@/utils/initRequest' // 初始化共用接口请求
import routerConfig from '@/utils/routerConfig' // 路由配置
import { errorConfig } from '@/utils/umiRequest'; // umi-request 请求封装

import defaultSettings from '../config/defaultSettings'; // 全局默认配置

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitialStateModel> {
  // 初始化多语言
  const Locales = await initLocalesLang()
  // 获取 localstorage key
  const appCache: AppLocalCacheModel = JSON.parse(window.localStorage.getItem(CACHE_KEY) || '{}')
  // 初始化数据
  const initialState: InitialStateModel = {
    Locales,
    fetchUserInfo,
    fetchPermissions,
    fetchRouteMenu,
    Settings: appCache?.UMI_LAYOUT || defaultSettings,
  }
  // 如果不是登录页面，执行
  if (window.location.pathname !== routerConfig.LOGIN) {
    // 获取用户信息和权限
    const userInfoAndAccess = await initAllRequest()
    return { ...initialState, ...userInfoAndAccess };
  }
  return initialState
}

/**
 * @description: 全局 lyout 布局
 * @doc ProLayout 支持的api https://procomponents.ant.design/components/layout
 * @author: Cyan
 */
export const layout: RunTimeLayoutConfig = BasiLayout

/**
 * @description: tabsLayout 返回一个对象
 * @doc https://alitajs.com/zh-CN/docs/guides/tabs#tabslayout
 * @author: Cyan
 */
export function tabsLayout() {
  return {
    size: 'small',
  };
}

/**
 * @description: 完全覆盖内置的多 Tabs 组件，需要搭配配置 hasCustomTabs:true 使用。
 * @doc https://alitajs.com/zh-CN/docs/guides/tabs#getcustomtabs
 * @author: Cyan
 */
export const getCustomTabs = TabsLayout

/**
 * @description: request 配置，可以配置错误处理，它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 * @author: Cyan
 */
export const request = {
  ...errorConfig,
};
