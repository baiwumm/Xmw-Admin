/*
 * @Description: 系统设置-用户管理-API
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-07 10:26:02
 */
import { ROUTES } from '@/utils/enums'
import type { PageResponse } from '@/utils/types'
import type { SearchParams, UserStatusProps } from '@/utils/types/system/user-management'
import { httpRequest } from '@/utils/umiRequest'

const baseURL = ROUTES.USERMANAGEMENT

/**
 * @description:  获取用户列表
 * @param {SearchParams} options
 * @Author: 白雾茫茫丶
 */
export async function getUserList(options?: SearchParams) {
  return httpRequest.get<PageResponse<API.USERMANAGEMENT>>(`${baseURL}`, options);
}

/**
 * @description: 新增用户数据
 * @param {API.USERMANAGEMENT} options
 * @Author: 白雾茫茫丶
 */
export async function createUser(options: API.USERMANAGEMENT) {
  return httpRequest.post<API.USERMANAGEMENT>(`${baseURL}`, options);
}

/**
 * @description: 更新用户数据
 * @param {API.USERMANAGEMENT} options
 * @Author: 白雾茫茫丶
 */
export async function updateUser({ user_id, ...options }: Partial<API.USERMANAGEMENT>) {
  return httpRequest.put<number[]>(`${baseURL}/${user_id}`, options);
}

/**
 * @description: 删除用户数据
 * @param {string} user_id
 * @Author: 白雾茫茫丶
 */
export async function delUser(user_id: string) {
  return httpRequest.delete<number>(`${baseURL}/${user_id}`);
}

/**
 * @description: 设置角色状态
 * @param {Data} options
 * @Author: 白雾茫茫丶
 */
export async function setUserStatus({ user_id, status }: UserStatusProps) {
  return httpRequest.patch<number[]>(`${baseURL}/${user_id}`, { status });
}
