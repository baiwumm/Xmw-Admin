/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-29 10:03:35
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-08-29 16:25:16
 */
import {
  ProFormRadio,
  ProFormSegmented,
  ProFormText,
} from '@ant-design/pro-components'; // antd 高级组件
import { useIntl } from '@umijs/max'
import { Col, Form, Row } from 'antd';
import { FC } from 'react'

import QuillEditor from '@/components/QuillEditor'
import { APP_FLAG_OPTS, APP_STATUS_OPTS } from '@/global/enum' // 状态枚举

import { AnnouncementTypeEnum, formatPerfix } from '../utils/config'

const FormTemplateItem: FC = () => {
  const { formatMessage } = useIntl();
  return (
    <>
      <ProFormText
        name="title"
        label={formatMessage({ id: `${formatPerfix()}.title` })}
        placeholder={formatMessage({ id: 'global.form.placeholder' }) +
          formatMessage({ id: `${formatPerfix()}.title` })}
        fieldProps={{
          showCount: true,
          maxLength: 100,
        }}
        rules={[
          {
            required: true, message: formatMessage({ id: 'global.form.placeholder' }) +
              formatMessage({ id: `${formatPerfix()}.title` }),
          },
        ]}
      />
      {/* 消息类型 */}
      <ProFormSegmented
        colProps={{ span: 10 }}
        name="type"
        label={formatMessage({ id: `${formatPerfix()}.type` })}
        initialValue={'1'}
        valueEnum={AnnouncementTypeEnum}
        rules={[{ required: true }]}
      />
      {/* 是否置顶 */}
      <ProFormRadio.Group
        name="pinned"
        colProps={{ span: 7 }}
        initialValue={0}
        radioType="button"
        fieldProps={{
          buttonStyle: 'solid',
        }}
        label={formatMessage({ id: `${formatPerfix()}.pinned` })}
        options={APP_FLAG_OPTS}
        rules={[{ required: true }]}
      />
      {/* 状态 */}
      <ProFormRadio.Group
        name="status"
        colProps={{ span: 7 }}
        initialValue={1}
        fieldProps={{
          buttonStyle: 'solid',
        }}
        label={formatMessage({ id: 'global.status' })}
        options={APP_STATUS_OPTS}
        rules={[{ required: true }]}
      />
      <Row style={{ width: '100%' }}>
        <Col span={24}>
          {/* 内容 */}
          {/* <Form.Item
            name="content"
            label={formatMessage({ id: `${formatPerfix()}.content` })}
            rules={[{ required: true }]}
          >
            <QuillEditor />
          </Form.Item> */}
        </Col>
      </Row>
    </>
  )
}
export default FormTemplateItem