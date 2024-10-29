/*
 * @Description: 全局公共方法
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-07 16:12:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-29 14:32:15
 */
import type { ColumnsState, RequestData } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { message } from 'antd';
import CryptoJS from 'crypto-js'; // AES/DES加密
import { compact, eq, get, isInteger, join, keys, random, sample, sampleSize, startsWith, toLower } from 'lodash-es';
import { stringify } from 'querystring';

import { getPermissions, getRoutesMenus, getUserInfo } from '@/services/logic/login' // 登录相关接口
import { LOCAL_STORAGE, REQUEST_CODE, ROUTES } from '@/utils/enums'
import type { InitialStateTypes, LockSleepTypes, PageResponse, Response } from '@/utils/types'

/**
 * @description: 获取用户信息、菜单和权限
 * @author: 白雾茫茫丶
 */
export const initUserAuthority = async (): Promise<InitialStateTypes> => {
  try {
    // 获取用户信息和菜单按钮权限
    const [userInfo, routeMenuInfo, permissionInfo] =
      await Promise.all([getUserInfo(), getRoutesMenus(), getPermissions()])
    // 初始化全局状态
    return {
      CurrentUser: get(userInfo, 'data', {}),
      RouteMenu: get(routeMenuInfo, 'data', []),
      Permissions: get(permissionInfo, 'data', []),
    }
  } catch (error) {
    history.push(ROUTES.LOGIN);
    return {}
  }
}

/**
 * @description: 判断请求是否成功
 * @author: 白雾茫茫丶
 */
export const isSuccess = (code?: number): boolean => eq(code, REQUEST_CODE.SUCCESS)

/**
 * @description: 格式化请求数据
 * @author: 白雾茫茫丶
 */
export const formatResponse = <T extends any[]>(
  response: Response<T> |
    Response<PageResponse<T[number]>>): RequestData<T[number]> => {
  // 解构响应值
  const { code, data } = response
  return {
    data: get(data, 'list') || get(response, 'data') || [],
    // success 请返回 true，不然 table 会停止解析数据，即使有数据
    success: isSuccess(code),
    total: get(data, 'total', 0),
  }
}

/**
 * @description: 将 pathname 转成国际化对应的 key，如：/administrative/jobs-management => administrative.jobs-management
 * @author: 白雾茫茫丶
 */
export const formatPathName = (pathname: string): string => {
  return join(compact(pathname.split('/')), '.')
}

/**
 * @description: 统一国际化前缀
 * @param {boolean} isMenu
 * @Author: 白雾茫茫丶
 */
export const formatPerfix = (route: string, suffix = '', isMenu = false): string => {
  // 国际化字符串
  const field = `${isMenu ? 'menu' : 'pages'}.${formatPathName(route)}${suffix ? '.' + suffix : ''}`
  return startsWith(route, 'global') ? route : field
}

/**
 * @description: 获取 localstorage 的值
 * @author: 白雾茫茫丶
 */
export const getLocalStorageItem = <T>(key: string): T | null => {
  // 获取 值
  const item = localStorage.getItem(key);
  // 判断是否为空 
  if (item === null) {
    return null;
  }
  // 不为空返回解析后的值
  const result: T = JSON.parse(item);
  return result
}

/**
 * @description: 存储 localstorage 的值
 * @author: 白雾茫茫丶
 */
export const setLocalStorageItem = <T>(key: string, value: T) => {
  const result = JSON.stringify(value);
  localStorage.setItem(key, result);
}

/**
 * @description: 移除 localstorage 的值
 * @author: 白雾茫茫丶
 */
export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
}

/**
 * @description: AES/DES密钥
 * @author: 白雾茫茫丶
 */
const CRYPTO_KEY = CryptoJS.enc.Utf8.parse('ABCDEF0123456789'); // 十六位十六进制数作为密钥
const CRYPTO_IV = CryptoJS.enc.Utf8.parse('ABCDEF0123456789'); // 十六位十六进制数作为密钥偏移量

/**
 * @description: AES/DES加密
 * @param {string} password
 * @Author: 白雾茫茫丶
 */
export const encryptionAesPsd = (password: string): string => {
  const encrypted = CryptoJS.AES.encrypt(password, CRYPTO_KEY, {
    iv: CRYPTO_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString(); // 返回的是base64格式的密文
};

/**
 * @description: AES/DES解密
 * @param {string} password
 * @Author: 白雾茫茫丶
 */
export const decryptionAesPsd = (password: string): string => {
  const decrypted = CryptoJS.AES.decrypt(password, CRYPTO_KEY, {
    iv: CRYPTO_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8); // 返回的是解密后的字符串
};

/**
 * @description: 退出登录返回到登录页
 * @Author: 白雾茫茫丶
 */
export const logoutToLogin = () => {
  const { search, pathname } = window.location;
  // 获取 LOCK_SLEEP 信息
  const LOCK_SLEEP = getLocalStorageItem<LockSleepTypes>(LOCAL_STORAGE.LOCK_SLEEP)
  const urlParams = new URL(window.location.href).searchParams;
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const redirect = urlParams.get('redirect');
  // 移除 token
  removeLocalStorageItem(LOCAL_STORAGE.ACCESS_TOKEN)
  // 取消睡眠弹窗
  if (LOCK_SLEEP) {
    setLocalStorageItem(LOCAL_STORAGE.LOCK_SLEEP, { ...LOCK_SLEEP, isSleep: false })
  }
  // 重定向地址
  if (window.location.pathname !== ROUTES.LOGIN && !redirect) {
    history.replace({
      pathname: ROUTES.LOGIN,
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
}

/**
 * @description: 获取当前时间
 * @Author: 白雾茫茫丶
 */
export const timeFix = (): string => {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '夜深了'
}

/**
 * @description: 随机欢迎语
 * @Author: 白雾茫茫丶
 */
export const welcomeWords = (): string => {
  const words = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 LOL', '我猜你可能累了', '认真工作吧', '今天又是充满活力的一天']
  return sample(words)
}

/**
 * @description: 判断是否是HTTP或HTTPS链接
 * @param {string} link
 * @Author: 白雾茫茫丶
 */
export const isHttpLink = (link: string): boolean => {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol  
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name  
    '((\\d{1,3}\\.){3}\\\d{1,3}))' + // OR ip (v4) address  
    '(\\:\\d+)?' + // port  
    '(\\/[-a-z\\d%_.~+]*)*' + // path  
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string  
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator  
  return pattern.test(link);
}

/**
 * @description: 默认不显示的 column 项
 * @author: 白雾茫茫丶
 */
export const renderColumnsStateMap = (MENU_CFG: string[] = []) => {
  const result: Record<string, ColumnsState> = {}
  MENU_CFG.forEach((ele) => {
    result[ele] = {
      show: false,
    }
  })
  return result
}

/**
 * @description: Tag 标签随机颜色
 * @author: 白雾茫茫丶
 */
export const randomTagColor = () => {
  const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
  return sample(colors)
}

/** @description: 生成随机颜色 */
export const randomColor = (min = 0, max = 255) => {
  // 生成三个介于 0 到 255 之间的随机数作为 RGB 的值
  const r = random(min, max);
  const g = random(min, max);
  const b = random(min, max);
  return `rgb(${r},${g},${b})`;
};

/** @description: 验证码字符 */
export const codeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * @param {number} size 随机获取几张图片数组，默认获取随机一张图片
 * @description: 获取 /assets/img 路径下随机图片
 */
export const getRandomImg = (size = 1) => {
  if (!isInteger(size) || size < 1) {
    return message.warning('参数必须是一个正整数!');
  }
  // 匹配该目录下所有的图片
  const images: string[] = [];
  for (let i = 1; i <= 20; i += 1) {
    images.push(`/images/${i}.jpg`);
  }
  // 获取图片集合
  const result = sampleSize(images, size);
  return result.length === 1 ? result[0] : result;
};


/**
 * @description: 生成随机的汉字数组
 * @param {number} count
 */
export const generateRandomHanziArray = (count = 1) => {
  const minCode = 0x4e00; // 汉字 Unicode 范围的最小值
  const maxCode = 0x9fff; // 汉字 Unicode 范围的最大值

  const hanziArray = [];
  for (let i = 0; i < count; i++) {
    const randomCode = random(minCode, maxCode);
    hanziArray.push(String.fromCodePoint(randomCode));
  }

  return hanziArray;
};

/** @description: 浏览器图标映射 */
export const BroswerIconMap = (text: string): string | undefined => {
  const iconMap: Record<string, string> = {
    Chrome: 'logos:chrome',
    Firefox: 'logos:firefox',
    Safari: 'logos:safari',
    Opera: 'logos:opera',
    Edge: 'logos:microsoft-edge',
    WebKit: 'logos:webkit',
    Android: 'logos:android-icon',
  };
  for (let i = 0; i < keys(iconMap).length; i += 1) {
    const item = keys(iconMap)[i];
    if (startsWith(toLower(text), toLower(item))) {
      return iconMap[item];
    }
  }
  return undefined;
};

/** @description: 操作系统图标映射 */
export const OsIconMap = (text: string): string | undefined => {
  const iconMap: Record<string, string> = {
    Windows: 'logos:microsoft-windows-icon',
    'Mac OS': 'logos:apple',
    Linux: 'logos:linux-tux',
    Android: 'logos:android-icon',
    iOS: 'logos:apple',
    Chrome: 'logos:chrome',
  };
  for (let i = 0; i < keys(iconMap).length; i += 1) {
    const item = keys(iconMap)[i];
    if (startsWith(toLower(text), toLower(item))) {
      return iconMap[item];
    }
  }
  return undefined;
};