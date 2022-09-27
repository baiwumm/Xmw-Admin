/**
 * @description: FormTemplate Props
 * @return {*}
 * @author: Cyan
 */
export type FormTemplateProps = {
    treeData: API.ORGANIZATION[],
    reloadTable: any,
    formData?: any,
    triggerDom?: any,
    parent_id?: string | undefined
}