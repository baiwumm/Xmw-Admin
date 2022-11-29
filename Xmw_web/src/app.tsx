/*
 * @Description: 
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-17 20:33:50
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-29 17:20:17
 */

// 引入第三方库
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { message } from 'antd'
// 引入业务组件
import { BasiLayout } from '@/components/BasiLayout'; // 全局 layout 布局
// import TabsLayout from '@/components/TabsLayout' // 多标签页
import { getUserInfo } from '@/services/logic/login' // 登录相关接口
import defaultSettings from '../config/defaultSettings'; // 全局默认配置
import { initLocalesLang } from '@/utils' // 全局工具函数

import { errorConfig } from '@/utils/umiRequest'; // umi-request 请求封装

const loginPath = '/user/login';
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  access_token?: string; 
  settings?: Partial<LayoutSettings>;
  currentUser?: API.USERMANAGEMENT;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.USERMANAGEMENT | undefined>;
  locales?: any
}> {
  // 初始化多语言
  const locales = await initLocalesLang()
  const umi_layout = window.localStorage.getItem('umi_layout')
  // 获取登录用户信息
  const fetchUserInfo = async () => {
    try {
      const result = await getUserInfo();
      if (result.code === 200) {
        return result.data
      }
      message.error(result.msg)
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (window.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: umi_layout && JSON.parse(umi_layout) || defaultSettings,
      locales
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
    locales
  };
}

/**
 * @description: 全局 lyout 布局
 * @doc ProLayout 支持的api https://procomponents.ant.design/components/layout
 * @return {*}
 * @author: Cyan
 */
export const layout: RunTimeLayoutConfig = BasiLayout

/**
 * @description: Tabs 多标签页
 * @doc 多tabs布局 https://juejin.cn/post/7109492504424087566
 * @return {*}
 * @author: Cyan
 */
// export const getCustomTabs = () => {
//   return (tabsProps: any) => {
//     return <TabsLayout tabsProps={{ ...tabsProps }} />
//   };
// };

/**
 * @description: request 配置，可以配置错误处理，它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 * @return {*}
 * @author: Cyan
 */
export const request = {
  ...errorConfig,
};
