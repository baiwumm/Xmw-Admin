/*
 * @Description: 系统设置-国际化-API
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-18 18:23:43
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
  return request<ResponseModel>('/api/system/international', {
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
  return request<ResponseModel>('/api/system/international/allLocales', {
    method: 'GET',
    params: options || {},
  });
}

/**
 * @description: 新增国际化数据
 * @param {Data} options
 * @return {*}
 * @author: Cyan
 */
export async function createInternational(options?: Data) {
  return request<ResponseModel>('/api/system/international', {
    method: 'POST',
    data: options || {},
  });
}

/**
 * @description: 更新国际化数据
 * @param {Data} options
 * @return {*}
 * @author: Cyan
 */
export async function updateInternational(options?: Data) {
  return request<ResponseModel>('/api/system/international', {
    method: 'PUT',
    data: options || {},
  });
}

/**
 * @description: 删除国际化数据
 * @param {Data} options
 * @return {*}
 * @author: Cyan
 */
export async function delInternational(international_id: string) {
  return request<ResponseModel>('/api/system/international', {
    method: 'DELETE',
    data: { international_id },
  });
}
