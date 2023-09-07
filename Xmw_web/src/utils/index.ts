/*
 * @Description: 全局公共方法
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-07 16:12:53
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-07 17:31:57
 */
import type { ProColumns } from '@ant-design/pro-components';
import { getLocale, history, useIntl } from '@umijs/max';
import CryptoJS from 'crypto-js'; // AES/DES加密
import { compact, join, reduce, toNumber } from 'lodash-es';
import { stringify } from 'querystring';

import { LOCAL_STORAGE, OPERATION, ROUTES } from '@/utils/enums'
import type { LockSleepTypes } from '@/utils/types'

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
export const formatPerfix = (route: string, isMenu = false): string => {
  return `${isMenu ? 'menu' : 'pages'}.${formatPathName(route)}`
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
 * @description: 计算表格滚动长度
 * @Author: 白雾茫茫丶
 */
export const columnScrollX = (columns: ProColumns[]): number => reduce(
  columns,
  (sum: number, record: ProColumns) => sum + (toNumber(record.width) || 100),
  0)

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
 * @description: 获取菜单权限集合，用于做菜单鉴权
 * @param {API} routeTree
 * @Author: 白雾茫茫丶
 */
export const collectionRouteName = (routeTree: API.MENUMANAGEMENT[] | undefined): string[] => {
  if (!routeTree) return []
  const result: string[] = []
  function loopMenu(treeNode: API.MENUMANAGEMENT[]) {
    treeNode.forEach((route) => {
      if (route.name) {
        result.push(route.name)
      }
      if (route.routes) {
        loopMenu(route.routes)
      }
    })
  }
  loopMenu(routeTree)
  return result
}

/**
 * @description: 延迟提交，优化用户体验
 * @param {number} time
 * @Author: 白雾茫茫丶
 */
export const waitTime = (time: number = 100): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

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
 * @return {*}
 * @Author: 白雾茫茫丶
 */
export const welcomeWords = (): string => {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 LOL', '我猜你可能累了', '认真工作吧', '今天又是充满活力的一天']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/** 通过某个节点的值，获取对应节点的完整信息
 * @description: 
 * @param {*} tree: 树结构数组
 * @param {*} value: 对应的值
 * @param {*} field: 对应的字段
 * @param {*} children: 子级字段
 * @Author: 白雾茫茫丶
 */
export function getItemByIdInTree<T>(
  tree: T[],
  value: string,
  field: string,
  children = 'children'): T | undefined {
  for (let i = 0; i < tree.length; i++) {
    const treeNode = tree[i]
    if (treeNode[field] === value) {
      return treeNode
    } else if (treeNode[children]) {
      const reuslt: T | undefined = getItemByIdInTree(treeNode[children], value, field, children)
      if (reuslt) {
        return reuslt
      }
    }
  }
  return undefined
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
 * @description: Tag 标签颜色
 * @author: 白雾茫茫丶
 */
export const TagColors = ['magenta', 'volcano', 'cyan', 'blue']

/**
 * @description: 渲染标题
 * @author: 白雾茫茫丶
 */
export const renderFormTitle = <T extends Record<string, any>>
  (record: T | undefined, formatPerfix: string, id: string, name: string, isMenu = false) => {
  // 国际化工具
  const { formatMessage } = useIntl();
  const result = record?.[id]
    ? `${formatMessage({ id: `menu.${formatPerfix}.${OPERATION.EDIT}` }) +
    formatMessage({ id: `pages.${formatPerfix}.title` })
    }：${isMenu ? record[getLocale()] : record[name]}`
    : formatMessage({ id: `menu.${formatPerfix}.${OPERATION.ADD}` }) +
    formatMessage({ id: `pages.${formatPerfix}.title` });
  return result
}

/**
 * @description: 默认不显示的 column 项
 * @author: 白雾茫茫丶丶
 */
export const renderColumnsStateMap = (MENU_CFG: string[] = []) => {
  const result: Record<string, { show: boolean }> = {}
  MENU_CFG.forEach((ele) => {
    result[ele] = {
      show: false,
    }
  })
  return result
}