/*
 * @Description: 系统设置-国际化-API
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-31 10:20:51
 */
import { request } from '@umijs/max';
import type { ResData, ResponseModel } from '@/global/interface';

/**
 * @description:  获取国际化列表
 * @param {object} options
 * @return {*}
 * @author: Cyan
 */
export async function getInternationalList(options?: ResData): Promise<ResponseModel> {
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
export async function getAllLocalesLang(options?: ResData): Promise<ResponseModel> {
  return request<ResponseModel>('/api/system/international/allLocales', {
    method: 'GET',
    params: options || {},
  });
}

/**
 * @description: 新增国际化数据
 * @param {ResData} options
 * @return {*}
 * @author: Cyan
 */
export async function createInternational(options: ResData): Promise<ResponseModel> {
  return request<ResponseModel>('/api/system/international', {
    method: 'POST',
    data: options || {},
  });
}

/**
 * @description: 更新国际化数据
 * @param {ResData} options
 * @return {*}
 * @author: Cyan
 */
export async function updateInternational({ id, ...options }: ResData): Promise<ResponseModel> {
  return request<ResponseModel>(`/api/system/international/${id}`, {
    method: 'PUT',
    data: options || {},
  });
}

/**
 * @description: 删除国际化数据
 * @param {id} string
 * @return {*}
 * @author: Cyan
 */
export async function delInternational(id: string): Promise<ResponseModel> {
  return request<ResponseModel>(`/api/system/international/${id}`, {
    method: 'DELETE',
  });
}
