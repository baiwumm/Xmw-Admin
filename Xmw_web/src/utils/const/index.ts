/*
 * @Description: 全局常量数据
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-09-06 13:37:18
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-13 18:25:20
 */
// 引入antd多语言配置
import type { Locale } from 'antd/es/locale'
import enus from 'antd/es/locale/en_US';
import jajp from 'antd/es/locale/ja_JP';
import zhcn from 'antd/es/locale/zh_CN';
import zhtw from 'antd/es/locale/zh_TW';
import { LabeledValue } from 'antd/es/select'
import { keys, sample } from 'lodash-es'

import {
  ANNOUNCEMENT_TYPE,
  FLAG,
  LAYOUT_TYPE,
  MENU_TYPE,
  NAV_THEME,
  ORG_TYPE,
  REQUEST_METHODS,
  SEX,
  STATUS,
  TARGET_TYPE,
} from '@/utils/enums'
import { LANGS, RequestMethods } from '@/utils/types'
import { AnnouncementType } from '@/utils/types/administrative/announcement'
import type { OrgTypes } from '@/utils/types/administrative/organization'
import type { MenuTypes } from '@/utils/types/system/menu-management'

/**
 * @description: antd 多语言配置项
 * @author: 白雾茫茫丶
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
export const STATUS_OPTS: LabeledValue[] = [
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
export const FLAG_OPTS: LabeledValue[] = [
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
export const SEX_OPTS: LabeledValue[] = [
  {
    label: '女',
    value: SEX.FEMALE,
  },
  {
    label: '男',
    value: SEX.MALE,
  },
  {
    label: '隐私',
    value: SEX.PRIVACY,
  },
];

/**
 * @description: 消息类型
 * @author: 白雾茫茫丶
 */
export const AnnouncementTypeEnum: Record<AnnouncementType, string> = {
  [ANNOUNCEMENT_TYPE.BULLET]: '公告',
  [ANNOUNCEMENT_TYPE.ACTIVITY]: '活动',
  [ANNOUNCEMENT_TYPE.MSG]: '消息',
  [ANNOUNCEMENT_TYPE.NOTICE]: '通知',
}

/**
 * @description: Tag 标签随机颜色
 * @author: 白雾茫茫丶
 */
export const randomTagColor = () => {
  const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
  return sample(colors)
}

/**
 * @description: 组织类型配置项
 * @author: 白雾茫茫丶
 */
export const ORG_TYPE_OPTS: Record<OrgTypes, { text: string; color: string }> = {
  [ORG_TYPE.GROUP]: {
    text: '集团',
    color: randomTagColor(),
  },
  [ORG_TYPE.COMPANY]: {
    text: '公司',
    color: randomTagColor(),
  },
  [ORG_TYPE.UNIT]: {
    text: '单位',
    color: randomTagColor(),
  },
  [ORG_TYPE.DEPARTMENT]: {
    text: '部门',
    color: randomTagColor(),
  },
};

/**
 * @description: 菜单类型配置项
 * @author: 白雾茫茫丶
 */
export const MENU_TYPE_OPTS: Record<MenuTypes, { text: string; color: string }> = {
  [MENU_TYPE.DIR]: {
    text: '目录',
    color: randomTagColor(),
  },
  [MENU_TYPE.MENU]: {
    text: '菜单',
    color: randomTagColor(),
  },
  [MENU_TYPE.BUTTON]: {
    text: '按钮',
    color: randomTagColor(),
  },
};

/**
 * @description: 窗口打开方式
 * @author: 白雾茫茫丶
 */
export const TARGET_TYPE_OPTS: LabeledValue[] = keys(TARGET_TYPE).map((key: keyof typeof TARGET_TYPE) => (
  { value: TARGET_TYPE[key], label: TARGET_TYPE[key] }
))

/**
 * @description: 导航菜单的位置,side 为正常模式，top菜单显示在顶部，mix 两种兼有
 * @author: 白雾茫茫丶
 */
export const LAYOUT_TYPE_OPTS: LabeledValue[] = [
  {
    label: '侧边菜单',
    value: LAYOUT_TYPE.SIDE,
  },
  {
    label: '顶部菜单',
    value: LAYOUT_TYPE.TOP,
  },
  {
    label: '混合菜单',
    value: LAYOUT_TYPE.MIX,
  },
];

/**
 * @description: 导航菜单的主题
 * @author: 白雾茫茫丶
 */
export const NAV_THEME_OPTS: LabeledValue[] = [
  {
    label: '暗黑风格',
    value: NAV_THEME.DARK,
  },
  {
    label: '亮色风格',
    value: NAV_THEME.LIGHT,
  },
];

/**
 * @description: 请求方法标签颜色
 * @author: 白雾茫茫丶
 */
export const MethodsTagColor: Record<RequestMethods, string> = {
  [REQUEST_METHODS.GET]: randomTagColor(),
  [REQUEST_METHODS.POST]: randomTagColor(),
  [REQUEST_METHODS.PUT]: randomTagColor(),
  [REQUEST_METHODS.DELETE]: randomTagColor(),
  [REQUEST_METHODS.PATCH]: randomTagColor(),
}