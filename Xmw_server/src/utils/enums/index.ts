/*
 * @Description: 枚举类型
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-09-28 14:12:07
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 15:59:19
 */

/**
 * @description: 请求状态码
 * @author: 白雾茫茫丶
 */
export enum REQUEST_CODE {
  NOSUCCESS = -1, // 表示请求成功，但操作未成功
  SUCCESS = 200, // 表示请求成功
  BADREQUEST = 400, // 表示客户端发送的请求有错误
  UNAUTHORIZED = 401, // 表示客户端未提供身份验证凭据或身份验证凭据不正确
  NOTFOUND = 404, // 表示服务器无法找到请求的资源
  INTERNALSERVERERROR = 500, // 表示服务器内部错误
}

/**
 * @description: 请求提示语
 * @author: 白雾茫茫丶
 */
export enum REQUEST_MSG {
  SUCCESS = '操作成功',
  FAILURE = '操作失败',
}

/**
 * @description: 状态
 * @author: 白雾茫茫丶
 */
export enum STATUS {
  DISABLE, // 禁用
  NORMAL, // 正常
}

/**
 * @description: 是否
 * @author: 白雾茫茫丶
 */
export enum FLAG {
  NO, // 否
  YES, // 是
}

/**
 * @description: 消息类型
 * @author: 白雾茫茫丶
 */
export enum ANNOUNCEMENT_TYPE {
  ANNOUNCEMENT = '1', // 公告
  ACTIVITY = '2', // 活动
  MESSAGE = '3', // 消息
  NOTIFICATION = '4', // 通知
}

/**
 * @description: 性别
 * @author: 白雾茫茫丶
 */
export enum SEX {
  FEMALE = '0', // 女
  MALE = '1', // 男
  PRIVACY = '2', // 隐私
}

/**
 * @description: 组织类型
 * @author: 白雾茫茫丶
 */
export enum ORG_TYPE {
  GROUP = 'group', // 集团
  COMPANY = 'company', // 公司
  UNIT = 'unit', // 单位
  DEPARTMENT = 'department', // 部门
}

/**
 * @description: 菜单类型
 * @author: 白雾茫茫丶
 */
export enum MENU_TYPE {
  DIR = 'dir', // 目录
  MENU = 'menu', // 菜单
  BUTTON = 'button', // 按钮
}

/**
 * @description: 窗口打开方式
 * @author: 白雾茫茫丶
 */
export enum TARGET_TYPE {
  BLANK = '_blank',
  SELF = '_self',
  PARENT = '_parent',
  TOP = '_top',
}

/**
 * @description: 导航菜单的位置,side 为正常模式，top菜单显示在顶部，mix 两种兼有
 * @author: 白雾茫茫丶
 */
export enum LAYOUT_TYPE {
  SIDE = 'side', // 侧边菜单
  TOP = 'top', // 顶部菜单
  MIX = 'mix', // 混合菜单
}

/**
 * @description: 主题风格
 * @author: 白雾茫茫丶
 */
export enum MENU_THEME {
  DARK = 'dark', // 暗黑风格
  LIGHT = 'light', // 亮色风格
}

/**
 * @description: 国际化语言
 * @author: 白雾茫茫丶
 */
export enum LANGS {
  CN = 'zh-CN', // 中文
  US = 'en-US', // 英文
  JP = 'ja-JP', // 日文
  TW = 'zh-TW', // 繁体中文
}

/**
 * @description: 请求方式
 * @author: 白雾茫茫丶
 */
export enum REQUEST_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}
