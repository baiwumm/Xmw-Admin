/*
 * @Description: TS Model
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-14 10:38:37
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-14 11:20:51
 */

/**
 * @description: Response 返回体
 * @return {*}
 * @author: Cyan
 */
export type ResponseModel = {
  code: number;
  data: any;
  msg: string;
  success: boolean;
};
