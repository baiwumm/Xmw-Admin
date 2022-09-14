import { ReactNode } from "react"

/**
 * @description: 表格 columns 接口定义
 * @return {*}
 * @author: Cyan
 */
export interface TableItem {
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
    children?: TableItem[]
}


/**
 * @description: FormTemplate Props
 * @return {*}
 * @author: Cyan
 */
export interface FormTemplateProps {
    treeData: TableItem[],
    reloadTable: any,
    formData?: TableItem,
    triggerDom?: ReactNode
}