/*
 * @Description: Administrative Attributes
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-27 10:12:33
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-08-25 16:16:04
 */
/**
 * @description: xmw_organization Attributes
 * @return {*}
 * @author: Cyan
 */
export type OrgAttributes = {
  org_id: string; // 组织id
  org_name: string; // 组织名称
  org_code: string; // 组织编码
  org_type: string; // 组织类型
  parent_id?: string; // 父级id
  leader?: string; // 组织负责人
  describe: string; // 组织描述
  founder?: string; // 创建人
  sort: number; // 排序
  status: number; // 组织状态
  created_time?: Date; // 创建时间
  updated_time?: Date; // 最后一次更新时间
  children?: OrgAttributes[];
};

/**
 * @description: xmw_jobs Attributes
 * @return {*}
 * @author: Cyan
 */
export type JobsAttributes = {
  jobs_id: string; // 岗位id
  jobs_name: string; // 岗位名称
  org_id: string; // 所属组织id
  parent_id?: string; // 父级id
  leader?: string; // 岗位负责人
  describe: string; // 岗位描述
  founder?: string; // 创建人
  sort: number; // 排序
  created_time?: Date; // 创建时间
  updated_time?: Date; // 最后一次更新时间
  children?: JobsAttributes[];
};

/**
 * @description: xmw_announcement Attributes
 * @return {*}
 * @author: 白雾茫茫丶
 */
export type AnnouncementAttributes = {
  announcement_id: string; // id 主键
  user_id: string; // 作者 id
  title: string; // 标题
  content: string; // 正文内容
  type: string; // 类型
  status: number; // 状态
  pinned: number; // 是否置顶
  readCounts: number; // 阅读次数
};
