/*
 * @Description: 全局枚举文件
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 09:00:41
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-08 17:34:27
 */
/**
 * @description: 请求状态码
 * @return {*}
 * @author: Cyan
 */
export const HTTP_CODES = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * @description: 全局状态配置项
 * @return {*}
 * @author: Cyan
 */
export const APP_STATUS = {
  0: '禁用',
  1: '正常',
};

export const APP_STATUS_OPTS = [
  {
    label: '正常',
    value: '1',
  },
  {
    label: '禁用',
    value: '0',
  },
];

export const APP_FLAG = {
  0: '否',
  1: '是',
};

export const APP_FLAG_OPTS = [
  {
    label: '是',
    value: 1,
  },
  {
    label: '否',
    value: 0,
  },
];

export const APP_SEX = {
  0: '否',
  1: '是',
};

export const APP_SEX_OPTS = [
  {
    label: '男',
    value: 1,
  },
  {
    label: '女',
    value: 0,
  },
];
