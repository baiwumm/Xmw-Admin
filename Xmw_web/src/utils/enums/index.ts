/**
 * @description: 请求状态码
 * @author: 白雾茫茫丶
 */
export enum REQUEST_CODE {
  NOSUCCESS = -1, // 表示请求成功，但操作未成功
  SUCCESS = 200, // 表示请求成功
  BADREQUEST = 400, // 表示客户端发送的请求有错误
  UNAUTHORIZED = 401, // 表示客户端未提供身份验证凭据或身份验证凭据不正确
  NOTFOUND = 404, // 表示服务器无法找到请求的资源
  INTERNALSERVERERROR = 500, // 表示服务器内部错误
}

/**
 * @description: 请求方式
 * @author: 白雾茫茫丶
 */
export enum REQUEST_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

/**
 * @description: 请求前缀
 * @author: 白雾茫茫丶
 */
export enum BASEURL {
  API = '/api'
}

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
  DASHBOARD = '/dashboard', // 指示面板
  WORKBENCH = '/dashboard/work-bench', // 指示面板-工作台
  DEPENDENCE = '/dashboard/environmental-dependence', // 指示面板-环境依赖
  ADMINISTRATIVE = '/administrative', // 智能行政
  ANNOUNCEMENT = '/administrative/announcement', // 智能行政-活动公告
  ORGANIZATION = '/administrative/organization', // 智能行政-组织管理
  JOBSMANAGEMENT = '/administrative/jobs-management', // 智能行政-岗位管理
  PERSONALCENTER = '/personal-center', // 个人中心
  PERSONALINFOMATION = '/personal-center/personal-information', // 个人中心-个人信息
  PERSONALSETTING = '/personal-center/personal-setting', // 个人中心-个人设置
  FEATURES = '/features', // 功能页
  CAPTCHA = '/features/captcha', // 验证码
  GANTT = '/features/gantt', // 甘特图
  VIEWER = '/features/viewer', // 图片预览
  LAZYLOAD = '/features/lazyload', // 懒加载
  COLORTHIEF = '/features/colorthief', // 图片取色盘
  EYEDROPPER = '/features/eye-dropper', // 系统级取色器
  FLOW = '/features/flow', // 流程图
  SWIPER = '/features/swiper', // Swiper
  FILEPREVIEW = '/features/file-preview', // 文件预览
  CHARTS = '/features/charts', // 图表
  TECHNICALDOCUMENT = '/technical-document', // 技术文档
  REACT = '/technical-document/react', // 技术文档 - React
  NEST = '/technical-document/nest', // 技术文档 - Nest
  ANTDESIGN = '/technical-document/ant-design', // 技术文档 - Ant-design
  UMI = '/technical-document/umi', // 技术文档 - Umi
  SYSTEM = '/system', // 系统设置
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
  WARM_TIPS = 'global.warm-tips', // 温馨提示
  FLAG_YES = 'global.flag.yes', // 是
  FLAG_NO = 'global.flag.no', // 否
  POPCONFIRM_TITLE = 'global.popconfirm.title', // 确认执行此操作吗？
  BASICLAYOUT = 'components.BasicLayout', // 布局组件
  UPLOADIMAGE = 'components.UploadImage'
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
  BATCHDELETE = 'batch-delete', // 批量删除
}

/**
 * @description: 登录类型
 * @author: 白雾茫茫丶
 */
export enum LOGIN_TYPE {
  MOBILE = 'mobile', // 手机登录
  ACCOUNT = 'account', // 账号登录
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
  NO, // 否
  YES, // 是
}

/**
 * @description: 性别
 * @author: 白雾茫茫丶
 */
export enum SEX {
  FEMALE = '0', // 女
  MALE = '1', // 男
  PRIVACY = '2', // 隐私
}

/**
 * @description: 消息类型
 * @author: 白雾茫茫丶
 */
export enum ANNOUNCEMENT_TYPE {
  ANNOUNCEMENT = '1', // 公告
  ACTIVITY = '2', // 活动
  MESSAGE = '3', // 消息
  NOTIFICATION = '4', // 通知
}

/**
 * @description: 组织类型
 * @author: 白雾茫茫丶
 */
export enum ORG_TYPE {
  GROUP = 'group', // 集团
  COMPANY = 'company', // 公司
  UNIT = 'unit', // 单位
  DEPARTMENT = 'department', // 部门
}

/**
 * @description: 菜单类型
 * @author: 白雾茫茫丶
 */
export enum MENU_TYPE {
  DIR = 'dir', // 目录
  MENU = 'menu', // 菜单
  BUTTON = 'button', // 按钮
}

/**
 * @description: 窗口打开方式
 * @author: 白雾茫茫丶
 */
export enum TARGET_TYPE {
  BLANK = '_blank',
  SELF = '_self',
  PARENT = '_parent',
  TOP = '_top'
}

/**
 * @description: 导航菜单的位置,side 为正常模式，top菜单显示在顶部，mix 两种兼有
 * @author: 白雾茫茫丶
 */
export enum LAYOUT_TYPE {
  SIDE = 'side', // 侧边菜单
  TOP = 'top', // 顶部菜单
  MIX = 'mix', // 混合菜单
}

/**
 * @description: 主题风格
 * @author: 白雾茫茫丶
 */
export enum MENU_THEME {
  DARK = 'dark', // 暗黑风格
  LIGHT = 'light', // 亮色风格
}

/**
 * @description: 国际化语言
 * @author: 白雾茫茫丶
 */
export enum LANGS {
  CN = 'zh-CN', // 中文
  US = 'en-US', // 英文
  JP = 'ja-JP', // 日文
  TW = 'zh-TW', // 繁体中文
}

/**
 * @description: EventBus type
 * @author: 白雾茫茫丶
 */
export enum EVENTBUS_TYPE {
  ANNOUNCEMENT = 'announcement-detail', // 查看公告详情
  UPDATEUNREADYCOUNT = 'update-unready-count', // 更新未读消息数量
}

/**
 * @description: TabsLayout 多标签类型
 * @author: 白雾茫茫丶
 */
export enum TABSLAYOUT {
  CLOSE = 'close', // 关闭当前
  REFRESH = 'refresh', // 重新加载
  RIGHT = 'right', // 关闭右侧
  LEFT = 'left', // 关闭左侧
  OTHERS = 'others', // 关闭其它
}