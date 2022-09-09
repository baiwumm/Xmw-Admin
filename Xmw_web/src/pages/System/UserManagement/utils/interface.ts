/*
 * @Description: Interface 接口定义
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-09 16:58:24
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-09 17:07:08
 */

/**
 * @description: 表格 column
 * @return {*}
 * @author: Cyan
 */
export interface TableItem {
    user_id: string,
    user_name: string,
    cn_name: string,
    en_name?: string,
    work_no: string,
    age: number,
    email?: string,
    phone: string,
    avatar_url?: string,
    sex: string,
    status: string,
    token?: string,
    motto?: string,
    tag: string,
    address: string,
    jobs_id: string,
    org_id: string,
    role_id: string,
    last_ip: string,
    created_time: Date,
    update_time: Date,
    founder: string
}