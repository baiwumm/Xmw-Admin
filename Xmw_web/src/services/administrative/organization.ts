/*
 * @Description: 智能行政-组织管理-API
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-29 16:42:04
 */
import { request } from '@umijs/max';

import type { ResponseModel } from '@/global/interface';
import type { CreateOrgProps, TableSearchProps } from '@/pages/Administrative/Organization/utils/interface'

/**
 * @description: 获取组织管理列表
 * @param {TableSearchProps} options
 * @return {*}
 * @author: Cyan
 */
export async function getOrganizationList(options?: TableSearchProps): Promise<ResponseModel<API.ORGANIZATION[]>> {
  return request('/api/administrative/organization', {
    method: 'GET',
    params: options || {},
  });
}

/**
 * @description: 新增组织数据
 * @param {CreateOrgProps} options
 * @return {*}
 * @author: Cyan
 */
export async function createOrganization(options: CreateOrgProps): Promise<ResponseModel<API.ORGANIZATION>> {
  return request('/api/administrative/organization', {
    method: 'POST',
    data: options || {},
  });
}

/**
 * @description: 更新组织数据
 * @param {API.ORGANIZATION} options
 * @return {*}
 * @author: Cyan
 */
export async function updateOrganization({ org_id, ...options }: API.ORGANIZATION): Promise<ResponseModel<number[]>> {
  return request(`/api/administrative/organization/${org_id}`, {
    method: 'PUT',
    data: options || {},
  });
}

/**
 * @description: 删除组织数据
 * @param {string} org_id
 * @return {*}
 * @author: Cyan
 */
export async function delOrganization(org_id: string): Promise<ResponseModel<number>> {
  return request(`/api/administrative/organization/${org_id}`, {
    method: 'DELETE',
  });
}
