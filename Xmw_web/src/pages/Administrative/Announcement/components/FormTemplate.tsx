/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-29 09:49:55
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-16 10:12:49
 */
import { ModalForm } from '@ant-design/pro-components'; // 高级组件
import { App, Form } from 'antd'
import { FC } from 'react'

import { renderFormTitle } from '@/components/TableColumns'
import { saveAnnouncement } from '@/services/administrative/announcement'
import { isSuccess } from '@/utils'
import { ROUTES } from '@/utils/enums'
import type { FormTemplateProps } from '@/utils/types/administrative/announcement'

import FormTemplateItem from '../components/FormTemplateItem' // 表单组件 

const FormTemplate: FC<FormTemplateProps> = ({ reloadTable, open, setOpenModalFalse }) => {
  // hooks 调用
  const { message } = App.useApp();
  // 上下文表单实例
  const form = Form.useFormInstance()
  // 获取表单全部字段
  const { announcement_id, title } = form.getFieldsValue(true)
  // 渲染标题
  const formTitle = renderFormTitle(ROUTES.ANNOUNCEMENT, announcement_id, title)

  // 关闭抽屉浮层
  const handlerClose = () => {
    // 关闭表单
    setOpenModalFalse()
    // 重置表单
    form.resetFields();
  }

  // 提交表单
  const handlerSubmit = async (values: API.ANNOUNCEMENT) => {
    const params: API.ANNOUNCEMENT = { ...values, announcement_id }
    // 提交数据
    await saveAnnouncement(params).then(({ code, msg }) => {
      if (isSuccess(code)) {
        message.success(msg);
        // 刷新表格
        reloadTable()
        // 关闭浮层
        handlerClose()
      }
    })
  }
  return (
    <ModalForm<API.ANNOUNCEMENT>
      title={formTitle}
      width={800}
      grid
      form={form}
      open={open}
      autoFocusFirstInput
      modalProps={{
        maskClosable: false,
        onCancel: () => handlerClose(),
      }}
      // 提交数据时，禁用取消按钮的超时时间（毫秒）。
      submitTimeout={2000}
      onFinish={async (values) => {
        // 提交数据
        await handlerSubmit(values)
      }}
    >
      <FormTemplateItem />
    </ModalForm>
  )
}
export default FormTemplate