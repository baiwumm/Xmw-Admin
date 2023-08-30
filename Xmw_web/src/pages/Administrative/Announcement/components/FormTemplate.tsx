/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-29 09:49:55
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-08-29 16:39:38
 */
import { ModalForm } from '@ant-design/pro-components'; // 高级组件
import { useIntl } from '@umijs/max'
import { Form, message } from 'antd'
import { FC } from 'react'

import { createAnnouncement, updateAnnouncement } from '@/services/administrative/announcement'

import FormTemplateItem from '../components/FormTemplateItem' // 表单组件 
import { formatPerfix } from '../utils/config'
import { FormTemplateProps } from '../utils/interface'

const FormTemplate: FC<FormTemplateProps> = ({ reloadTable, formData, open, setOpenModalFalse }) => {
  const { formatMessage } = useIntl();
  // 初始化表单
  const [form] = Form.useForm<API.ANNOUNCEMENT>();
  // ModalForm 不同状态下 标题显示
  const formTitle = formData?.announcement_id ? `${formatMessage({ id: `${formatPerfix(true)}.edit` }) +
    formatMessage({ id: `${formatPerfix()}.title` })}：${formData.title}` :
    (formatMessage({ id: `${formatPerfix(true)}.add` }) + formatMessage({ id: `${formatPerfix()}` }))

  // 关闭抽屉浮层
  const handlerClose = () => {
    // 关闭表单
    setOpenModalFalse()
    // 重置表单
    form.resetFields();
  }

  // 提交表单
  const handlerSubmit = async (values: API.ANNOUNCEMENT): Promise<void> => {
    // 提交数据
    const params = { ...formData, ...values }
    console.log('params', params)
    await (params.announcement_id ? updateAnnouncement : createAnnouncement)(params).then((res) => {
      if (res.code === 200) {
        message.success(res.msg);
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
        destroyOnClose: true,
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