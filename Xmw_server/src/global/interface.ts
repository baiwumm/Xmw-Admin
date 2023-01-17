/*
 * @Description: TS Model
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-14 10:38:37
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-17 14:14:19
 */
import { UserAttributes } from '@/attributes/system';

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
  list: T;
};

/**
 * @description: Response 返回体，默认是不分页，如果是分页查询，需要自己将 Model 带入
 * @return {*}
 * @author: Cyan
 */
export type ResponseModel<T = ResData[]> = {
  code?: number;
  data: T;
  msg?: string;
};

/**
 * @description: Session 存储对象
 * @return {*}
 * @author: Cyan
 */
export type SessionModel = {
  currentUserInfo: UserAttributes; // 用户信息
  verifyCode: string; // 验证码
};
