/**
 * @description: FormTemplate Props
 * @return {*}
 * @author: Cyan
 */
export interface FormTemplateProps {
    treeData: API.JOBSMANAMENT[],
    orgTree:API.ORGANIZATION[],
    reloadTable: any,
    formData?: any,
    triggerDom?: any,
    parent_id?: string | undefined
}