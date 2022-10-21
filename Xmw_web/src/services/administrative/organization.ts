/*
 * @Description: 智能行政-组织管理-API
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-21 14:18:52
 */
import { request } from '@umijs/max';
import type { ResData, ResponseModel } from '@/global/interface';

/**
 * @description:  获取组织管理列表
 * @param {object} options
 * @return {*}
 * @author: Cyan
 */
export async function getOrganizationList(options?: ResData): Promise<ResponseModel> {
  return request<ResponseModel>('/api/administrative/organization', {
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
export async function createOrganization(options?: ResData): Promise<ResponseModel> {
  return request<ResponseModel>('/api/administrative/organization', {
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
export async function updateOrganization({ org_id, ...options }: ResData): Promise<ResponseModel> {
  return request<ResponseModel>(`/api/administrative/organization/${org_id}`, {
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
export async function delOrganization(org_id: string): Promise<ResponseModel> {
  return request<ResponseModel>(`/api/administrative/organization/${org_id}`, {
    method: 'DELETE',
  });
}
