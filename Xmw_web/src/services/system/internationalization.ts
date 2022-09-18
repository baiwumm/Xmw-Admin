/*
 * @Description: 系统设置-国际化模块接口
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-18 12:03:39
 */
import { request } from '@umijs/max';
import { Data, Result } from '@/global/interface'


/**
 * @description:  获取国际化列表
 * @param {object} options
 * @return {*}
 * @author: Cyan
 */
export async function getInternationalList(options?: Data) {
    return request<Result>('/api/system/getInternationalList', {
        method: 'GET',
        params: options || {},
    });
}

/**
 * @description:  获取国际化多语言层级对象
 * @param {object} options
 * @return {*}
 * @author: Cyan
 */
export async function getAllLocalesLang(options?: Data) {
    return request<Result>('/api/system/getAllLocalesLang', {
        method: 'GET',
        params: options || {},
    });
}

/**
 * @description: 保存国际化数据
 * @param {Data} options
 * @return {*}
 * @author: Cyan
 */
export async function saveInternational(options?: Data) {
    return request<Result>('/api/system/saveInternational', {
        method: 'POST',
        data: options || {},
    });
}

/**
 * @description: 删除国际化列表
 * @param {Data} id
 * @return {*}
 * @author: Cyan
 */
export async function delInternational(id: string) {
    return request<Result>('/api/system/delInternational', {
        method: 'POST',
        data: { id },
    });
}