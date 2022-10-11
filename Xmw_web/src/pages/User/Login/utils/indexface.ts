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
  loginType: string;
  user_name?: string;
  paddword?: string;
  phone?: string;
};
