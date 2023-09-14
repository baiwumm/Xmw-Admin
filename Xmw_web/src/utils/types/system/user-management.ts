import { PaginationParams } from '@/utils/types'
/**
 * @description: FormTemplate Props
 * @Author: 白雾茫茫丶
 */
export type FormTemplateProps = {
  roleData: API.ROLEMANAGEMENT[];
  jobsData: API.JOBSMANAGEMENT[];
  organizationData: API.ORGANIZATION[];
  reloadTable: () => void;
  setModalVisibleFalse: () => void;
  formData: API.USERMANAGEMENT | undefined;
  modalVisible: boolean;
};

/**
 * @description: UserInformation Props
 * @author: 白雾茫茫丶
 */
export type UserInformationProps = {
  roleData: API.ROLEMANAGEMENT[];
  jobsData: API.JOBSMANAGEMENT[];
  organizationData: API.ORGANIZATION[];
  showLabel?: boolean;
  disabledField?: boolean
};

/**
 * @description: 头部搜索表单 Params
 * @author: 白雾茫茫丶
 */
export type SearchParams = PaginationParams & {
  user_name?: string; // 用户名称
  sex?: string; // 用户性别
  status?: string; // 用户状态
  start_time?: string; // 开始日期
  end_time?: string; // 结束日期
}

/**
 * @description: 设置用户状态 Props
 * @author: 白雾茫茫丶
 */
export type UserStatusProps = {
  user_id: string;
  status: number;
}
