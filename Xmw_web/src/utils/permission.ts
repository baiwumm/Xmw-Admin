/*
 * @Description: 组件按钮操作权限集合
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-12-05 15:11:02
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-05 17:22:50
 */

export default {
  // 组织管理
  organization: {
    add: 'administrative:organization:add', // 新建
    addChild: 'administrative:organization:add-child', // 添加子级
    edit: 'administrative:organization:edit', // 编辑
    delete: 'administrative:organization:delete', // 删除
  },
  // 岗位管理
  jobsManagement: {
    add: 'administrative:jobs-management:add', // 新建
    addChild: 'administrative:jobs-management:add-child', // 添加子级
    edit: 'administrative:jobs-management:edit', // 编辑
    delete: 'administrative:jobs-management:delete', // 删除
  },
  // 用户管理
  userManagement: {
    add: 'system:user-management:add', // 新建
    edit: 'system:user-management:edit', // 编辑
    delete: 'system:user-management:delete', // 删除
  },
  // 菜单管理
  menuManagement: {
    add: 'system:menu-management:add', // 新建
    addChild: 'system:menu-management:add-child', // 添加子级
    edit: 'system:menu-management:edit', // 编辑
    delete: 'system:menu-management:delete', // 删除
  },
  // 角色管理
  roleManagement: {
    add: 'system:role-management:add', // 新建
    edit: 'system:role-management:edit', // 编辑
    delete: 'system:role-management:delete', // 删除
  },
  // 国际化
  internationalization: {
    add: 'system:internationalization:add', // 新建
    addChild: 'system:internationalization:add-child', // 添加子级
    edit: 'system:internationalization:edit', // 编辑
    delete: 'system:internationalization:delete', // 删除
  },
}
