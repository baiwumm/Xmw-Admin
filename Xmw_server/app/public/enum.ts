/*
 * @Description: 类型枚举
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-09 15:19:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-14 14:39:42
 */

/**
 * @description: 请求状态
 * @return {*}
 * @author: Cyan
 */
export const RES_STATUS = {
    CUSTOM: -1,  // 自定义状态，用于处理一些特殊的结果
    SUCCESS: 1, // 请求成功
    FAILURE: 2, // 请求失败
}

/**
 * @description: 请求状态提示语
 * @return {*}
 * @author: Cyan
 */
export const RES_STATUS_TEXT = {
    [RES_STATUS.SUCCESS]: '请求成功！',
    [RES_STATUS.FAILURE]: '请求失败！'
}

/**
 * @description: 请求状态码
 * @return {*}
 * @author: Cyan
 */
export const RES_STATUS_CODE = {
    [RES_STATUS.CUSTOM]: -1,
    [RES_STATUS.SUCCESS]: 200,
    [RES_STATUS.FAILURE]: 400
}