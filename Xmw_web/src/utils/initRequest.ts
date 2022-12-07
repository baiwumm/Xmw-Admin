/*
 * @Description: 初始化共用接口请求
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-12-07 15:05:34
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-07 15:20:11
 */
import { addLocale, history } from '@umijs/max';
import { message } from 'antd'
import { ANTD_LANGS } from '@/global/lang'
import routerConfig from '@/utils/routerConfig' // 路由配置
import { getUserInfo, getPermissions } from '@/services/logic/login' // 登录相关接口
import { getAllLocalesLang } from '@/services/system/internationalization'

/**
 * @description: 获取多语言层级对象
 * @return {*}
 * @author: Cyan
 */
export const initLocalesLang = async (): Promise<Record<string, any>> => {
  await getAllLocalesLang()
    .then((res) => {
      if (res.code === 200) {
        const data = res.data;
        if (data) {
          Object.keys(data).forEach((lang) => {
            // 初始化多语言配置
            addLocale(lang, data[lang], ANTD_LANGS[lang]);
          });
        }
        Object.keys(data).forEach((lang) => {
          // 初始化多语言配置
          addLocale(lang, data[lang], ANTD_LANGS[lang]);
        });
        return data
      }
      return {}
    })
    .catch((error) => {
      message.error(JSON.stringify(error));
    });
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