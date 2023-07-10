/*
 * @Description: 全局枚举文件
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 09:00:41
 * @LastEditors: Cyan
 * @LastEditTime: 2023-07-10 15:21:19
 */

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
    value: 1,
  },
  {
    label: '禁用',
    value: 0,
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
  0: '女',
  1: '男',
};

export const APP_SEX_OPTS = [
  {
    label: '男',
    value: '1',
  },
  {
    label: '女',
    value: '0',
  },
  {
    label: '保密',
    value: '2',
  },
];
