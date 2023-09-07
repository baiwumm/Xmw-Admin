import { TagColors } from '@/utils'
import type { OrgTypes } from '@/utils/types/administrative/organization'

/**
 * @description: 组织类型配置项
 * @author: 白雾茫茫丶
 */
export const ORG_TYPE_OPTS: Record<OrgTypes, { text: string; color: string }> = {
  group: {
    text: '集团',
    color: TagColors[0],
  },
  company: {
    text: '公司',
    color: TagColors[1],
  },
  unit: {
    text: '单位',
    color: TagColors[2],
  },
  department: {
    text: '部门',
    color: TagColors[3],
  },
};