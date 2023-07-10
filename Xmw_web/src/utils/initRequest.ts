/*
 * @Description: 初始化共用接口请求
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-12-07 15:05:34
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-12 14:23:46
 */
import { addLocale, history } from '@umijs/max';

import type { InitialStateModel } from '@/global/interface'
import { ANTD_LANGS } from '@/global/lang'
import { getPermissions, getRoutesMenus, getUserInfo } from '@/services/logic/login' // 登录相关接口
import { getAllLocalesLang } from '@/services/system/internationalization'
import routerConfig from '@/utils/routerConfig' // 路由配置

/**
 * @description: 获取多语言层级对象
 * @return {*}
 * @author: Cyan
 */
export const initLocalesLang = async (): Promise<Record<string, any>> => {
  const res = await getAllLocalesLang()
  if (res.code === 200) {
    Object.keys(res.data).forEach((lang) => {
      // 初始化多语言配置
      // @ts-ignore
      addLocale(lang, res.data[lang], ANTD_LANGS[lang]);
    });
    return res.data
  }
  return {}
};

/**
 * @description: 获取用户信息
 * @return {*}
 * @author: Cyan
 */
export const fetchUserInfo = async (): Promise<API.USERMANAGEMENT | undefined> => {
  try {
    const result = await getUserInfo();
    if (result.code === 200) {
      return result.data
    }
  } catch (error) {
    history.push(routerConfig.LOGIN);
  }
  return undefined;
};

/**
 * @description: 获取用户按钮权限
 * @return {*}
 * @author: Cyan
 */
export const fetchPermissions = async (): Promise<string[] | undefined> => {
  try {
    const result = await getPermissions();
    if (result.code === 200) {
      return result.data
    }
  } catch (error) {
    history.push(routerConfig.LOGIN);
  }
  return undefined;
};

/**
 * @description: 获取用户菜单权限
 * @return {*}
 * @author: Cyan
 */
export const fetchRouteMenu = async (): Promise<API.MENUMANAGEMENT[] | undefined> => {
  try {
    const result = await getRoutesMenus();
    if (result.code === 200) {
      return result.data
    }
  } catch (error) {
    history.push(routerConfig.LOGIN);
  }
  return undefined;
};

/**
 * @description: 每次登录成功或者刷新都要请求的接口
 * @return {*}
 * @author: Cyan
 */
type initAllRequestModel = Pick<InitialStateModel, 'CurrentUser' | 'Permissions' | 'RouteMenu'>
export const initAllRequest = async () => {
  const result: initAllRequestModel = {}
  // 获取用户信息
  const userInfo = await fetchUserInfo();
  if (userInfo) {
    result.CurrentUser = userInfo
    // 获取用户按钮权限
    const Permissions = await fetchPermissions();
    if (Permissions) {
      Object.assign(result, { Permissions })
    }
    // 获取用户权限菜单
    const RouteMenu = await fetchRouteMenu();
    if (RouteMenu) {
      Object.assign(result, { RouteMenu })
    }
  }
  return result
} 