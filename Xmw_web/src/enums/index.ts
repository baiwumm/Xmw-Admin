/**
 * @description: 路由菜单 key
 * @author: 白雾茫茫丶
 */
export enum MENU {
  ORGANIZATION = 'administrative.organization', // 智能行政-组织管理
}

/**
 * @description: 公共国际化 key
 * @author: 白雾茫茫丶
 */
export enum INTERNATION {
  OPERATION = 'global.table.operation', // 操作
  STATUS = 'global.status', // 状态
  STATUS_DISABLE = 'global.status.disable', // 禁用
  STATUS_NORMAL = 'global.status.normal', // 正常
  SORT = 'global.table.sort', // 排序
  SORT_TIP = 'global.table.sort.tooltip', // 排序 Tip
  CREATED_TIME = 'global.table.created_time', // 创建时间
  DESCRIBE = 'global.table.describe', // 描述
  DELETE_CONTENT = 'global.message.delete.content', // 删除提示内容
  DELETE_TITLE = 'global.message.delete.title', // 删除提示标题
  PARENT_ID = 'global.form.parent_id', // 添加子级
  PARENT_ID_TIP = 'global.form.parent_id.tooltip', // 添加子级 Tip
  PLACEHOLDER = 'global.form.placeholder', // 请输入
  PLACEHOLDER_UPLOAD = 'global.form.placeholder.upload', // 请上传
  PLACEHOLDER_SELETED = 'global.form.placeholder.seleted', // 请选择
  LEADER = 'global.form.leader', // 负责人
}

/**
 * @description: 表格下拉操作类型
 * @return {*}
 * @author: 白雾茫茫丶
 */
export enum OPERATION {
  ADD = 'add', // 新增
  EDIT = 'edit', // 编辑
  DELETE = 'delete', // 删除
  ADDCHILD = 'addChild', // 添加子级
}

/**
 * @description: 状态
 * @author: 白雾茫茫丶
 */
export enum STATUS {
  DISABLE, // 禁用
  NORMAL, // 正常
}