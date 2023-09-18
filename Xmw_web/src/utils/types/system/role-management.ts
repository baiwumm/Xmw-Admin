import type { PaginationParams, SearchTimes } from '@/utils/types'
/**
 * @description: FormTemplate Props
 * @Author: 白雾茫茫丶
 */
export type FormTemplateProps = {
  menuData: API.MENUMANAGEMENT[];
  reloadTable: () => void; // 刷新表格
  formData?: API.ROLEMANAGEMENT;
  open: boolean;
  setOpenDrawerFalse: () => void
};

/**
 * @description: 头部搜索表单 Params
 * @author: 白雾茫茫丶
 */
export type SearchParams = PaginationParams &
  SearchTimes & Pick<API.ROLEMANAGEMENT, 'role_name' | 'role_code' | 'status'>

/**
 * @description: 设置角色状态 Params
 * @author: 白雾茫茫丶
 */
export type RoleStatusParams = Pick<API.ROLEMANAGEMENT, 'role_id' | 'status'>
