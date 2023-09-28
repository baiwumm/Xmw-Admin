import { ORG_TYPE } from '@/utils/enums'
import type { EnumValues, SearchTimes } from '@/utils/types'

// 组织类型
export type OrgTypes = EnumValues<typeof ORG_TYPE>

/**
 * @description: 新增组织 Params
 * @author: 白雾茫茫丶
 */
export type CreateOrgParams = Pick<
  API.ORGANIZATION,
  'parent_id' |
  'org_name' |
  'org_code' |
  'org_type' |
  'org_logo' |
  'leader' |
  'status' |
  'sort' |
  'describe'
>

/**
 * @description: FormTemplate Props
 * @Author: 白雾茫茫丶
 */
export type FormTemplateProps = {
  treeData: API.ORGANIZATION[], // 组织树形数据
  reloadTable: () => void, // 刷新表格
  open: boolean;
  setOpenDrawerFalse: () => void
}

/**
 * @description: 头部搜索表单 Params
 * @author: 白雾茫茫丶
 */
export type SearchParams = Partial<
  Pick<API.ORGANIZATION, 'org_name' | 'org_code' | 'org_type' | 'status'>>
  & SearchTimes
