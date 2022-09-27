/*
 * @Description: 接口数据类型定义
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-23 10:23:23
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-27 10:19:19
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

    type MENUMANAGEMENT = {
        menu_id:string,
        name?:string
        path?:string
        icon?:string
        component?:string,
        redirect?:string,
        parent_id:string,
        sort:number,
        founder?:string,
        status:string,
        target?:string
        permission:string,
        access:string,
        menu_type:string,
        layout?:string,
        hideChildrenInMenu?:string,
        hideInMenu?:string,
        hideInBreadcrumb?:string,
        headerRender?:string,
        footerRender?:string,
        menuRender?:string,
        menuHeaderRender?:string,
        flatMenu?:string,
        fixedHeader?:string,
        fixSiderbar?:string,
        navTheme?:string,
        headerTheme?:string,
        created_time?: Date,
        update_time?: Date,
        routes?:MENUMANAGEMENT[]
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