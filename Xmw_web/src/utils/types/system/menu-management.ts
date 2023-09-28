import { LAYOUT_TYPE, MENU_THEME, MENU_TYPE, TARGET_TYPE } from '@/utils/enums'
import type { EnumValues, SearchTimes } from '@/utils/types'

/**
 * @description: 菜单类型
 * @author: 白雾茫茫丶
 */
export type MenuTypes = EnumValues<typeof MENU_TYPE>

/**
 * @description: 窗口打开方式
 * @author: 白雾茫茫丶
 */
export type TargetTypes = EnumValues<typeof TARGET_TYPE>

/**
 * @description: 导航菜单的位置,side 为正常模式，top菜单显示在顶部，mix 两种兼有
 * @author: 白雾茫茫丶
 */
export type LayoutTypes = EnumValues<typeof LAYOUT_TYPE>

/**
 * @description: 主题风格
 * @author: 白雾茫茫丶
 */
export type MenuTheme = EnumValues<typeof MENU_THEME>

/**
 * @description: FormTemplate Props
 * @Author: 白雾茫茫丶
 */
export type FormTemplateProps = {
  treeData: API.MENUMANAGEMENT[]; // 菜单树形数据
  reloadTable: () => void; // 刷新表格
  open: boolean;
  setOpenDrawerFalse: () => void;
};

/**
 * @description: 头部搜索表单 Params
 * @author: 白雾茫茫丶
 */
export type SearchParams = {
  isPremission?: boolean; // 是否是角色权限
} & SearchTimes & Partial<Pick<API.MENUMANAGEMENT, 'menu_type' | 'status'>>
