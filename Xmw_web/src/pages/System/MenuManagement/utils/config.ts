import type { MenuTypeProps } from '@/utils/types/system/menu-management'

/**
 * @description: 菜单类型配置项
 * @author: 白雾茫茫丶丶
 */
export const MENU_TYPE_OPTS: Record<MenuTypeProps, { text: string; color: string }> = {
  dir: {
    text: '目录',
    color: 'cyan',
  },
  menu: {
    text: '菜单',
    color: 'blue',
  },
  button: {
    text: '按钮',
    color: 'geekblue',
  },
};

/**
 * @description: 窗口打开方式
 * @author: 白雾茫茫丶丶
 */
export const TARGET_OPTS = ['_blank', '_self', '_parent', '_top']

/**
 * @description: 导航菜单的位置,side 为正常模式，top菜单显示在顶部，mix 两种兼有
 * @author: 白雾茫茫丶丶
 */
export const LAYOUT_OPTS = [
  {
    label: '侧边菜单',
    value: 'side',
  },
  {
    label: '顶部菜单',
    value: 'top',
  },
  {
    label: '混合菜单',
    value: 'mix',
  },
];

/**
 * @description: 导航菜单的主题
 * @author: 白雾茫茫丶丶
 */
export const NAV_THEME_OPTS = [
  {
    label: '暗黑风格',
    value: 'dark',
  },
  {
    label: '亮色风格',
    value: 'light',
  },
];

/**
 * @description: 默认不显示的 column 项
 * @author: 白雾茫茫丶丶
 */
export const MENU_CFG = [
  'redirect',
  'navTheme',
  'headerTheme',
  'layout',
  'hideChildrenInMenu',
  'hideInMenu',
  'hideInBreadcrumb',
  'headerRender',
  'headerRender',
  'footerRender',
  'menuRender',
  'menuHeaderRender',
  'flatMenu',
  'fixedHeader',
  'fixSiderbar',
]