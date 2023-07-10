/*
 * @Description: 系统设置-菜单管理-API
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-29 16:40:47
 */
import { request } from '@umijs/max';

import type { ResponseModel } from '@/global/interface';
import type { TableSearchProps } from '@/pages/System/MenuManagement/utils/interface'

/**
 * @description:  获取菜单列表
 * @param {TableSearchProps} options
 * @return {*}
 * @author: Cyan
 */

export async function getMenuList(options?: TableSearchProps): Promise<ResponseModel<API.MENUMANAGEMENT[]>> {
  return request('/api/system/menu-management', {
    method: 'GET',
    params: options || {},
  });
}

/**
 * @description: 新增菜单数据
 * @param {Partial<API.MENUMANAGEMENT>} options
 * @return {*}
 * @author: Cyan
 */
export async function createMenu(options: Partial<API.MENUMANAGEMENT>): Promise<ResponseModel<API.MENUMANAGEMENT>> {
  return request('/api/system/menu-management', {
    method: 'POST',
    data: options || {},
  });
}

/**
 * @description: 更新菜单数据
 * @param {API.MENUMANAGEMENT} options
 * @return {*}
 * @author: Cyan
 */
export async function updateMenu({ menu_id, ...options }: API.MENUMANAGEMENT): Promise<ResponseModel<number[]>> {
  return request(`/api/system/menu-management/${menu_id}`, {
    method: 'PUT',
    data: options || {},
  });
}

/**
 * @description: 删除菜单数据
 * @param {string} menu_id
 * @return {*}
 * @author: Cyan
 */
export async function delMenu(menu_id: string): Promise<ResponseModel<number>> {
  return request(`/api/system/menu-management/${menu_id}`, {
    method: 'DELETE',
  });
}
