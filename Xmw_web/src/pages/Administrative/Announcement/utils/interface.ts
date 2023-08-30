/**
  * @description: 头部搜索表单 Props
  * @return {*}
  * @author: 白雾茫茫丶
  */
export type TableSearchProps = {
  title?: string; // 标题
  type?: string; // 类型
  pinned?: number; // 是否置顶
}

/**
 * @description: 创建新闻公告 Props
 * @return {*}
 * @author: 白雾茫茫丶
 */
export type CreateAnnouncementProps = {
  announcement_id?: string; // id 主键
  title: string; // 标题
  content: string; // 正文内容
  type: string; // 类型
  status: number; // 状态
  pinned: number; // 是否置顶
}

/**
 * @description: FormTemplate Props
 * @return {*}
 * @author: 白雾茫茫丶
 */
export type FormTemplateProps = {
  reloadTable: () => void; // 刷新表格
  formData?: API.ANNOUNCEMENT;
  open: boolean;
  setOpenModalFalse: () => void
}