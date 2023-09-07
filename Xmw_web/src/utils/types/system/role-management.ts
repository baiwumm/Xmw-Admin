import type { PaginationParams } from '@/utils/types'
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
 * @author: 白雾茫茫丶丶
 */
export type SearchParams = PaginationParams & {
  role_name?: string; // 角色名称
  role_code?: string; // 角色编码
  status?: string; // 角色状态
  start_time?: string; // 开始日期
  end_time?: string; // 结束日期
}

/**
 * @description: 设置角色状态 Params
 * @author: 白雾茫茫丶丶
 */
export type RoleStatusProps = {
  role_id: string;
  status: number;
}
