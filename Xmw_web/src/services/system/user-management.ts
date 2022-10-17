/*
 * @Description: 系统设置-用户管理-API
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-17 10:41:49
 */
import { request } from '@umijs/max';
import type { Data, ResponseModel } from '@/global/interface';

/**
 * @description:  获取用户列表
 * @param {object} options
 * @return {*}
 * @author: Cyan
 */
export async function getUserList(options?: Data) {
  return request<ResponseModel>('/api/system/getUserList', {
    method: 'GET',
    params: options || {},
  });
}

/**
 * @description: 保存用户数据
 * @param {Data} options
 * @return {*}
 * @author: Cyan
 */
export async function saveUser(options?: Data) {
  return request<ResponseModel>('/api/system/saveUser', {
    method: 'POST',
    data: options || {},
  });
}

/**
 * @description: 删除用户列表
 * @param {Data} user_id
 * @return {*}
 * @author: Cyan
 */
export async function delUser(user_id: string) {
  return request<ResponseModel>('/api/system/delUser', {
    method: 'POST',
    data: { user_id },
  });
}

/**
 * @description: 设置用户状态
 * @param {Data} options
 * @return {*}
 * @author: Cyan
 */
export async function setUserStatus(options?: Data) {
  return request<ResponseModel>('/api/system/setUserStatus', {
    method: 'POST',
    data: options || {},
  });
}
