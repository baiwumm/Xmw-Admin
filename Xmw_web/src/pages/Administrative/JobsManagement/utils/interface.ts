/*
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-24 08:58:15
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-28 15:04:40
 */

/**
 * @description: FormTemplate Props
 * @return {*}
 * @author: Cyan
 */
export type FormTemplateProps = {
  treeData: API.JOBSMANAGEMENT[]; // 岗位树形数据
  orgTree: API.ORGANIZATION[]; // 组织树形数据
  userList: API.USERMANAGEMENT[]; // 用户列表
  reloadTable: () => void; // 表格刷新
  formData?: API.JOBSMANAGEMENT; // 表单数据
  parent_id?: string; // 父级id
  open: boolean;
  setOpenDrawerFalse: () => void
};

/**
 * @description: FormTemplateItem Props
 * @return {*}
 * @author: Cyan
 */
export type FormTemplateItemProps = {
  treeData: API.JOBSMANAGEMENT[]; // 岗位树形数据
  orgTree: API.ORGANIZATION[]; // 组织树形数据
  userList: API.USERMANAGEMENT[]; // 用户列表
  parent_id?: string; // 父级id
};

/**
 * @description: 头部搜索表单 Props
 * @return {*}
 * @author: Cyan
 */
export type TableSearchProps = {
  jobs_id?: string; // 岗位id
  org_id?: string; // 所属组织
  start_time?: string; // 开始日期
  end_time?: string; // 结束日期
}

/**
 * @description: 新增岗位 Props
 * @return {*}
 * @author: Cyan
 */
export type CreateJobsProps = {
  parent_id?: string; // 父级id
  jobs_name: string; // 岗位名称
  org_id: string; // 所属组织
  sort: number; // 排序
  describe: string; // 岗位描述
}