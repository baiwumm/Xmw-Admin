/*
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-24 08:58:15
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-04 14:00:46
 */

/**
 * @description: FormTemplate Props
 * @author: 白雾茫茫丶丶
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
 * @author: 白雾茫茫丶丶
 */
export type FormTemplateItemProps = {
  treeData: API.JOBSMANAGEMENT[]; // 岗位树形数据
  orgTree: API.ORGANIZATION[]; // 组织树形数据
  userList: API.USERMANAGEMENT[]; // 用户列表
  parent_id?: string; // 父级id
};

/**
 * @description: 头部搜索表单 Params 
 * @author: 白雾茫茫丶丶
 */
export type SearchParams = {
  jobs_id?: string; // 岗位id
  org_id?: string; // 所属组织
  start_time?: string; // 开始日期
  end_time?: string; // 结束日期
}

/**
 * @description: 新增岗位 Params 
 * @author: 白雾茫茫丶丶
 */
export type CreateJobsParams = {
  parent_id?: string; // 父级id
  jobs_name: string; // 岗位名称
  org_id: string; // 所属组织
  sort: number; // 排序
  describe: string; // 岗位描述
}