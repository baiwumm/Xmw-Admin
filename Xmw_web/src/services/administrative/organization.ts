/*
 * @Description: 智能行政-组织管理-API
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-08 16:02:29
 */
import { request } from '@umijs/max';
import type { ResData, ResponseModel } from '@/global/interface';
import type { TableSearchProps,CreateOrgProps } from '@/pages/Administrative/Organization/utils/interface'

/**
 * @description:  获取组织管理列表
 * @param {object} options
 * @return {*}
 * @author: Cyan
 */
export async function getOrganizationList(options?: TableSearchProps): Promise<ResponseModel<API.ORGANIZATION[]>> {
  return request<ResponseModel<API.ORGANIZATION[]>>('/api/administrative/organization', {
    method: 'GET',
    params: options || {},
  });
}

/**
 * @description: 新增组织数据
 * @param {ResData} options
 * @return {*}
 * @author: Cyan
 */
export async function createOrganization(options?: CreateOrgProps): Promise<ResponseModel<API.ORGANIZATION>> {
  return request<ResponseModel<API.ORGANIZATION>>('/api/administrative/organization', {
    method: 'POST',
    data: options || {},
  });
}

/**
 * @description: 更新组织数据
 * @param {ResData} options
 * @return {*}
 * @author: Cyan
 */
export async function updateOrganization({ org_id, ...options }: ResData): Promise<ResponseModel<number[]>> {
  return request<ResponseModel<number[]>>(`/api/administrative/organization/${org_id}`, {
    method: 'PUT',
    data: options || {},
  });
}

/**
 * @description: 删除组织数据
 * @param {ResData} org_id
 * @return {*}
 * @author: Cyan
 */
export async function delOrganization(org_id: string): Promise<ResponseModel<number>> {
  return request<ResponseModel<number>>(`/api/administrative/organization/${org_id}`, {
    method: 'DELETE',
  });
}
