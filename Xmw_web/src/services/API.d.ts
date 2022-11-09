/*
 * @Description: 接口数据类型定义
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-23 10:23:23
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-09 15:39:42
 */
declare namespace API {
  /**
   * @description: 智能行政-组织管理
   * @return {*}
   * @author: Cyan
   */
  type ORGANIZATION = {
    org_id: string; // 组织id
    org_name: string; // 组织名称
    org_code: string; // 组织编码
    org_type: string; // 组织类型
    describe: string; // 组织描述
    parent_id: string; // 父级id
    status: number; // 组织状态
    sort: number; // 排序
    created_time: Date; // 创建时间
    updated_time: Date;  // 最后一次更新时间
    leader: string; // 岗位负责人
    founder: string; // 创建人
    children?: ORGANIZATION[];
  };

  /**
   * @description: 智能行政-岗位管理
   * @return {*}
   * @author: Cyan
   */
  type JOBSMANAGEMENT = {
    jobs_id: string; // 岗位id
    jobs_name: string; // 岗位名称
    org_id: string; // 所属组织
    describe: string; // 岗位描述
    parent_id: string; // 父级id
    created_time: Date; // 创建时间
    updated_time: Date; // 最后一次更新时间
    leader: string; // 岗位负责人
    founder: string; // 创建人
    org_name: string; // 组织名称
    sort: number; // 排序
    children?: JOBSMANAGEMENT[];
  };

  /**
   * @description: 系统设置-菜单管理
   * @return {*}
   * @author: Cyan
   */
  type MENUMANAGEMENT = {
    menu_id: string;
    name: string;
    path: string;
    icon: string;
    component: string;
    redirect: string;
    parent_id: string;
    sort: number;
    founder: string;
    status: number;
    target: string;
    permission: string;
    access: string;
    menu_type: string;
    layout: string;
    hideChildrenInMenu: number;
    hideInMenu: number;
    hideInBreadcrumb: number;
    headerRender: number;
    footerRender: number;
    menuRender: number;
    menuHeaderRender: number;
    flatMenu: number;
    fixedHeader: number;
    fixSiderbar: number;
    navTheme: string;
    headerTheme: string;
    created_time: Date;
    updated_time: Date;
    'zh-CN': string;
    'en-US': string;
    'ja-JP': string;
    'zh-TW': string;
    children?: MENUMANAGEMENT[];
  };

  /**
   * @description: 系统设置-用户管理
   * @return {*}
   * @author: Cyan
   */
  type USERMANAGEMENT = {
    user_id: string;
    user_name: string;
    cn_name: string;
    en_name: string;
    work_no: string;
    password: string;
    confirmPassword: string;
    age: number;
    email: string;
    phone: string;
    avatar_url: string;
    sex: string;
    status: number;
    sort: number;
    token: string;
    motto: string;
    tags: string;
    city: string;
    address: string;
    jobs_id: string;
    org_id: string;
    role_id: string;
    last_ip: string;
    login_num: number;
    created_time: Date;
    updated_time: Date;
    founder: string;
  };

  /**
   * @description: 系统设置-角色管理
   * @return {*}
   * @author: Cyan
   */
  type ROLEMENU = {
    menu_id: string;
    role_id: string
  }
  type ROLEMANAGEMENT = {
    role_id: string;
    role_name: string;
    role_code: string;
    sort: number;
    founder: string;
    status: number;
    describe: string;
    menu_permission: ROLEMENU[];
    created_time: Date;
    updated_time: Date;
  };
  /**
   * @description: 系统设置-国际化
   * @return {*}
   * @author: Cyan
   */
  type LOCALESLANG = 'zh-CN' | 'en-US' | 'ja-JP' | 'zh-TW'
  type INTERNATIONALIZATION<T = string> = { [key in LOCALESLANG]: T } & {
    id: string;
    name: string;
    parent_id: string;
    created_time: Date;
    updated_time: Date;
    founder: string;
    sort: number; // 排序
    children?: INTERNATIONALIZATION[];
  };

  /**
 * @description: 国际化多语言层级对象
 * @return {*}
 * @author: Cyan
 */
  type LOCALESLANGAll = Pick<INTERNATIONALIZATION<ResData>, LOCALESLANG>
}
