/*
 * @Description: 智能行政-岗位管理模块接口
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-23 13:43:13
 */
import { request } from '@umijs/max';
import { Data, Result } from '@/global/interface'


/**
 * @description:  获取岗位管理列表
 * @param {object} options
 * @return {*}
 * @author: Cyan
 */
export async function getJobsList(options?: Data) {
    return request<Result>('/api/administrative/getJobsList', {
        method: 'GET',
        params: options || {},
    });
}

/**
 * @description: 新增更新岗位管理列表
 * @param {Data} options
 * @return {*}
 * @author: Cyan
 */
export async function saveJobs(options?: Data) {
    return request<Result>('/api/administrative/saveJobs', {
        method: 'POST',
        data: options || {},
    });
}

/**
 * @description: 删除岗位管理列表
 * @param {Data} jobs_id
 * @return {*}
 * @author: Cyan
 */
export async function delJobs(jobs_id: string) {
    return request<Result>('/api/administrative/delJobs', {
        method: 'POST',
        data: { jobs_id },
    });
}