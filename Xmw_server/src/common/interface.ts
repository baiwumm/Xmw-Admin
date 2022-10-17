/*
 * @Description: TS Model
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-14 10:38:37
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-17 10:39:22
 */

/**
 * @description: 动态对象属性
 * @return {*}
 * @author: Cyan
 */
export type Data = Record<string, any>;

/**
 * @description: 分页查询
 * @return {*}
 * @author: Cyan
 */
export type PageResModel = {
  total: number;
  data: Data[];
};

/**
 * @description: Response 返回体，默认是不分页，如果是分页查询，需要自己将 Model 带入
 * @return {*}
 * @author: Cyan
 */
export type ResponseModel<T = Data[]> = {
  code?: number;
  data: T;
  msg?: string;
  success?: boolean;
};

/**
 * @description: 国际化
 * @return {*}
 * @author: Cyan
 */
export type LangModel = {
  id: string;
  name: string;
  'zh-CN'?: string;
  'en-US'?: string;
  'ja-JP'?: string;
  'zh-TW'?: string;
  parent_id?: string;
  founder?: string;
  created_time: Date;
  update_time?: Date;
  children?: LangModel[];
};
