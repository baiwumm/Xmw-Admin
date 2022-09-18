/*
 * @Description: 
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-18 11:10:32
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-18 12:17:35
 */
export interface LangModel {
    id: string,
    name: string,
    'zh-CN'?: string,
    'en-US'?: string,
    'ja-JP'?: string,
    'zh-TW'?: string,
    parent_id?: string,
    founder?: string,
    created_time: Date,
    update_time?: Date,
    children?: LangModel[]
}