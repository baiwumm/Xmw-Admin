
/**
 * @description: 表格 columns 接口定义
 * @return {*}
 * @author: Cyan
 */
export interface TableItem {
    id?: string,
    name: string,
    'zh-CN': string,
    'en-US': string,
    'ja-JP': string,
    parent_id?: string
    created_time?: Date,
    update_time?: Date,
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
    formData?: any,
    triggerDom?: any,
    parent_id?: string | undefined
}