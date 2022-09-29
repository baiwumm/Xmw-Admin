/**
 * @description: FormTemplate Props
 * @return {*}
 * @author: Cyan
 */
export type FormTemplateProps = {
  treeData: API.MENUMANAGEMENT[];
  reloadTable: any;
  formData?: any;
  triggerDom?: any;
  parent_id?: string | undefined;
  menuData: API.INTERNATIONALIZATION[];
};

/**
 * @description: FormItem Props
 * @return {*}
 * @author: Cyan
 */
export type FormItemProps = {
  treeData: API.MENUMANAGEMENT[];
  parent_id: string | undefined;
  menuData: API.INTERNATIONALIZATION[];
};
