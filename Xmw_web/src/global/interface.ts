/*
 * @Description: 公共 interface 接口定义
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:14:06
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-28 10:37:29
 */

/**
 * @description: 动态对象属性
 * @return {*}
 * @author: Cyan
 */
export type ResData = Record<string, any>;

/**
 * @description: 分页查询
 * @return {*}
 * @author: Cyan
 */
export type PageResModel<T> = {
  total: number;
  list: T[];
};

/**
 * @description: Response 返回体，默认是不分页，如果是分页查询，需要自己将 Model 带入
 * @return {*}
 * @author: Cyan
 */
export type ResponseModel<T> = {
  code?: number;
  data: T;
  msg?: string;
};

/**
 * @description: 默认分页查询参数
 * @return {*}
 * @author: Cyan
 */
export type PaginationProps = {
  current: number; // 当前页码
  pageSize: number; // 每页条数
}