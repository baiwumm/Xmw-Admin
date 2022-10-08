/*
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-24 08:58:15
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-30 10:38:07
 */
/**
 * @description: FormTemplateProps
 * @return {*}
 * @author: Cyan
 */
export type FormTemplateProps = {
  treeData: API.JOBSMANAGEMENT[];
  orgTree: API.ORGANIZATION[];
  reloadTable: any;
  formData?: any;
  triggerDom?: any;
  parent_id?: string;
};

/**
 * @description: FormTemplateItemProps
 * @return {*}
 * @author: Cyan
 */
export type FormTemplateItemProps = {
  treeData: API.JOBSMANAGEMENT[];
  orgTree: API.ORGANIZATION[];
  parent_id?: string;
};
