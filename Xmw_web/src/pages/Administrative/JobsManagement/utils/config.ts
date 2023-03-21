/**
 * @description: 统一国际化前缀
 * @param {*} isMenu
 * @return {*}
 * @author: Cyan
 */
export const formatPerfix = (isMenu = false): string => {
  return `${isMenu ? 'menu' : 'pages'}.administrative.jobs-management`
}