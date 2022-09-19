/*
 * @Description: 
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-17 20:33:50
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-19 21:12:12
 */

// 引入第三方库
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';

// 引入业务组件
import { BasiLayout } from '@/components/BasiLayout'; // 全局 layout 布局
import TabsLayout from '@/components/TabsLayout' // 多标签页
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import defaultSettings from '../config/defaultSettings'; // 全局默认配置
import { initLocalesLang } from '@/utils' // 全局工具函数

import { errorConfig } from '@/utils/umiRequest'; // umi-request 请求封装

const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  // 初始化多语言
  initLocalesLang()

  const umi_layout = window.localStorage.getItem('umi_layout')
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return msg.data;
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
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
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
export const getCustomTabs = () => {
  return (tabsConfig: any) => {
    return <TabsLayout tabsConfig={{ ...tabsConfig }} />
  };
};

/**
 * @description: request 配置，可以配置错误处理，它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 * @return {*}
 * @author: Cyan
 */
export const request = {
  ...errorConfig,
};
