/*
 * @Description: 智能行政-岗位管理-API
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-29 16:41:47
 */
import { request } from '@umijs/max';

import type { ResponseModel } from '@/global/interface';
import type { CreateJobsProps, TableSearchProps } from '@/pages/Administrative/JobsManagement/utils/interface'

/**
 * @description: 获取岗位管理列表
 * @param {TableSearchProps} options
 * @return {*}
 * @author: Cyan
 */
export async function getJobsList(options?: TableSearchProps): Promise<ResponseModel<API.JOBSMANAGEMENT[]>> {
  return request('/api/administrative/jobs-management', {
    method: 'GET',
    params: options || {},
  });
}

/**
 * @description: 创建岗位数据
 * @param {CreateJobsProps} options
 * @return {*}
 * @author: Cyan
 */
export async function createJobs(options: CreateJobsProps): Promise<ResponseModel<API.JOBSMANAGEMENT>> {
  return request('/api/administrative/jobs-management', {
    method: 'POST',
    data: options || {},
  });
}

/**
 * @description: 更新岗位数据
 * @param {API.JOBSMANAGEMENT} options
 * @return {*}
 * @author: Cyan
 */

export async function updateJobs({ jobs_id, ...options }: API.JOBSMANAGEMENT): Promise<ResponseModel<number[]>> {
  return request(`/api/administrative/jobs-management/${jobs_id}`, {
    method: 'PUT',
    data: options || {},
  });
}

/**
 * @description: 
 * @param {string} jobs_id
 * @return {*}
 * @author: Cyan
 */
export async function delJobs(jobs_id: string): Promise<ResponseModel<number>> {
  return request(`/api/administrative/jobs-management/${jobs_id}`, {
    method: 'DELETE',
  });
}
