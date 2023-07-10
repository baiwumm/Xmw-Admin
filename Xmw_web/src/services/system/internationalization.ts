/*
 * @Description: 系统设置-国际化-API
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-29 16:40:29
 */
import { request } from '@umijs/max';

import type { ResponseModel } from '@/global/interface';
import type { CreateInternationalProps, TableSearchProps } from '@/pages/System/Internationalization/utils/interface'

/**
 * @description: 获取国际化列表
 * @param {TableSearchProps} options
 * @return {*}
 * @author: Cyan
 */
export async function getInternationalList(options?: TableSearchProps):
  Promise<ResponseModel<API.INTERNATIONALIZATION[]>> {
  return request('/api/system/international', {
    method: 'GET',
    params: options || {},
  });
}

/**
 * @description: 获取国际化多语言层级对象
 * @return {*}
 * @author: Cyan
 */
export async function getAllLocalesLang(): Promise<ResponseModel<API.LOCALESLANGAll>> {
  return request('/api/system/international/allLocales', {
    method: 'GET',
    params: {},
  });
}

/**
 * @description: 新增国际化数据
 * @param {CreateInternationalProps} options
 * @return {*}
 * @author: Cyan
 */

export async function createInternational(options: CreateInternationalProps):
  Promise<ResponseModel<API.INTERNATIONALIZATION>> {
  return request('/api/system/international', {
    method: 'POST',
    data: options || {},
  });
}

/**
 * @description: 更新国际化数据
 * @param {API.INTERNATIONALIZATION} options
 * @return {*}
 * @author: Cyan
 */
export async function updateInternational({ id, ...options }: API.INTERNATIONALIZATION):
  Promise<ResponseModel<number[]>> {
  return request(`/api/system/international/${id}`, {
    method: 'PUT',
    data: options || {},
  });
}

/**
 * @description: 删除国际化数据
 * @param {string} id
 * @return {*}
 * @author: Cyan
 */
export async function delInternational(id: string): Promise<ResponseModel<number>> {
  return request(`/api/system/international/${id}`, {
    method: 'DELETE',
  });
}
