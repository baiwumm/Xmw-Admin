/*
 * @Description: 系统设置-角色管理-API
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-29 16:41:07
 */
import { request } from '@umijs/max';

import type { PageResModel, ResponseModel } from '@/global/interface';
import type { RoleStatusProps, TableSearchProps } from '@/pages/System/RoleManagement/utils/interface'

/**
 * @description:  获取角色列表
 * @param {TableSearchProps} options
 * @return {*}
 * @author: Cyan
 */
export async function getRoleList(options?: TableSearchProps):
  Promise<ResponseModel<PageResModel<API.ROLEMANAGEMENT>>> {
  return request('/api/system/role-management', {
    method: 'GET',
    params: options || {},
  });
}

/**
 * @description: 新增角色数据
 * @param {API.ROLEMANAGEMENT} options
 * @return {*}
 * @author: Cyan
 */
export async function createRole(
  options: Omit<API.ROLEMANAGEMENT, 'role_id' | 'founder' | 'created_time' | 'updated_time'>,
): Promise<ResponseModel<API.ROLEMANAGEMENT>> {
  return request('/api/system/role-management', {
    method: 'POST',
    data: options || {},
  });
}

/**
 * @description: 更新角色数据
 * @param {API.ROLEMANAGEMENT} options
 * @return {*}
 * @author: Cyan
 */
export async function updateRole({ role_id, ...options }: API.ROLEMANAGEMENT): Promise<ResponseModel<number[]>> {
  return request(`/api/system/role-management/${role_id}`, {
    method: 'PUT',
    data: options || {},
  });
}

/**
 * @description: 删除角色数据
 * @param {string} role_id
 * @return {*}
 * @author: Cyan
 */
export async function delRole(role_id: string): Promise<ResponseModel<number>> {
  return request(`/api/system/role-management/${role_id}`, {
    method: 'DELETE',
  });
}

/**
 * @description: 设置角色状态
 * @param {Data} options
 * @return {*}
 * @author: Cyan
 */
export async function setRoleStatus({ role_id, status }: RoleStatusProps): Promise<ResponseModel<number[]>> {
  return request(`/api/system/role-management/${role_id}`, {
    method: 'PATCH',
    data: { status } || {},
  });
}
