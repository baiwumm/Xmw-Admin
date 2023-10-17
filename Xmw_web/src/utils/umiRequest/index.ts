/*
 * @Description: umi-Request 请求封装
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-09-06 10:12:49
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-17 09:18:19
 */
import 'nprogress/nprogress.css';

import { AxiosRequestConfig, request, RequestConfig, RequestError, RequestOptions } from '@umijs/max';
import { message, Modal } from 'antd'
import { debounce } from 'lodash-es'; // lodash 工具函数
import Nprogress from 'nprogress';

import { getLocalStorageItem, isSuccess, logoutToLogin } from '@/utils' // 全局工具函数
import { BASEURL, LOCAL_STORAGE, REQUEST_CODE } from '@/utils/enums'
import type { Response } from '@/utils/types'

/**
 * @description: 防抖函数统一处理异常错误
 * @Author: 白雾茫茫丶
 */
const debounceError = debounce((content: string, duration = 3) => {
  message.error(content, duration);
}, 300);

/**
 * @description: 运行时配置，封装统一请求
 * @doc https://umijs.org/docs/max/request
 * @author: 白雾茫茫丶
 */
const umiRequest: RequestConfig = {
  baseURL: BASEURL.API, // 请求前缀
  timeout: 30 * 1000, // 超时时间，默认 30 s
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res: Response) => {
      const { code, msg } = res;
      if (!isSuccess(code)) {
        throw new Error(msg); // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: RequestError, opts: RequestOptions) => {
      // 获取报错的响应和请求信息
      const { response, resquest } = error as any;
      // 配置 skipErrorHandler 会跳过默认的错误处理，用于项目中部分特殊的接口
      if (opts?.skipErrorHandler) throw error;
      // Axios 的错误
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      if (response) {
        const { data } = response
        switch (data.code) {
          // token令牌校验，如果出现这个返回码则退出登录到登录页面
          case REQUEST_CODE.UNAUTHORIZED:
            // 这里加一个防抖
            Modal.success({
              title: '登录已失效,请重新登录!',
              content: data.msg,
              onOk: () => {
                // 退出登录返回到登录页
                logoutToLogin()
                Modal.destroyAll();
              },
            });
            break;
          default:
            debounceError(response.data.msg || '服务器内部发生错误！');
        }
      } else if (resquest) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        debounceError('请求未成功,请重新尝试！');
      } else {
        // 发送请求时出了点问题
        debounceError('请求出错,请重新尝试！');
      }
    },
  },
  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 获取 ACCESS_TOKEN
      const ACCESS_TOKEN = getLocalStorageItem<string>(LOCAL_STORAGE.ACCESS_TOKEN)
      // 判断是否登录存在token，有就请求头携带token
      if (ACCESS_TOKEN && config?.headers) {
        config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`
      }
      // 进度条开始
      Nprogress.start();
      return { ...config };
    },
  ],
  // 响应拦截器
  responseInterceptors: [
    [
      // 响应处理
      (response) => {
        // 拦截响应数据，进行个性化处理
        const { data } = response as Response<any>;
        // 根据返回状态码，统一处理，需要前端和后端沟通确认
        switch (data.code) {
          // 成功发起请求并成功处理，一般用于数据库字段校验
          case REQUEST_CODE.NOSUCCESS:
            debounceError(JSON.stringify(data.msg));
            break;
          // 成功发起请求，但是内部处理出现错误
          case REQUEST_CODE.BADREQUEST:
            debounceError(JSON.stringify(data.msg));
            break;
          // 登录信息失效
          case REQUEST_CODE.UNAUTHORIZED:
            // 退出登录返回到登录页
            logoutToLogin()
            Modal.destroyAll();
            break;
        }
        // 进度条结束
        Nprogress.done();
        return response;
      },
      // 错误处理
      (error: RequestError) => {
        // 进度条结束
        Nprogress.done();
        return Promise.reject(error)
      },
    ],
  ],
}

/**
 * @description: 导出封装的请求方法
 */
export const httpRequest = {
  get<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Response<T>> {
    return request(url, { method: 'GET', params: data, ...config });
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Response<T>> {
    return request(url, { method: 'POST', data, ...config });
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Response<T>> {
    return request(url, { method: 'PUT', data, ...config });
  },

  delete<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Response<T>> {
    return request(url, { method: 'DELETE', data, ...config });
  },

  patch<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Response<T>> {
    return request(url, { method: 'PATCH', data, ...config });
  },
}

export default umiRequest