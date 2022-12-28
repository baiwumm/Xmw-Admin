/**
 * @description: FormTemplate Props
 * @return {*}
 * @author: Cyan
 */
export type FormTemplateProps = {
  treeData: API.INTERNATIONALIZATION[]; // 国际化树形数据
  reloadTable: () => void; // 刷新表格
  formData?: API.INTERNATIONALIZATION; // 表单数据
  parent_id?: string; // 父级id
  open: boolean;
  setOpenDrawerFalse: () => void
};

/**
 * @description: 头部搜索表单 Props
 * @return {*}
 * @author: Cyan
 */
export type TableSearchProps = {
  name?: string; // 国际化字段
  isMenu?: boolean; // 是否是菜单数据
  start_time?: string; // 开始日期
  end_time?: string; // 结束日期
}

/**
 * @description: 新增国际化字段 Props
 * @return {*}
 * @author: Cyan
 */
export type CreateInternationalProps = {
  parent_id?: string; // 父级id
  name: string; // 国际化字段
  'zh-CN'?: string; // 中文
  'en-US'?: string; // 英文
  'ja-JP'?: string; // 日文
  'zh-TW'?: string; // 繁体中文
  sort: number; // 排序
}