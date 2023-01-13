import type { PaginationProps } from '@/global/interface'
/**
 * @description: FormTemplate Props
 * @return {*}
 * @author: Cyan
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
 * @return {*}
 * @author: Cyan
 */
export type UserInformationProps = {
  roleData: API.ROLEMANAGEMENT[];
  jobsData: API.JOBSMANAGEMENT[];
  organizationData: API.ORGANIZATION[];
  showLabel?: boolean;
  disabledField?: boolean
};

/**
 * @description: 头部搜索表单 Props
 * @return {*}
 * @author: Cyan
 */
export type TableSearchProps = PaginationProps & {
  user_name?: string; // 用户名称
  sex?: string; // 用户性别
  status?: string; // 用户状态
  start_time?: string; // 开始日期
  end_time?: string; // 结束日期
}

/**
 * @description: 设置用户状态 Props
 * @return {*}
 * @author: Cyan
 */
export type UserStatusProps = {
  user_id: string;
  status: number;
}
