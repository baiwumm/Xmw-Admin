/*
 * @Description: 系统设置-菜单管理-API
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-27 16:36:35
 */
import { request } from '@umijs/max';
import type { ResData, ResponseModel } from '@/global/interface';

/**
 * @description:  获取菜单列表
 * @param {object} options
 * @return {*}
 * @author: Cyan
 */
export async function getMenuList(options?: ResData) {
  return request<ResponseModel>('/api/system/menu-management', {
    method: 'GET',
    params: options || {},
  });
}

/**
 * @description: 新增菜单数据
 * @param {ResData} options
 * @return {*}
 * @author: Cyan
 */
 export async function createMenu(options: ResData): Promise<ResponseModel> {
  return request<ResponseModel>('/api/system/menu-management', {
    method: 'POST',
    data: options || {},
  });
}

/**
 * @description: 更新菜单数据
 * @param {ResData} options
 * @return {*}
 * @author: Cyan
 */
 export async function updateMenu({ menu_id, ...options }: ResData): Promise<ResponseModel> {
  return request<ResponseModel>(`/api/system/menu-management/${menu_id}`, {
    method: 'PUT',
    data: options || {},
  });
}

/**
 * @description: 删除菜单列表
 * @param {ResData} menu_id
 * @return {*}
 * @author: Cyan
 */
export async function delMenu(menu_id: string): Promise<ResponseModel> {
  return request<ResponseModel>(`/api/system/menu-management/${menu_id}`, {
    method: 'DELETE',
  });
}
