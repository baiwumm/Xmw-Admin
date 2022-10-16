/*
 * @Description: 类型枚举
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-09 15:19:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-16 10:50:38
 */

/**
 * @description: 请求状态提示语
 * @return {*}
 * @author: Cyan
 */
export enum RES_CODE {
  SUCCESS = '操作成功！',
  FAILURE = '操作失败！',
}

/**
 * @description: 请求状态码
 * @return {*}
 * @author: Cyan
 */
export const RES_CODE_MAP = {
  200: RES_CODE.SUCCESS,
  400: RES_CODE.FAILURE,
};
