/*
 * @Description: 系统设置-用户管理模块接口
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-13 08:49:19
 */
import { request } from '@umijs/max';
import { Data, Result } from '@/global/interface'


/**
 * @description:  获取用户列表
 * @param {object} options
 * @return {*}
 * @author: Cyan
 */
export async function getUserList(options?: Data) {
    return request<Result>('/api/system/getUserList', {
        method: 'GET',
        params: options || {},
    });
}