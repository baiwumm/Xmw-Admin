import type { MenuTypeProps } from './interface'
/**
 * @description: 统一国际化前缀
 * @param {*} isMenu
 * @return {*}
 * @author: Cyan
 */
export const formatPerfix = (isMenu = false): string => {
  return `${isMenu ? 'menu' : 'pages'}.system.menu-management`
}

/**
 * @description: 菜单类型配置项
 * @return {*}
 * @author: Cyan
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
 * @return {*}
 * @author: Cyan
 */
export const TARGET_OPTS = ['_blank', '_self', '_parent', '_top']

/**
 * @description: 导航菜单的位置,side 为正常模式，top菜单显示在顶部，mix 两种兼有
 * @return {*}
 * @author: Cyan
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
 * @return {*}
 * @author: Cyan
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