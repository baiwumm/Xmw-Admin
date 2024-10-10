/*
 * @Description: 全局工具函数
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-16 10:50:33
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-10 11:28:54
 */
import { Request } from 'express';
import * as fs from 'fs';

import { XmwInternational } from '@/models/xmw_international.model'; // 数据库实体
import { REQUEST_CODE, REQUEST_MSG } from '@/utils/enums';
import type { Response } from '@/utils/types';

/**
 * @description: 统一返回体
 * @author: 白雾茫茫丶
 */
export const responseMessage = <T = any>(
  data,
  msg: string = REQUEST_MSG.SUCCESS,
  code: number = REQUEST_CODE.SUCCESS,
): Response<T> => {
  return { data, msg, code };
};

/**
 * @description: 将数组转成树形数据
 * @param {any} resource: 源数据
 * @param {string} id
 * @param {string} parentId
 * @param {string} children
 * @author: 白雾茫茫丶
 */
export function initializeTree<T>(
  resource: T[],
  id: string,
  parentId: string,
  children: string,
): T[] {
  const temp = JSON.parse(JSON.stringify(resource));
  // 以id为键，当前对象为值，存入一个新的对象中
  const tempObj = {};
  for (const i in temp) {
    tempObj[temp[i][id]] = temp[i];
  }
  return temp.filter((father: T) => {
    // 把当前节点的所有子节点找到
    const childArr = temp.filter((child: T) => father[id] == child[parentId]);
    childArr.length > 0 ? (father[children] = childArr) : '';
    // 只返回第一级数据；如果当前节点的fatherId不为空，但是在父节点不存在，也为一级数据
    return father[parentId] === null || !tempObj[father[parentId]];
  });
}

/**
 * @description: 将树形数据转成层级对象，主要是国际化数据
 * @param {LangModel} resource
 * @param {string} lang
 * @param {string} name
 * @author: 白雾茫茫丶
 */
export const initializeLang = (
  resource: XmwInternational[],
  lang: string,
  name = 'name',
): Record<string, any> => {
  const result = {};
  // 遍历数组
  for (let i = 0; i < resource.length; i++) {
    const resourceItem = resource[i];
    // 递归函数
    function recursive(obj: XmwInternational, serilKey = '') {
      // 拼接对象名
      let pKey = serilKey;
      pKey += pKey ? `.${obj[name]}` : obj[name];
      // 当前层级是否有数据，给 result 赋值
      if (obj[lang]) {
        result[pKey] = obj[lang];
      }
      // 判断是否有子级，有就递归遍历
      if (obj.children?.length && Array.isArray(obj.children)) {
        for (let j = 0; j < obj.children.length; j++) {
          const child = obj.children[j];
          recursive(child, pKey);
        }
      }
    }
    // 循环执行
    recursive(resourceItem);
  }
  return result;
};

/**
 * @description: 生成文件上传文件夹
 * @param {string} filePath
 * @author: 白雾茫茫丶
 */
export const checkDirAndCreate = (filePath: string): void => {
  const pathArr = filePath.split('/');
  let checkPath = '.';
  let item: string;
  for (item of pathArr) {
    checkPath += `/${item}`;
    if (!fs.existsSync(checkPath)) {
      fs.mkdirSync(checkPath);
    }
  }
};

/**
 * @description: 获取客户端真实 IP
 * @param {Request} req
 */
export const getRealIp = (req: Request): string => {
  const result =
    req.headers['x-forwarded-for'] ||
    req.headers['x-real-ip'] ||
    req.socket.remoteAddress ||
    req.ip;
  return Array.isArray(result) ? result[0] : result;
};
