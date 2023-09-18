import { PaginationParams, SearchTimes } from '@/utils/types'
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
export type SearchParams = PaginationParams & SearchTimes & Pick<API.USERMANAGEMENT, 'user_name' | 'sex' | 'status'>

/**
 * @description: 设置用户状态 Props
 * @author: 白雾茫茫丶
 */
export type UserStatusProps = Pick<API.USERMANAGEMENT, 'user_id' | 'status'>
