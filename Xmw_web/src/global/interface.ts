/*
 * @Description: 公共 interface 接口定义
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:14:06
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-18 11:00:28
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
export type PageResModel = {
  total: number;
  list: ResData[];
};

/**
 * @description: Response 返回体，默认是不分页，如果是分页查询，需要自己将 Model 带入
 * @return {*}
 * @author: Cyan
 */
export type ResponseModel<T = ResData[]> = {
  code?: number;
  data: T | PageResModel | ResData;
  msg?: string;
  success?: boolean;
};

/**
 * @description: 渲染label
 * @return {*}
 * @author: Cyan
 */
export type RenderLable = {
  value: string | number;
  label: string;
};
