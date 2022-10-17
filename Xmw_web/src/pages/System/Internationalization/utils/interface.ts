/**
 * @description: FormTemplate Props
 * @return {*}
 * @author: Cyan
 */
export type FormTemplateProps = {
  treeData: API.INTERNATIONALIZATION[];
  reloadTable: () => void;
  formData?: API.INTERNATIONALIZATION;
  triggerDom?: JSX.Element;
  parent_id?: string | undefined;
};
