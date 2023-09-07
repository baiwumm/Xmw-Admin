/**
 * @description: 登录类型
 * @Author: 白雾茫茫丶
 */
export type LoginType = 'mobile' | 'account';

/**
 * @description: 登录表单参数
 * @author: 白雾茫茫丶丶
 */
export type LoginParams = {
  type: string;
  user_name?: string;
  password?: string;
  phone?: string;
  captcha?: string;
};
