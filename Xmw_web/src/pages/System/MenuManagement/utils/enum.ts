/*
 * @Description: 枚举配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 14:27:33
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-29 15:13:34
 */

export const MENU_TYPE_OPTS = [
  {
    label: '目录',
    value: 'dir',
  },
  {
    label: '菜单',
    value: 'menu',
  },
  {
    label: '按钮',
    value: 'button',
  },
];

export const MENU_TYPE_TAGS = {
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
export const TARGET_OPTS = [
  {
    label: '_blank',
    value: '_blank',
  },
  {
    label: '_self',
    value: '_self',
  },
  {
    label: '_parent',
    value: '_parent',
  },
  {
    label: '_top',
    value: '_top',
  },
];

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
