/*
 * @Description: 系统设置-菜单管理-API
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-07 10:05:02
 */
import { ROUTES } from '@/utils/enums'
import type { SearchParams } from '@/utils/types/system/menu-management'
import { httpRequest } from '@/utils/umiRequest'

const baseURL = ROUTES.MENUMANAGEMENT

/**
 * @description:  获取菜单列表
 * @param {SearchParams} options
 * @Author: 白雾茫茫丶
 */

export async function getMenuList(options?: SearchParams) {
  return httpRequest.get<API.MENUMANAGEMENT[]>(`${baseURL}`, options);
}

/**
 * @description: 新增菜单数据
 * @param {Partial<API.MENUMANAGEMENT>} options
 * @Author: 白雾茫茫丶
 */
export async function createMenu(options: Partial<API.MENUMANAGEMENT>) {
  return httpRequest.post<API.MENUMANAGEMENT>(`${baseURL}`, options);
}

/**
 * @description: 更新菜单数据
 * @param {API.MENUMANAGEMENT} options
 * @Author: 白雾茫茫丶
 */
export async function updateMenu({ menu_id, ...options }: API.MENUMANAGEMENT) {
  return httpRequest.put<number[]>(`${baseURL}/${menu_id}`, options);
}

/**
 * @description: 删除菜单数据
 * @param {string} menu_id
 * @Author: 白雾茫茫丶
 */
export async function delMenu(menu_id: string) {
  return httpRequest.delete<number>(`${baseURL}/${menu_id}`);
}
