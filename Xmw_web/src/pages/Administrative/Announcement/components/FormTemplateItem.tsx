/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-29 10:03:35
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-12 17:21:35
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
import { formatPerfix } from '@/utils'
import { AnnouncementTypeEnum, FLAG_OPTS, STATUS_OPTS } from '@/utils/const'
import { ANNOUNCEMENT_TYPE, FLAG, INTERNATION, ROUTES, STATUS } from '@/utils/enums'

const FormTemplateItem: FC = () => {
  const { formatMessage } = useIntl();
  return (
    <>
      <ProFormText
        name="title"
        label={formatMessage({ id: `${formatPerfix(ROUTES.ANNOUNCEMENT)}.title` })}
        placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
          formatMessage({ id: `${formatPerfix(ROUTES.ANNOUNCEMENT)}.title` })}
        fieldProps={{
          showCount: true,
          maxLength: 100,
        }}
        rules={[
          {
            required: true, message: formatMessage({ id: INTERNATION.PLACEHOLDER }) +
              formatMessage({ id: `${formatPerfix(ROUTES.ANNOUNCEMENT)}.title` }),
          },
        ]}
      />
      {/* 消息类型 */}
      <ProFormSegmented
        colProps={{ span: 10 }}
        name="type"
        label={formatMessage({ id: `${formatPerfix(ROUTES.ANNOUNCEMENT)}.type` })}
        initialValue={ANNOUNCEMENT_TYPE.BULLET}
        valueEnum={AnnouncementTypeEnum}
        rules={[{ required: true }]}
      />
      {/* 是否置顶 */}
      <ProFormRadio.Group
        name="pinned"
        colProps={{ span: 7 }}
        initialValue={FLAG.NO}
        radioType="button"
        fieldProps={{
          buttonStyle: 'solid',
        }}
        label={formatMessage({ id: `${formatPerfix(ROUTES.ANNOUNCEMENT)}.pinned` })}
        options={FLAG_OPTS}
        rules={[{ required: true }]}
      />
      {/* 状态 */}
      <ProFormRadio.Group
        name="status"
        colProps={{ span: 7 }}
        initialValue={STATUS.NORMAL}
        fieldProps={{
          buttonStyle: 'solid',
        }}
        label={formatMessage({ id: INTERNATION.STATUS })}
        options={STATUS_OPTS}
        rules={[{ required: true }]}
      />
      <Row style={{ width: '100%' }}>
        <Col span={24}>
          {/* 内容 */}
          <Form.Item
            name="content"
            label={formatMessage({ id: `${formatPerfix(ROUTES.ANNOUNCEMENT)}.content` })}
            rules={[{ required: true }]}
          >
            <QuillEditor />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
export default FormTemplateItem