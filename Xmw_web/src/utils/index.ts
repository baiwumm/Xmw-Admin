/*
 * @Description: 全局公共方法
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-07 16:12:53
 * @LastEditors: Cyan
 * @LastEditTime: 2023-07-11 13:50:50
 */
import type { ProColumns } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import CryptoJS from 'crypto-js'; // AES/DES加密
import { get, reduce, toNumber } from 'lodash-es';
import { stringify } from 'querystring';

import type { ResponseModel } from '@/global/interface';
import routerConfig from '@/utils/routerConfig' // 路由配置

// 保存在 localstorage 的 key
export const CACHE_KEY = 'APP_LOCAL_CACHE_KEY';

const CRYPTO_KEY = CryptoJS.enc.Utf8.parse('ABCDEF0123456789'); // 十六位十六进制数作为密钥
const CRYPTO_IV = CryptoJS.enc.Utf8.parse('ABCDEF0123456789'); // 十六位十六进制数作为密钥偏移量
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
  return encrypted.toString(); // 返回的是base64格式的密文
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
  return decrypted.toString(CryptoJS.enc.Utf8); // 返回的是解密后的字符串
};

/**
 * @description: 计算表格滚动长度
 * @return {*}
 * @author: Cyan
 */
export const columnScrollX = (columns: ProColumns[]): number => reduce(
  columns,
  (sum: number, record: ProColumns) => sum + (toNumber(record.width) || 100),
  0)

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
export const logoutToLogin = () => {
  const { search, pathname } = window.location;
  // 获取 localStorage 信息
  const lock_sleep = localStorage.getItem('lock_sleep');
  const urlParams = new URL(window.location.href).searchParams;
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const redirect = urlParams.get('redirect');
  // 取消睡眠弹窗
  if (lock_sleep) {
    localStorage.setItem('lock_sleep', { ...JSON.parse(lock_sleep), isSleep: false })
  }
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

/**
 * @description: 获取菜单权限集合，用于做菜单鉴权
 * @param {API} routeTree
 * @return {*}
 * @author: Cyan
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
 * @return {*}
 * @author: Cyan
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
 * @return {*}
 * @author: Cyan
 */
export const timeFix = (): string => {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '夜深了'
}

/**
 * @description: 随机欢迎语
 * @return {*}
 * @author: Cyan
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
 * @return {*}
 * @author: Cyan
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
