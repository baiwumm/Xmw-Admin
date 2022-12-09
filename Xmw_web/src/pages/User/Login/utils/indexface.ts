/**
 * @description: 登录类型
 * @return {*}
 * @author: Cyan
 */
export type LoginType = 'mobile' | 'account';

/**
 * @description: 登录表单参数
 * @return {*}
 * @author: Cyan
 */
export type LoginParams = {
  type: string;
  user_name?: string;
  password?: string;
  phone?: string;
  captcha?: string;
};
