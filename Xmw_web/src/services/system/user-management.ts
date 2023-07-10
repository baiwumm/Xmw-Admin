/*
 * @Description: 系统设置-用户管理-API
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-17 11:14:00
 */
import { request } from '@umijs/max';

import type { PageResModel, ResponseModel } from '@/global/interface';
import type { TableSearchProps, UserStatusProps } from '@/pages/System/UserManagement/utils/interface'

/**
 * @description:  获取用户列表
 * @param {TableSearchProps} options
 * @return {*}
 * @author: Cyan
 */
export async function getUserList(options?: TableSearchProps):
  Promise<ResponseModel<PageResModel<API.USERMANAGEMENT>>> {
  return request('/api/system/user-management', {
    method: 'GET',
    params: options || {},
  });
}

/**
 * @description: 新增用户数据
 * @param {API.USERMANAGEMENT} options
 * @return {*}
 * @author: Cyan
 */
export async function createUser(
  options: API.USERMANAGEMENT,
): Promise<ResponseModel<API.USERMANAGEMENT>> {
  return request('/api/system/user-management', {
    method: 'POST',
    data: options || {},
  });
}

/**
 * @description: 更新用户数据
 * @param {API.USERMANAGEMENT} options
 * @return {*}
 * @author: Cyan
 */
export async function updateUser({ user_id, ...options }:
  Partial<API.USERMANAGEMENT>): Promise<ResponseModel<number[]>> {
  return request(`/api/system/user-management/${user_id}`, {
    method: 'PUT',
    data: options || {},
  });
}

/**
 * @description: 删除用户数据
 * @param {string} user_id
 * @return {*}
 * @author: Cyan
 */
export async function delUser(user_id: string): Promise<ResponseModel<number>> {
  return request(`/api/system/user-management/${user_id}`, {
    method: 'DELETE',
  });
}

/**
 * @description: 设置角色状态
 * @param {Data} options
 * @return {*}
 * @author: Cyan
 */
export async function setUserStatus({ user_id, status }: UserStatusProps): Promise<ResponseModel<number[]>> {
  return request(`/api/system/user-management/${user_id}`, {
    method: 'PATCH',
    data: { status } || {},
  });
}
