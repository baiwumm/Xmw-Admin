/**
 * @description: FormTemplate Props
 * @return {*}
 * @author: Cyan
 */
export type FormTemplateProps = {
  treeData: API.ORGANIZATION[], // 组织树形数据
  reloadTable: () => void, // 刷新表格
  formData?: API.ORGANIZATION,
  triggerDom?: JSX.Element,
  parent_id?: string
}

/**
 * @description: 头部搜索表单 Props
 * @return {*}
 * @author: Cyan
 */
export type TableSearchProps = {
  org_name?: string; // 组织名称
  org_code?: string; // 组织编码
  org_type?: string; // 组织类型
  start_time?: string; // 开始日期
  end_time?: string; // 结束日期
}

/**
 * @description: 新增组织 Props
 * @return {*}
 * @author: Cyan
 */
export type CreateOrgProps = {
  parent_id?: string; // 父级id
  org_name: string; // 组织名称
  org_type: string; // 组织编码
  status: number; // 组织状态
  sort: number; // 排序
  describe: string; // 组织描述
}
