/*
 * @Description: 系统设置-角色管理-API
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-31 10:33:38
 */
import { request } from '@umijs/max';
import type { ResData, ResponseModel } from '@/global/interface';

/**
 * @description:  获取角色列表
 * @param {object} options
 * @return {*}
 * @author: Cyan
 */
export async function getRoleList(options?: ResData): Promise<ResponseModel> {
  return request<ResponseModel>('/api/system/role-management', {
    method: 'GET',
    params: options || {},
  });
}

/**
 * @description: 创建角色数据
 * @param {Data} options
 * @return {*}
 * @author: Cyan
 */
export async function createRole(options: ResData): Promise<ResponseModel> {
  return request<ResponseModel>('/api/system/role-management', {
    method: 'POST',
    data: options || {},
  });
}

/**
 * @description: 更新角色数据
 * @param {Data} options
 * @return {*}
 * @author: Cyan
 */
 export async function updateRole({ role_id, ...options }: ResData): Promise<ResponseModel> {
  return request<ResponseModel>(`/api/system/role-management/${role_id}`, {
    method: 'PUT',
    data: options || {},
  });
}

/**
 * @description: 删除角色数据
 * @param {Data} role_id
 * @return {*}
 * @author: Cyan
 */
export async function delRole(role_id: string): Promise<ResponseModel> {
  return request<ResponseModel>(`/api/system/role-management/${role_id}`, {
    method: 'DELETE',
  });
}

/**
 * @description: 设置角色状态
 * @param {Data} options
 * @return {*}
 * @author: Cyan
 */
export async function setRoleStatus({role_id,status}: ResData): Promise<ResponseModel> {
  return request<ResponseModel>(`/api/system/role-management/${role_id}`, {
    method: 'PATCH',
    data: {status} || {},
  });
}
