/*
 * @Description: 系统设置-角色管理-API
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-17 10:41:41
 */
import { request } from '@umijs/max';
import type { Data, ResponseModel } from '@/global/interface';

/**
 * @description:  获取角色列表
 * @param {object} options
 * @return {*}
 * @author: Cyan
 */
export async function getRoleList(options?: Data) {
  return request<ResponseModel>('/api/system/getRoleList', {
    method: 'GET',
    params: options || {},
  });
}

/**
 * @description: 保存角色数据
 * @param {Data} options
 * @return {*}
 * @author: Cyan
 */
export async function saveRole(options?: Data) {
  return request<ResponseModel>('/api/system/saveRole', {
    method: 'POST',
    data: options || {},
  });
}

/**
 * @description: 删除角色列表
 * @param {Data} role_id
 * @return {*}
 * @author: Cyan
 */
export async function delRole(role_id: string) {
  return request<ResponseModel>('/api/system/delRole', {
    method: 'POST',
    data: { role_id },
  });
}

/**
 * @description: 设置角色状态
 * @param {Data} options
 * @return {*}
 * @author: Cyan
 */
export async function setRoleStatus(options?: Data) {
  return request<ResponseModel>('/api/system/setRoleStatus', {
    method: 'POST',
    data: options || {},
  });
}
