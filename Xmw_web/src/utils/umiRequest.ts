/*
 * @Description: umi-Request 请求封装
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 08:52:20
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-13 18:12:40
 */
// 引入第三方库
import type { RequestOptions } from '@@/plugin-request/request'; // 请求配置项
import type { RequestConfig } from '@umijs/max';
import { message } from 'antd'; // antd 组件库
import { debounce } from 'lodash' // lodash 工具函数
import { HTTP_CODES } from '@/global/enum' // 请求状态码
// import { Result as ResponseStructure } from '@/global/interface' // 与后端约定的响应数据格式

/**
 * @description: 防抖函数统一处理异常错误
 * @param {*} debounce
 * @return {*}
 * @author: Cyan
 */
const authError = debounce((content, duration = 3, status = 'error') => {
    message[status](content, duration)
}, 1000);

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
    // 错误处理： umi@3 的错误处理方案。
    errorConfig: {
        // 错误抛出
        errorThrower: (res) => {
            console.log('抛出错误。。。。')
        },
        /**
         * @description: 
         * @param {any} error:错误信息
         * @param {any} opts:请求配置项，在service层配置
         * @return {*}
         * @author: Cyan
         */
        errorHandler: (error: any, opts: any) => {
            console.log(error, opts)
            // 获取报错的响应和请求信息
            const { response, resquest } = error
            // 配置 skipErrorHandler 会跳过默认的错误处理，用于项目中部分特殊的接口
            if (opts?.skipErrorHandler) throw error;
            if (response) {
                // Axios 的错误
                // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
                authError(HTTP_CODES[error.response.status])
            } else if (resquest) {
                // 请求已经成功发起，但没有收到响应
                // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
                // 而在node.js中是 http.ClientRequest 的实例
                authError('请求未成功,请重新尝试！')
            } else {
                // 发送请求时出了点问题
                authError('请求出错,请重新尝试！')
            }
        },
    },

    // 请求拦截器
    requestInterceptors: [
        (config: RequestOptions) => {
            // 拦截请求配置，进行个性化处理。
            // const url = config?.url?.concat('?token = 123');
            return { ...config };
        },
    ],

    // 响应拦截器
    responseInterceptors: [
        (response) => {
            // 拦截响应数据，进行个性化处理
            const { data } = response as any;
            // 根据返回状态码，统一处理，需要前端和后端沟通确认
            switch (data.resCode) {
                // 成功发起请求并成功处理，一般用于更新数据时判断某个字段是否已存在
                case -1:
                    authError(data.resMsg)
                    break;
                // 成功发起请求，但是内部处理出现错误
                case 400:
                    authError(data.resMsg)
                    break;
            }
            return response;
        },
    ],
};
