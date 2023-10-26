/*
 * @Description: 智能行政-组织管理-API
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-07 09:18:43
 */
import { ROUTES } from '@/utils/enums'
import type { CreateOrgParams, SearchParams } from '@/utils/types/administrative/organization'
import { httpRequest } from '@/utils/umiRequest'

const baseURL = ROUTES.ORGANIZATION

/**
 * @description: 获取组织管理列表
 * @param {SearchParams} options
 * @Author: 白雾茫茫丶
 */
export const getOrganizationList = (options?: SearchParams) =>
  httpRequest.get<API.ORGANIZATION[]>(`${baseURL}`, options);

/**
 * @description: 新增组织数据
 * @param {CreateOrgParams} options
 * @Author: 白雾茫茫丶
 */
export const createOrganization = (options: CreateOrgParams) =>
  httpRequest.post<API.ORGANIZATION>(`${baseURL}`, options);

/**
 * @description: 更新组织数据
 * @param {API.ORGANIZATION} options
 * @Author: 白雾茫茫丶
 */
export const updateOrganization = ({ org_id, ...options }: API.ORGANIZATION) =>
  httpRequest.put<number[]>(`${baseURL}/${org_id}`, options);

/**
 * @description: 删除组织数据
 * @param {string} org_id
 * @Author: 白雾茫茫丶
 */
export const delOrganization = (org_id: string) => httpRequest.delete(`${baseURL}/${org_id}`);
