import type { SearchTimes } from '@/utils/types'

/**
 * @description: FormTemplate Props
 * @Author: 白雾茫茫丶
 */
export type FormTemplateProps = {
  treeData: API.INTERNATIONALIZATION[]; // 国际化树形数据
  reloadTable: () => void; // 刷新表格
  open: boolean;
  setOpenDrawerFalse: () => void
};

/**
 * @description: 头部搜索表单 Params
 * @author: 白雾茫茫丶
 */
export type SearchParams = SearchTimes & Partial<Pick<API.INTERNATIONALIZATION, 'name'> & {
  isMenu?: boolean; // 是否是菜单数据
}>

/**
 * @description: 新增国际化字段 Params
 * @author: 白雾茫茫丶
 */
export type CreateInternationalParams = Pick<API.INTERNATIONALIZATION, 'parent_id' | 'name' | 'sort'>
  & Partial<API.LOCALESLANGAll>