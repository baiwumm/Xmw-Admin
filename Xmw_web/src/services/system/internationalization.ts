/*
 * @Description: 系统设置-国际化-API
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-17 10:41:25
 */
import { request } from '@umijs/max';
import type { Data, ResponseModel } from '@/global/interface';

/**
 * @description:  获取国际化列表
 * @param {object} options
 * @return {*}
 * @author: Cyan
 */
export async function getInternationalList(options?: Data) {
  return request<ResponseModel>('/api/system/getInternationalList', {
    method: 'GET',
    params: options || {},
  });
}

/**
 * @description:  获取国际化多语言层级对象
 * @param {object} options
 * @return {*}
 * @author: Cyan
 */
export async function getAllLocalesLang(options?: Data) {
  return request<ResponseModel>('/api/system/getAllLocalesLang', {
    method: 'GET',
    params: options || {},
  });
}

/**
 * @description: 保存国际化数据
 * @param {Data} options
 * @return {*}
 * @author: Cyan
 */
export async function saveInternational(options?: Data) {
  return request<ResponseModel>('/api/system/saveInternational', {
    method: 'POST',
    data: options || {},
  });
}

/**
 * @description: 删除国际化列表
 * @param {Data} id
 * @return {*}
 * @author: Cyan
 */
export async function delInternational(id: string) {
  return request<ResponseModel>('/api/system/delInternational', {
    method: 'POST',
    data: { id },
  });
}
