/*
 * @Description: 全局工具函数
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-16 10:50:33
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-17 09:48:24
 */
import { LangModel } from '@/common/interface';
/**
 * @description: 多语言配置项
 * @return {*}
 * @author: Cyan
 */
export const LOCALES_LANG = ['zh-CN', 'en-US', 'ja-JP', 'zh-TW'];

/**
 * @description:
 * @param {any} resource: 源数据
 * @param {string} id
 * @param {string} parentId
 * @param {string} children
 * @return {*}
 * @author: Cyan
 */
export const initializeTree = (
  resource: any,
  id: string,
  parentId: string,
  children: string,
) => {
  const temp = JSON.parse(JSON.stringify(resource));
  // 以id为键，当前对象为值，存入一个新的对象中
  const tempObj = {};
  for (const i in temp) {
    tempObj[temp[i][id]] = temp[i];
  }
  return temp.filter((father) => {
    // 把当前节点的所有子节点找到
    const childArr = temp.filter((child) => father[id] == child[parentId]);
    childArr.length > 0 ? (father[children] = childArr) : '';
    // 只返回第一级数据；如果当前节点的fatherId不为空，但是在父节点不存在，也为一级数据
    return father[parentId] === null || !tempObj[father[parentId]];
  });
};

/**
 * @description: 将树形数据转成层级对象，主要是国际化数据
 * @param {LangModel} resource
 * @param {string} lang
 * @param {string} name
 * @return {*}
 * @author: Cyan
 */
export const initializeLang = (
  resource: LangModel[],
  lang: string,
  name = 'name',
) => {
  const result = {};
  // 遍历数组
  for (let i = 0; i < resource.length; i++) {
    const resourceItem = resource[i];
    // 递归函数
    function recursive(obj: LangModel, serilKey = '') {
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
