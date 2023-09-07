/**
 * @description: 存储在 localstorage 的 key
 * @author: 白雾茫茫丶
 */
export enum LOCAL_STORAGE {
  USER_INFO = 'USER_INFO', // 用户信息
  ACCESS_TOKEN = 'ACCESS_TOKEN', // ACCESS_TOKEN
  LAYOUT = 'LAYOUT', // 布局
  LOCK_SLEEP = 'LOCK_SLEEP', // 睡眠
}

/**
 * @description: 菜单路由
 * @author: 白雾茫茫丶
 */
export enum ROUTES {
  LOGIN = '/user/login', // 登录页
  WORKBENCH = '/dashboard/work-bench', // 指示面板-工作台
  ORGANIZATION = '/administrative/organization', // 智能行政-组织管理
  JOBSMANAGEMENT = '/administrative/jobs-management', // 智能行政-岗位管理
  PERSONALINFOMATION = '/personal-center/personal-information', // 个人中心-个人信息
  PERSONALSETTING = '/personal-center/personal-setting', // 个人中心-个人设置
  USERMANAGEMENT = '/system/user-management', // 系统设置-用户管理
  MENUMANAGEMENT = '/system/menu-management', // 系统设置-菜单管理
  ROLEMANAGEMENT = '/system/role-management', // 系统设置-角色管理
  INTERNATIONALIZATION = '/system/internationalization', // 系统设置-国际化
  OPERATIONLOG = '/system/operation-log', // 系统设置-操作日志
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
  BUTTON_SUBMIT = 'global.button.submit', // 提交
  BUTTON_MODIFY = 'global.button.modify', // 修改
  BUTTON_CONFIRM = 'global.button.confirm', // 确认
  WARM_TIPS = 'global.warm-tips' // 温馨提示
}

/**
 * @description: 表格下拉操作类型
 * @author: 白雾茫茫丶
 */
export enum OPERATION {
  ADD = 'add', // 新增
  EDIT = 'edit', // 编辑
  DELETE = 'delete', // 删除
  ADDCHILD = 'add-child', // 添加子级
}

/**
 * @description: 状态
 * @author: 白雾茫茫丶
 */
export enum STATUS {
  DISABLE, // 禁用
  NORMAL, // 正常
}

/**
 * @description: 是否
 * @author: 白雾茫茫丶
 */
export enum FLAG {
  YES, // 是
  NO, // 否
}

/**
 * @description: 性别
 * @author: 白雾茫茫丶
 */
export enum SEX {
  FEMALE, // 女
  MALE, // 男
}