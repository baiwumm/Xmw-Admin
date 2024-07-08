/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-08 14:09:56
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-08 14:11:30
 * @Description: 公共模块
 */
import { httpRequest } from '@/utils/umiRequest'

/**
 * @description: 获取掘金文章列表
 */
export const getJuejinArticleList = (options) => httpRequest.post('/common/juejin', options);