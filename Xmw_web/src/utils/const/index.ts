/*
 * @Description: 全局常量数据
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-09-06 13:37:18
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-07 15:42:20
 */
// 引入antd多语言配置
import type { Locale } from 'antd/es/locale'
import enus from 'antd/es/locale/en_US';
import jajp from 'antd/es/locale/ja_JP';
import zhcn from 'antd/es/locale/zh_CN';
import zhtw from 'antd/es/locale/zh_TW';

import { FLAG, SEX, STATUS } from '@/utils/enums'
import { LANGS } from '@/utils/types'

/**
 * @description: antd 多语言配置项
 * @return {*}
 * @author: 白雾茫茫丶丶
 */
export const ANTD_LANGS: Record<LANGS, { momentLocale: string, antd: Locale }> = {
  'zh-CN': {
    momentLocale: 'zh-cn',
    antd: zhcn,
  },
  'ja-JP': {
    momentLocale: 'ja-jp',
    antd: jajp,
  },
  'en-US': {
    momentLocale: 'en-us',
    antd: enus,
  },
  'zh-TW': {
    momentLocale: 'zh-tw',
    antd: zhtw,
  },
}

/**
 * @description: 状态
 * @author: 白雾茫茫丶
 */
export const STATUS_OPTS = [
  {
    label: '正常',
    value: STATUS.NORMAL,
  },
  {
    label: '禁用',
    value: STATUS.DISABLE,
  },
];

/**
 * @description: 是否
 * @author: 白雾茫茫丶
 */
export const FLAG_OPTS = [
  {
    label: '是',
    value: FLAG.YES,
  },
  {
    label: '否',
    value: FLAG.NO,
  },
];

/**
 * @description: 性别
 * @author: 白雾茫茫丶
 */
export const SEX_OPTS = [
  {
    label: '女',
    value: SEX.FEMALE,
  },
  {
    label: '男',
    value: SEX.MALE,
  },
];