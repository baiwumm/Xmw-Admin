/*
 * @Description: 全局公共方法
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-07 16:12:53
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-05 15:24:21
 */
import { addLocale, history } from '@umijs/max';
import { message } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import { stringify } from 'querystring';
import { ANTD_LANGS } from '@/global/lang'; // 多语言配置项
import { getAllLocalesLang } from '@/services/system/internationalization'; //获取国际化多语言层级对象
import type { ResponseModel } from '@/global/interface';
import CryptoJS from 'crypto-js'; // AES/DES加密
import { isNumber, get } from 'lodash';
import routerConfig from '@/utils/routerConfig' // 路由配置

// 保存在 localstorage 的 key
export const CACHE_KEY = 'APP_LOCAL_CACHE_KEY';

/**
 * @description: 获取国际化多语言层级对象
 * @return {*}
 * @author: Cyan
 */
export const initLocalesLang = async (): Promise<Record<string, any>> => {
  await getAllLocalesLang()
    .then((res) => {
      if (res.code === 200) {
        const data = res.data;
        Object.keys(data).forEach((lang) => {
          // 初始化多语言配置
          addLocale(lang, data[lang], ANTD_LANGS[lang]);
        });
        return data;
      }
      return {};
    })
    .catch((error) => {
      message.error(JSON.stringify(error));
    });
  return {};
};

const CRYPTO_KEY = CryptoJS.enc.Utf8.parse('ABCDEF0123456789'); //十六位十六进制数作为密钥
const CRYPTO_IV = CryptoJS.enc.Utf8.parse('ABCDEF0123456789'); //十六位十六进制数作为密钥偏移量
/**
 * @description: AES/DES加密
 * @param {string} password
 * @return {*}
 * @author: Cyan
 */
export const encryptionAesPsd = (password: string): string => {
  const encrypted = CryptoJS.AES.encrypt(password, CRYPTO_KEY, {
    iv: CRYPTO_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString(); //返回的是base64格式的密文
};

/**
 * @description: AES/DES解密
 * @param {string} password
 * @return {*}
 * @author: Cyan
 */
export const decryptionAesPsd = (password: string): string => {
  const decrypted = CryptoJS.AES.decrypt(password, CRYPTO_KEY, {
    iv: CRYPTO_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8); //返回的是解密后的字符串
};

/**
 * @description: 计算表格滚动长度
 * @return {*}
 * @author: Cyan
 */
export const columnScrollX = (columns: ProColumns[]): number =>
  columns.reduce((acc, item) => {
    return acc + (item.width && isNumber(item.width) ? item.width : 0);
  }, 0);

/**
 * @description: 统一获取接口中的data
 * @return {*}
 * @author: Cyan
 */
export function formatResult<T>(response: ResponseModel<T>): T {
  return get(response, 'data');
}

/**
 * @description: 退出登录返回到登录页
 * @return {*}
 * @author: Cyan
 */
export const logoutToLogin = (): void => {
  const { search, pathname } = window.location;
  const urlParams = new URL(window.location.href).searchParams;
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const redirect = urlParams.get('redirect');
  // 重定向地址
  if (window.location.pathname !== routerConfig.LOGIN && !redirect) {
    history.replace({
      pathname: routerConfig.LOGIN,
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
}
