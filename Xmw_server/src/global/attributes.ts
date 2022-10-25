/*
 * @Description: sequelize 实体模型 models
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-24 13:37:21
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-24 15:05:54
 */
/**
 * @description: xmw_organization Attributes
 * @return {*}
 * @author: Cyan
 */
export interface orgAttributes {
  org_id: string;
  org_name: string;
  org_code: string;
  org_type: string;
  parent_id?: string;
  leader?: string;
  describe: string;
  founder?: string;
  sort: number;
  children?: orgAttributes[];
}

/**
 * @description: xmw_jobs Attributes
 * @return {*}
 * @author: Cyan
 */
export interface jobsAttributes {
  jobs_id: string;
  jobs_name: string;
  org_id: string;
  parent_id?: string;
  leader?: string;
  describe: string;
  founder?: string;
  sort: number;
  children?: jobsAttributes[];
}

/**
 * @description: xmw_international Attributes
 * @return {*}
 * @author: Cyan
 */
export interface internationalAttributes {
  id: string;
  name: string;
  'zh-CN'?: string;
  'en-US'?: string;
  'ja-JP'?: string;
  'zh-TW'?: string;
  parent_id?: string;
  founder?: string;
  sort: number;
  children?: internationalAttributes[];
}
