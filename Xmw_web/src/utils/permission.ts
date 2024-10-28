/*
 * @Description: 组件按钮操作权限集合
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-12-05 15:11:02
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-18 17:36:18
 */

export default {
  administrative: {
    // 活动公告
    announcement: {
      add: 'administrative:announcement:add', // 新建
      edit: 'administrative:announcement:edit', // 编辑
      delete: 'administrative:announcement:delete', // 删除
    },
    // 组织管理
    organization: {
      add: 'administrative:organization:add', // 新建
      'add-child': 'administrative:organization:add-child', // 添加子级
      edit: 'administrative:organization:edit', // 编辑
      delete: 'administrative:organization:delete', // 删除
    },
    // 岗位管理
    'jobs-management': {
      add: 'administrative:jobs-management:add', // 新建
      'add-child': 'administrative:jobs-management:add-child', // 添加子级
      edit: 'administrative:jobs-management:edit', // 编辑
      delete: 'administrative:jobs-management:delete', // 删除
    },
  },
  system: {
    // 用户管理
    'user-management': {
      add: 'system:user-management:add', // 新建
      edit: 'system:user-management:edit', // 编辑
      delete: 'system:user-management:delete', // 删除
    },
    // 菜单管理
    'menu-management': {
      add: 'system:menu-management:add', // 新建
      'add-child': 'system:menu-management:add-child', // 添加子级
      edit: 'system:menu-management:edit', // 编辑
      delete: 'system:menu-management:delete', // 删除
    },
    // 角色管理
    'role-management': {
      add: 'system:role-management:add', // 新建
      edit: 'system:role-management:edit', // 编辑
      delete: 'system:role-management:delete', // 删除
    },
    // 国际化
    internationalization: {
      add: 'system:internationalization:add', // 新建
      'add-child': 'system:internationalization:add-child', // 添加子级
      edit: 'system:internationalization:edit', // 编辑
      delete: 'system:internationalization:delete', // 删除
    },
    // 操作日志
    'operation-log': {
      delete: 'system:operation-log:delete', // 删除
      'batch-delete': 'system:operation-log:batch-delete', // 批量删除
    },
  },
}
