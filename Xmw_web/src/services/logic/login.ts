/*
 * @Description: 用户登录模块 API
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-29 16:38:17
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-05 11:16:18
 */
import { request } from '@umijs/max';
import type { ResponseModel, PermissionModel } from '@/global/interface';
import type { LoginParams } from '@/pages/User/Login/utils/indexface'

/**
 * @description: 用户登录接口
 * @param {LoginParams} options
 * @return {*}
 * @author: Cyan
 */
export async function Login(options?: LoginParams): Promise<ResponseModel<{ access_token: string }>> {
  return request('/api/auth/login', {
    method: 'POST',
    data: options || {},
  });
}

/**
 * @description: 用户退出登录
 * @param {LoginParams} options
 * @return {*}
 * @author: Cyan
 */
export async function Logout(): Promise<ResponseModel<Record<string, any>>> {
  return request('/api/auth/logout', {
    method: 'POST',
  });
}

/**
 * @description: 获取当前用户信息
 * @return {*}
 * @author: Cyan
 */
export async function getUserInfo(): Promise<ResponseModel<API.USERMANAGEMENT>> {
  return request('/api/auth/user-info', {
    method: 'GET',
  });
}

/**
 * @description: 获取当前用户权限菜单
 * @return {*}
 * @author: Cyan
 */
export async function getPermissionMenu(): Promise<ResponseModel<PermissionModel>> {
  return request('/api/auth/permission-menu', {
    method: 'GET',
  });
}