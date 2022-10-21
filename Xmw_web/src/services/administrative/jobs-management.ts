/*
 * @Description: 智能行政-岗位管理-API
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-21 14:18:12
 */
import { request } from '@umijs/max';
import type { ResData, ResponseModel } from '@/global/interface';

/**
 * @description:  获取岗位管理列表
 * @param {object} options
 * @return {*}
 * @author: Cyan
 */
export async function getJobsList(options?: ResData): Promise<ResponseModel> {
  return request<ResponseModel>('/api/administrative/jobs-management', {
    method: 'GET',
    params: options || {},
  });
}

/**
 * @description: 新增岗位数据
 * @param {ResData} options
 * @return {*}
 * @author: Cyan
 */
export async function createJobs(options?: ResData): Promise<ResponseModel> {
  return request<ResponseModel>('/api/administrative/jobs-management', {
    method: 'POST',
    data: options || {},
  });
}

/**
 * @description: 新增岗位数据
 * @param {ResData} options
 * @return {*}
 * @author: Cyan
 */
export async function updateJobs({ jobs_id, ...options }: ResData): Promise<ResponseModel> {
  return request<ResponseModel>(`/api/administrative/jobs-management/${jobs_id}`, {
    method: 'PUT',
    data: options || {},
  });
}

/**
 * @description: 删除岗位数据
 * @param {ResData} jobs_id
 * @return {*}
 * @author: Cyan
 */
export async function delJobs(jobs_id: string): Promise<ResponseModel> {
  return request<ResponseModel>(`/api/administrative/jobs-management/${jobs_id}`, {
    method: 'DELETE',
  });
}
