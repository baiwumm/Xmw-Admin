/*
 * @Description: 智能行政-interface 接口定义
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 15:06:51
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-13 15:11:32
 */

/**
 * @description: 组织管理参数接口
 * @return {*}
 * @author: Cyan
 */
export interface SAVE_ORG_PARAMS {
    org_id?: string,
    org_name: string,
    org_code: string,
    org_type: string,
    describe?: string,
    parent_id?: string
    status: string,
    created_time?: Date,
    update_time?: Date,
    leader?: string,
    founder?: string,
}