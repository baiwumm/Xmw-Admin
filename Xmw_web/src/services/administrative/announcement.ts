/*
 * @Description: 智能行政-活动公告-API
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-25 17:32:45
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-26 17:19:03
 */
import { ROUTES } from '@/utils/enums'
import type { PageResponse } from '@/utils/types'
import type {
  AlreadyParams,
  AnnouncementType,
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
export const getAnnouncementList = (options?: SearchParams) =>
  httpRequest.get<PageResponse<API.ANNOUNCEMENT>>(`${baseURL}`, options);

/**
 * @description: 创建活动公告
 * @param {CreateAnnouncementProps} options
 * @author: 白雾茫茫丶
 */
export const saveAnnouncement = (options: CreateAnnouncementProps) =>
  httpRequest.post<API.ANNOUNCEMENT | number[]>(`${baseURL}`, options);

/**
 * @description: 删除活动公告
 * @param {string} announcement_id
 * @author: 白雾茫茫丶
 */
export const delAnnouncement = (announcement_id: string) => httpRequest.delete<number>(`${baseURL}/${announcement_id}`);

/**
 * @description: 设置是否置顶状态
 * @param {Data} options
 * @Author: 白雾茫茫丶
 */
export const setPinned = ({ announcement_id, pinned }: PinnedParams) =>
  httpRequest.patch<number[]>(`${baseURL}/${announcement_id}`, { pinned });

/**
 * @description: 公告已读
 * @param {AlreadyParams} options
 * @Author: 白雾茫茫丶
 */
export const announcementAlready = (options: AlreadyParams) =>
  httpRequest.post<API.ALREADY>(`${baseURL}/already`, options);

/**
 * @description: 查询不同消息类型的未读条数
 * @Author: 白雾茫茫丶
 */
export const queryUnreadyCount = () => httpRequest.get<Record<AnnouncementType, number>>(`${baseURL}/unready`);