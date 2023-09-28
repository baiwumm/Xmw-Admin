/*
 * @Description: 类型标注
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-09-28 14:10:44
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 17:04:38
 */
import {
  ANNOUNCEMENT_TYPE,
  FLAG,
  LANGS,
  LAYOUT_TYPE,
  MENU_THEME,
  MENU_TYPE,
  ORG_TYPE,
  REQUEST_METHODS,
  SEX,
  STATUS,
  TARGET_TYPE,
} from '@/utils/enums';
import type { UserAttributes } from '@/utils/types/system';

/**
 * @description: 公共的类型
 * @author: 白雾茫茫丶
 */
export type CommonTypes = {
  parent_id?: string; // 父级id
  status: Status; // 组织状态
  sort: number; // 排序
  leader: string; // 岗位负责人
  founder: string; // 创建人
  describe: string; // 描述
};

/**
 * @description: 创建时间、更新时间
 * @author: 白雾茫茫丶
 */
export type Times = {
  created_time?: Date; // 创建时间
  updated_time?: Date; // 最后一次更新时间
};

/**
 * @description: 获取枚举的所有 key
 * @author: 白雾茫茫丶
 */
export type EnumKeys<T> = keyof T;

/**
 * @description: 获取枚举的所有可能值
 * @author: 白雾茫茫丶
 */
export type EnumValues<T> = T[EnumKeys<T>];

/**
 * @description: Response 返回体，默认是不分页，如果是分页查询，需要自己将 Model 带入
 * @author: 白雾茫茫丶
 */
export type Response<T = any> = {
  code?: number;
  data: T;
  msg?: string;
};

/**
 * @description: 分页查询
 * @author: 白雾茫茫丶
 */
export type PageResponse<T> = {
  total: number;
  list: T[];
};

/**
 * @description: Session 存储对象
 * @author: 白雾茫茫丶
 */
export type SessionTypes = {
  currentUserInfo: UserAttributes; // 用户信息
  verifyCode: string; // 验证码
};

/**
 * @description: 状态
 * @author: 白雾茫茫丶
 */
export type Status = EnumValues<typeof STATUS>;

/**
 * @description: 是否
 * @author: 白雾茫茫丶
 */
export type Flag = EnumValues<typeof FLAG>;

/**
 * @description: 语言类型
 * @author: 白雾茫茫丶
 */
export type Langs = Partial<Record<EnumValues<typeof LANGS>, string>>;

/**
 * @description: 请求方法
 * @author: 白雾茫茫丶
 */
export type RequestMethods = EnumValues<typeof REQUEST_METHODS>;

/**
 * @description: 组织类型
 * @author: 白雾茫茫丶
 */
export type OrgTypes = EnumValues<typeof ORG_TYPE>;

/**
 * @description: 活动公告类型
 * @author: 白雾茫茫丶
 */
export type AnnouncementTypes = EnumValues<typeof ANNOUNCEMENT_TYPE>;

/**
 * @description: 菜单类型
 * @author: 白雾茫茫丶
 */
export type MenuTypes = EnumValues<typeof MENU_TYPE>;

/**
 * @description: layout布局
 * @author: 白雾茫茫丶
 */
export type Layouts = EnumValues<typeof LAYOUT_TYPE>;

/**
 * @description: 窗口打开方式
 * @author: 白雾茫茫丶
 */
export type TargetTypes = EnumValues<typeof TARGET_TYPE>;

/**
 * @description: 菜单主题
 * @author: 白雾茫茫丶
 */
export type MenuTheme = EnumValues<typeof MENU_THEME>;

/**
 * @description: 性别
 * @author: 白雾茫茫丶
 */
export type Sex = EnumValues<typeof SEX>;
