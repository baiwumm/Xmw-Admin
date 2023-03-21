import type { OrgTypeProps } from './interface'
/**
 * @description: 组织类型配置项
 * @return {*}
 * @author: Cyan
 */
export const ORG_TYPE_OPTS: Record<OrgTypeProps, { text: string; color: string }> = {
  company: {
    text: '公司',
    color: 'cyan',
  },
  unit: {
    text: '单位',
    color: 'blue',
  },
  department: {
    text: '部门',
    color: 'geekblue',
  },
  team: {
    text: '小组',
    color: 'purple',
  },
};

/**
 * @description: 统一国际化前缀
 * @param {*} isMenu
 * @return {*}
 * @author: Cyan
 */
export const formatPerfix = (isMenu = false): string => {
  return `${isMenu ? 'menu' : 'pages'}.administrative.organization`
}