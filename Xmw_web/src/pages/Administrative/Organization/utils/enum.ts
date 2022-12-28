/*
 * @Description: 枚举配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 14:27:33
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-28 11:40:02
 */
export const ORG_TYPE_OPTS: { value: string; label: string }[] = [
  {
    label: '公司',
    value: 'company',
  },
  {
    label: '单位',
    value: 'unit',
  },
  {
    label: '部门',
    value: 'department',
  },
  {
    label: '小组',
    value: 'team',
  },
];

export const ORG_TYPE_TAGS: Record<string, { text: string; color: string }> = {
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
