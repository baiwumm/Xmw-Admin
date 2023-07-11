/*
 * @Description: umi-Request 请求封装
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 08:52:20
 * @LastEditors: Cyan
 * @LastEditTime: 2023-07-10 15:16:45
 */
// 引入第三方库
import 'nprogress/nprogress.css';

import type { RequestConfig } from '@umijs/max';
import { message, Modal } from 'antd'; // antd 组件库
import { debounce } from 'lodash-es'; // lodash 工具函数
import Nprogress from 'nprogress';

import type { AppLocalCacheModel, ResponseModel } from '@/global/interface'
import { CACHE_KEY, logoutToLogin } from '@/utils' // 全局工具函数
import type { RequestError, RequestOptions } from '@@/plugin-request/request'; // 请求配置项
/**
 * @description: 防抖函数统一处理异常错误
 * @param {*} debounce
 * @return {*}
 * @author: Cyan
 */
const authError = debounce((content: string, duration = 3) => {
  message.error(content, duration);
}, 300);

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    /**
     * @description:
     * @param {any} error:错误信息
     * @param {any} opts:请求配置项，在service层配置
     * @return {*}
     * @author: Cyan
     */
    errorHandler: (error: RequestError, opts: RequestOptions): void => {
      // 获取报错的响应和请求信息
      const { response, resquest } = error;
      // 配置 skipErrorHandler 会跳过默认的错误处理，用于项目中部分特殊的接口
      if (opts?.skipErrorHandler) throw error;
      // Axios 的错误
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      if (response) {
        const { data } = response
        switch (data.code) {
          // token令牌校验，如果出现这个返回码则退出登录到登录页面
          case 401:
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
            authError(response.data.msg || '服务器内部发生错误！');
        }
      } else if (resquest) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        authError('请求未成功,请重新尝试！');
      } else {
        // 发送请求时出了点问题
        authError('请求出错,请重新尝试！');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 获取 localstorage key
      const appCache: AppLocalCacheModel = JSON.parse(window.localStorage.getItem(CACHE_KEY) || '{}')
      // 判断是否登录存在token，有就请求头携带token
      if (appCache?.ACCESS_TOKEN && config?.headers) {
        config.headers.Authorization = `Bearer ${appCache.ACCESS_TOKEN}`
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
        const { data } = response as ResponseModel<any>;
        // 根据返回状态码，统一处理，需要前端和后端沟通确认
        switch (data.code) {
          // 成功发起请求并成功处理，一般用于数据库字段校验
          case -1:
            authError(JSON.stringify(data.msg));
            break;
          // 成功发起请求，但是内部处理出现错误
          case 400:
            authError(JSON.stringify(data.msg));
            break;
          // 登录信息失效
          case 401:
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
};
