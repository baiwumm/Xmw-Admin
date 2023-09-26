/*
 * @Description: 全局入口文件
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-17 20:33:50
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-26 10:41:07
 */

import { Settings as LayoutSettings } from '@ant-design/pro-components'; // 高级组件
import { eq } from 'lodash-es'

import { BasiLayout } from '@/components/BasiLayout'; // 全局 layout 布局
import { TabsLayout } from '@/components/TabsLayout' // 多标签页配置
import { getLocalStorageItem, setLocalStorageItem } from '@/utils' // 全局工具函数
import { LOCAL_STORAGE, ROUTES } from '@/utils/enums'
import { initAllRequest, initLocalesLang } from '@/utils/initRequest' // 初始化共用接口请求
import { InitialStateTypes } from '@/utils/types'
import umiRequest from '@/utils/umiRequest'; // umi-request 请求封装

import defaultSettings from '../config/defaultSettings'; // 全局默认配置

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitialStateTypes> {
  // 初始化多语言
  const Locales = await initLocalesLang()
  // 获取 LAYOUT 的值
  const Layout_Settings = getLocalStorageItem<LayoutSettings>(LOCAL_STORAGE.LAYOUT) || defaultSettings
  // 存储到 localstorage
  setLocalStorageItem(LOCAL_STORAGE.LAYOUT, Layout_Settings)
  // 初始化数据
  const initialState: InitialStateTypes = {
    Locales,
    Settings: Layout_Settings,
    Collapsed: false,
    PageLoading: true,
  }
  // 如果不是登录页面，执行
  if (!eq(location.pathname, ROUTES.LOGIN)) {
    // 获取用户信息和权限
    const userInfoAndAccess = await initAllRequest()
    return { ...initialState, ...userInfoAndAccess };
  }
  return initialState
}

/**
 * @description: 全局 lyout 布局
 * @doc ProLayout 支持的api https://procomponents.ant.design/components/layout
 * @Author: 白雾茫茫丶
 */
export const layout = BasiLayout

/**
 * @description: 完全覆盖内置的多 Tabs 组件，需要搭配配置 hasCustomTabs:true 使用。
 * @doc https://alitajs.com/zh-CN/docs/guides/tabs#getcustomtabs
 * @Author: 白雾茫茫丶
 */
export const getCustomTabs = TabsLayout

/**
 * @description: request 配置，可以配置错误处理，它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 * @Author: 白雾茫茫丶
 */
export const request = umiRequest;
