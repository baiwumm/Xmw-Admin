/*
 * @Description: 智能行政-组织管理模块接口
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-14 16:58:01
 */
import { request } from '@umijs/max';
import { Data, Result } from '@/global/interface'


/**
 * @description:  获取组织管理列表
 * @param {object} options
 * @return {*}
 * @author: Cyan
 */
export async function getOrganizationList(options?: Data) {
    return request<Result>('/api/administrative/getOrganizationList', {
        method: 'GET',
        params: options || {},
    });
}

/**
 * @description: 新增更新组织管理列表
 * @param {Data} options
 * @return {*}
 * @author: Cyan
 */
export async function saveOrganization(options?: Data) {
    return request<Result>('/api/administrative/saveOrganization', {
        method: 'POST',
        data: options || {},
    });
}

/**
 * @description: 新增更新组织管理列表
 * @param {Data} org_id
 * @return {*}
 * @author: Cyan
 */
export async function delOrganization(org_id: string) {
    return request<Result>('/api/administrative/delOrganization', {
        method: 'POST',
        data: { org_id },
    });
}