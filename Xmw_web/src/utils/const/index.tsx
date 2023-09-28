/*
 * @Description: 全局常量数据
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-09-06 13:37:18
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-26 09:30:28
 */
import { createFromIconfontCN } from '@ant-design/icons'
import { FormattedMessage } from '@umijs/max';
import type { Locale } from 'antd/es/locale'
import enus from 'antd/es/locale/en_US';
import jajp from 'antd/es/locale/ja_JP';
import zhcn from 'antd/es/locale/zh_CN';
import zhtw from 'antd/es/locale/zh_TW';
import { LabeledValue } from 'antd/es/select'
import { keys, toLower } from 'lodash-es'

import { formatPerfix } from '@/utils'
import {
  ANNOUNCEMENT_TYPE,
  FLAG,
  INTERNATION,
  LANGS,
  LAYOUT_TYPE,
  MENU_THEME,
  MENU_TYPE,
  ORG_TYPE,
  ROUTES,
  SEX,
  STATUS,
  TARGET_TYPE,
} from '@/utils/enums'
import { EnumKeys, Langs } from '@/utils/types'
import { AnnouncementType } from '@/utils/types/administrative/announcement'
import type { OrgTypes } from '@/utils/types/administrative/organization'
import type { MenuTypes } from '@/utils/types/system/menu-management'

/**
 * @description: 使用 iconfont.cn 资源
 * @author: 白雾茫茫丶
 */
export const IconFont = createFromIconfontCN({
  scriptUrl: process.env.ICONFONT_URL,
});

/**
 * @description: antd 多语言配置项
 * @author: 白雾茫茫丶
 */
export const ANTD_LANGS: Record<Langs, { momentLocale: string, antd: Locale }> = {
  [LANGS.CN]: {
    momentLocale: toLower(LANGS.CN),
    antd: zhcn,
  },
  [LANGS.JP]: {
    momentLocale: toLower(LANGS.JP),
    antd: jajp,
  },
  [LANGS.US]: {
    momentLocale: toLower(LANGS.US),
    antd: enus,
  },
  [LANGS.TW]: {
    momentLocale: toLower(LANGS.TW),
    antd: zhtw,
  },
}

/**
 * @description: 状态
 * @author: 白雾茫茫丶
 */
export const STATUS_OPTS: LabeledValue[] = [
  {
    label: <FormattedMessage id={INTERNATION.STATUS_NORMAL} />,
    value: STATUS.NORMAL,
  },
  {
    label: <FormattedMessage id={INTERNATION.STATUS_DISABLE} />,
    value: STATUS.DISABLE,
  },
];

/**
 * @description: 是否
 * @author: 白雾茫茫丶
 */
export const FLAG_OPTS: LabeledValue[] = [
  {
    label: <FormattedMessage id={INTERNATION.FLAG_YES} />,
    value: FLAG.YES,
  },
  {
    label: <FormattedMessage id={INTERNATION.FLAG_NO} />,
    value: FLAG.NO,
  },
];

/**
 * @description: 性别
 * @author: 白雾茫茫丶
 */
export const SEX_OPTS: LabeledValue[] = [
  {
    label: <FormattedMessage id={formatPerfix(ROUTES.USERMANAGEMENT, 'sex.female')} />,
    value: SEX.FEMALE,
  },
  {
    label: <FormattedMessage id={formatPerfix(ROUTES.USERMANAGEMENT, 'sex.male')} />,
    value: SEX.MALE,
  },
  {
    label: <FormattedMessage id={formatPerfix(ROUTES.USERMANAGEMENT, 'sex.secret')} />,
    value: SEX.PRIVACY,
  },
];

/**
 * @description: 消息类型
 * @author: 白雾茫茫丶
 */
export const AnnouncementTypeEnum: Record<AnnouncementType, string> = {
  [ANNOUNCEMENT_TYPE.ANNOUNCEMENT]: 'announcement',
  [ANNOUNCEMENT_TYPE.ACTIVITY]: 'activity',
  [ANNOUNCEMENT_TYPE.MESSAGE]: 'message',
  [ANNOUNCEMENT_TYPE.NOTIFICATION]: 'notification',
}

/**
 * @description: 组织类型
 * @author: 白雾茫茫丶
 */
export const OrgTypeEnum: Record<OrgTypes, string> = {
  [ORG_TYPE.GROUP]: 'group',
  [ORG_TYPE.COMPANY]: 'company',
  [ORG_TYPE.UNIT]: 'unit',
  [ORG_TYPE.DEPARTMENT]: 'department',
}

/**
 * @description: 菜单类型配置项
 * @author: 白雾茫茫丶
 */
export const MenuTypeEnum: Record<MenuTypes, string> = {
  [MENU_TYPE.DIR]: 'dir',
  [MENU_TYPE.MENU]: 'menu',
  [MENU_TYPE.BUTTON]: 'button',
};

/**
 * @description: 窗口打开方式
 * @author: 白雾茫茫丶
 */
export const TARGET_TYPE_OPTS: LabeledValue[] = keys(TARGET_TYPE).map((key: EnumKeys<typeof TARGET_TYPE>) => (
  { value: TARGET_TYPE[key], label: TARGET_TYPE[key] }
))

/**
 * @description: 导航菜单的位置,side 为正常模式，top菜单显示在顶部，mix 两种兼有
 * @author: 白雾茫茫丶
 */
export const LAYOUT_TYPE_OPTS: LabeledValue[] = keys(LAYOUT_TYPE).map((key: EnumKeys<typeof LAYOUT_TYPE>) => (
  {
    value: LAYOUT_TYPE[key],
    label: <FormattedMessage id={formatPerfix(ROUTES.MENUMANAGEMENT, `layout.${LAYOUT_TYPE[key]}`)} />,
  }
))

/**
 * @description: 导航菜单的主题
 * @author: 白雾茫茫丶
 */
export const NAV_THEME_OPTS: LabeledValue[] = keys(MENU_THEME).map((key: EnumKeys<typeof MENU_THEME>) => (
  {
    value: MENU_THEME[key],
    label: <FormattedMessage id={formatPerfix(ROUTES.MENUMANAGEMENT, `navTheme.${MENU_THEME[key]}`)} />,
  }
))