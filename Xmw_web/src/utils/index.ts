/*
 * @Description: 全局公共方法
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-07 16:12:53
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-30 11:29:38
 */
import { addLocale } from '@umijs/max';
import { message } from 'antd';
import { ANTD_LANGS } from '@/global/lang'; // 多语言配置项
import { getAllLocalesLang } from '@/services/system/internationalization'; //获取国际化多语言层级对象

/**
 * @description: 获取国际化多语言层级对象
 * @return {*}
 * @author: Cyan
 */
export const initLocalesLang = async () => {
  const { resData } = await getAllLocalesLang();
  try {
    if (resData) {
      Object.keys(resData).forEach((lang) => {
        // 初始化多语言配置
        addLocale(lang, resData[lang], ANTD_LANGS[lang]);
      });
    }
    return resData;
  } catch (error: any) {
    message.error(error);
  }
  return undefined;
};
