/*
 * @Description: 系统设置-国际化-API
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-07 10:10:44
 */
import { ROUTES } from '@/utils/enums'
import type { CreateInternationalParams, SearchParams } from '@/utils/types/system/internationalization'
import { httpRequest } from '@/utils/umiRequest'

const baseURL = ROUTES.INTERNATIONALIZATION

/**
 * @description: 获取国际化列表
 * @param {SearchParams} options
 * @Author: 白雾茫茫丶
 */
export async function getInternationalList(options?: SearchParams) {
  return httpRequest.get<API.INTERNATIONALIZATION[]>(`${baseURL}`, options);
}

/**
 * @description: 获取国际化多语言层级对象
 * @Author: 白雾茫茫丶
 */
export async function getAllLocalesLang() {
  return httpRequest.get<API.LOCALESLANGAll>(`${baseURL}/allLocales`);
}

/**
 * @description: 新增国际化数据
 * @param {CreateInternationalParams} options
 * @Author: 白雾茫茫丶
 */

export async function createInternational(options: CreateInternationalParams) {
  return httpRequest.post<API.INTERNATIONALIZATION>(`${baseURL}`, options);
}

/**
 * @description: 更新国际化数据
 * @param {API.INTERNATIONALIZATION} options
 * @Author: 白雾茫茫丶
 */
export async function updateInternational({ id, ...options }: API.INTERNATIONALIZATION) {
  return httpRequest.put<number[]>(`${baseURL}/${id}`, options);
}

/**
 * @description: 删除国际化数据
 * @param {string} id
 * @Author: 白雾茫茫丶
 */
export async function delInternational(id: string) {
  return httpRequest.delete(`${baseURL}/${id}`);
}
