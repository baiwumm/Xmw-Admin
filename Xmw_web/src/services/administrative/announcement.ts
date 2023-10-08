/*
 * @Description: 智能行政-活动公告-API
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-25 17:32:45
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-07 17:42:30
 */
import { ROUTES } from '@/utils/enums'
import type { PageResponse } from '@/utils/types'
import type {
  AlreadyParams,
  CreateAnnouncementProps,
  PinnedParams,
  SearchParams,
} from '@/utils/types/administrative/announcement'
import { httpRequest } from '@/utils/umiRequest'

const baseURL = ROUTES.ANNOUNCEMENT

/**
 * @description: 获取活动公告列表
 * @param {SearchParams} options
 * @author: 白雾茫茫丶
 */
export async function getAnnouncementList(options?: SearchParams) {
  return httpRequest.get<PageResponse<API.ANNOUNCEMENT>>(`${baseURL}`, options);
}

/**
 * @description: 创建活动公告
 * @param {CreateAnnouncementProps} options
 * @author: 白雾茫茫丶
 */
export async function createAnnouncement(options: CreateAnnouncementProps) {
  return httpRequest.post<API.ANNOUNCEMENT>(`${baseURL}`, options);
}

/**
 * @description: 更新活动公告
 * @param {API.ANNOUNCEMENT} options
 * @author: 白雾茫茫丶
 */
export async function updateAnnouncement({ announcement_id, ...options }: API.ANNOUNCEMENT) {
  return httpRequest.put<number[]>(`${baseURL}/${announcement_id}`, options);
}

/**
 * @description: 删除活动公告
 * @param {string} announcement_id
 * @author: 白雾茫茫丶
 */
export async function delAnnouncement(announcement_id: string) {
  return httpRequest.delete<number>(`${baseURL}/${announcement_id}`);
}

/**
 * @description: 设置是否置顶状态
 * @param {Data} options
 * @Author: 白雾茫茫丶
 */
export async function setPinned({ announcement_id, pinned }: PinnedParams) {
  return httpRequest.patch<number[]>(`${baseURL}/${announcement_id}`, { pinned });
}

/**
 * @description: 公告已读
 * @param {AlreadyParams} options
 * @Author: 白雾茫茫丶
 */
export async function announcementAlready(options: AlreadyParams) {
  return httpRequest.post<API.ALREADY>(`${baseURL}/already`, options);
}

/**
 * @description: 已读次数
 * @param {AlreadyParams} options
 * @Author: 白雾茫茫丶
 */
export async function incrementAlreadyCount(options: AlreadyParams) {
  return httpRequest.post<number[]>(`${baseURL}/incrementAlreadyCount`, options);
}