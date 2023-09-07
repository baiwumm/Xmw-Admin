/*
 * @Description: 智能行政-活动公告-API
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-25 17:32:45
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-07 15:38:43
 */
import { request } from '@umijs/max';

import type { CreateAnnouncementProps, TableSearchProps } from '@/pages/Administrative/Announcement/utils/interface'
import type { PageResponse, Response } from '@/utils/types'

/**
 * @description: 获取活动公告列表
 * @param {TableSearchProps} options
 * @author: 白雾茫茫丶
 */
export async function getAnnouncementList(options?: TableSearchProps) {
  return request<Response<PageResponse<API.ANNOUNCEMENT>>>('/api/administrative/announcement', {
    method: 'GET',
    params: options || {},
  });
}

/**
 * @description: 创建活动公告
 * @param {CreateAnnouncementProps} options
 * @author: 白雾茫茫丶
 */
export async function createAnnouncement(options: CreateAnnouncementProps) {
  return request<Response<API.ANNOUNCEMENT>>('/api/administrative/announcement', {
    method: 'POST',
    data: options || {},
  });
}

/**
 * @description: 更新活动公告
 * @param {API.ANNOUNCEMENT} options
 * @return {*}
 * @author: 白雾茫茫丶
 */
export async function updateAnnouncement({ announcement_id, ...options }: API.ANNOUNCEMENT) {
  return request<Response<number[]>>(`/api/administrative/announcement/${announcement_id}`, {
    method: 'PUT',
    data: options || {},
  });
}

/**
 * @description: 删除活动公告
 * @param {string} announcement_id
 * @author: 白雾茫茫丶
 */
export async function delAnnouncement(announcement_id: string) {
  return request<Response<number>>(`/api/administrative/announcement/${announcement_id}`, {
    method: 'DELETE',
  });
}