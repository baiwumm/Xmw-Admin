/*
 * @Description: 接口数据类型定义
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-23 10:23:23
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-19 09:30:52
 */
declare namespace API {
  /**
   * @description: 智能行政-组织管理
   * @return {*}
   * @author: Cyan
   */
  type ORGANIZATION = {
    org_id?: string;
    org_name: string;
    org_code: string;
    org_type: string;
    describe?: string;
    parent_id?: string;
    status: string;
    created_time?: Date;
    update_time?: Date;
    leader?: string;
    founder?: string;
    children?: ORGANIZATION[];
  };

  /**
   * @description: 智能行政-岗位管理
   * @return {*}
   * @author: Cyan
   */
  type JOBSMANAGEMENT = {
    jobs_id?: string;
    jobs_name: string;
    org_id: string;
    describe?: string;
    parent_id?: string;
    created_time?: Date;
    update_time?: Date;
    leader?: string;
    founder?: string;
    org_name: string;
    children?: JOBSMANAGEMENT[];
  };

  /**
   * @description: 系统设置-菜单管理
   * @return {*}
   * @author: Cyan
   */
  type MENUMANAGEMENT = {
    menu_id: string;
    name?: string;
    path?: string;
    icon: string;
    component?: string;
    redirect?: string;
    parent_id: string;
    sort: number;
    founder?: string;
    status: string;
    target?: string;
    permission: string;
    access: string;
    menu_type: string;
    layout?: string;
    hideChildrenInMenu?: string;
    hideInMenu?: string;
    hideInBreadcrumb?: string;
    headerRender?: string;
    footerRender?: string;
    menuRender?: string;
    menuHeaderRender?: string;
    flatMenu?: string;
    fixedHeader?: string;
    fixSiderbar?: string;
    navTheme?: string;
    headerTheme?: string;
    created_time?: Date;
    update_time?: Date;
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
    en_name?: string;
    work_no: string;
    password: string;
    confirmPassword?: string;
    age: number;
    email?: string;
    phone: string;
    avatar_url?: string;
    sex: string;
    status: string;
    sort: number;
    token?: string;
    motto?: string;
    tags: string;
    city: string;
    address: string;
    jobs_id: string;
    org_id: string;
    role_id: string;
    last_ip?: string;
    login_num?: number;
    created_time: Date;
    update_time?: Date;
    founder?: string;
  };

  /**
   * @description: 系统设置-角色管理
   * @return {*}
   * @author: Cyan
   */
  type ROLEMANAGEMENT = {
    role_id: string;
    role_name: string;
    role_code: string;
    sort: number;
    founder?: string;
    status: string;
    describe?: string;
    menu_permission?: string[];
    created_time?: Date;
    update_time?: Date;
  };
  /**
   * @description: 系统设置-国际化
   * @return {*}
   * @author: Cyan
   */
  type INTERNATIONALIZATION = {
    id?: string;
    name: string;
    'zh-CN': string;
    'en-US': string;
    'ja-JP': string;
    'zh-TW': string;
    parent_id?: string;
    created_time?: Date;
    update_time?: Date;
    founder?: string;
    children?: INTERNATIONALIZATION[];
  };
}
