/**
 * @description: 统一国际化前缀
 * @param {*} isMenu
 * @author: 白雾茫茫丶
 */
export const formatPerfix = (isMenu = false): string => {
  return `${isMenu ? 'menu' : 'pages'}.administrative.announcement`
}

/**
 * @description: 消息类型
 * @author: 白雾茫茫丶
 */
export const AnnouncementTypeEnum = {
  1: '公告',
  2: '活动',
  3: '消息',
  4: '通知',
}

export const AnnouncementTypeColorEnum = {
  1: 'purple',
  2: 'volcano',
  3: 'cyan',
  4: 'blue',
};