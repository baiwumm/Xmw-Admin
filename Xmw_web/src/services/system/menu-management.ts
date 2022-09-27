/*
 * @Description: 系统设置-菜单管理-API
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-26 17:58:48
 */
import { request } from '@umijs/max';
import { Data, Result } from '@/global/interface'


/**
 * @description:  获取菜单列表
 * @param {object} options
 * @return {*}
 * @author: Cyan
 */
export async function getMenuList(options?: Data) {
    return request<Result>('/api/system/getMenuList', {
        method: 'GET',
        params: options || {},
    });
}

/**
 * @description: 保存菜单数据
 * @param {Data} options
 * @return {*}
 * @author: Cyan
 */
export async function saveMenu(options?: Data) {
    return request<Result>('/api/system/saveMenu', {
        method: 'POST',
        data: options || {},
    });
}

/**
 * @description: 删除菜单列表
 * @param {Data} menu_id
 * @return {*}
 * @author: Cyan
 */
export async function delMenu(menu_id: string) {
    return request<Result>('/api/system/delMenu', {
        method: 'POST',
        data: { menu_id },
    });
}