/*
 * @Description: 接口数据类型定义
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-23 10:23:23
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-23 13:53:20
 */
declare namespace API {
    /**
     * @description: 智能行政-组织管理
     * @return {*}
     * @author: Cyan
     */
    type ORGANIZATION = {
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
        children?: ORGANIZATION[]
    }

    /**
     * @description: 智能行政-岗位管理
     * @return {*}
     * @author: Cyan
     */
    type JOBSMANAMENT = {
        jobs_id?: string,
        jobs_name: string,
        org_id: string,
        describe?: string,
        parent_id?: string
        created_time?: Date,
        update_time?: Date,
        leader?: string,
        founder?: string,
        children?: JOBSMANAMENT[]
    }

    /**
     * @description: 系统设置-国际化
     * @return {*}
     * @author: Cyan
     */
    type INTERNATIONALIZATION = {
        id?: string,
        name: string,
        'zh-CN': string,
        'en-US': string,
        'ja-JP': string,
        parent_id?: string
        created_time?: Date,
        update_time?: Date,
        founder?: string,
        children?: INTERNATIONALIZATION[]
    }
}