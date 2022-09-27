/*
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-24 08:58:15
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-27 16:22:07
 */
/**
 * @description: FormTemplateProps
 * @return {*}
 * @author: Cyan
 */
export type FormTemplateProps = {
    treeData: API.JOBSMANAMENT[],
    orgTree:API.ORGANIZATION[],
    reloadTable: any,
    formData?: any,
    triggerDom?: any,
    parent_id?: string
}

/**
 * @description: FormTemplateItemProps
 * @return {*}
 * @author: Cyan
 */
export type FormTemplateItemProps = {
    treeData: API.JOBSMANAMENT[],
    orgTree:API.ORGANIZATION[],
    parent_id?: string
}