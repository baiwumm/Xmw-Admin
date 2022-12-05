/*
 * @Description: 组件按钮操作权限集合
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-12-05 15:11:02
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-05 15:22:06
 */

export default {
  // 组织管理
  organization:{
    add:'administrative:organization:add', // 新建
    addChild:'administrative:organization:add-child', // 添加子级
    edit: 'administrative:organization:edit', // 编辑
    delete: 'administrative:organization:delete' // 删除
  }
}
