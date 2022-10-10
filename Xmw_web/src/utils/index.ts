/*
 * @Description: 全局公共方法
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-07 16:12:53
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-10 13:59:40
 */
import { addLocale } from '@umijs/max';
import { message } from 'antd';
import { ANTD_LANGS } from '@/global/lang'; // 多语言配置项
import { getAllLocalesLang } from '@/services/system/internationalization'; //获取国际化多语言层级对象
import CryptoJS from 'crypto-js'; // AES/DES加密

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

const CRYPTO_KEY = CryptoJS.enc.Utf8.parse('ABCDEF0123456789'); //十六位十六进制数作为密钥
const CRYPTO_IV = CryptoJS.enc.Utf8.parse('ABCDEF0123456789'); //十六位十六进制数作为密钥偏移量
/**
 * @description: AES/DES加密
 * @param {string} password
 * @return {*}
 * @author: Cyan
 */
export const encryptionAesPsd = (password: string) => {
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
export const decryptionAesPsd = (password: string) => {
  const decrypted = CryptoJS.AES.decrypt(password, CRYPTO_KEY, {
    iv: CRYPTO_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8); //返回的是解密后的字符串
};
