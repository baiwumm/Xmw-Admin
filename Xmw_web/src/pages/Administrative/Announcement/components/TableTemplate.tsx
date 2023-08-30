/*
 * @Description: 活动公告-表格列表
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-25 17:28:14
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-08-30 10:15:38
 */
import { ClockCircleOutlined, PlusOutlined } from '@ant-design/icons' // antd 图标库
import { ActionType, ProColumns, ProTable, RequestData } from '@ant-design/pro-components' // antd 高级组件
import { Access, useAccess, useIntl } from '@umijs/max'
import { useBoolean } from 'ahooks'
import { Avatar, Button, Space, Tag, Typography } from 'antd'
import { FC, useRef, useState } from 'react';

import { getAnnouncementList } from '@/services/administrative/announcement'
import { columnScrollX } from '@/utils'
import permissions from '@/utils/permission'

import { AnnouncementTypeColorEnum, AnnouncementTypeEnum, formatPerfix } from '../utils/config'
import { TableSearchProps } from '../utils/interface'
import FormTemplate from './FormTemplate'

const { Text } = Typography;

const TableTemplate: FC = () => {
  const { formatMessage } = useIntl();
  // 权限定义集合
  const access = useAccess();
  // 当前行数据
  const [currentRecord, setCurrentRecord] = useState<API.ANNOUNCEMENT>()
  // 是否显示 Modal
  const [openModal, { setTrue: setOpenModalTrue, setFalse: setOpenModalFalse }] = useBoolean(false)
  // 获取表格实例
  const tableRef = useRef<ActionType>();
  // 手动触发刷新表格
  function reloadTable() {
    tableRef?.current?.reload()
  }

  /**
   * @description: 表格配置项
   * @author: 白雾茫茫丶
   */
  const columns: ProColumns<API.ANNOUNCEMENT>[] = [
    {
      title: formatMessage({ id: `${formatPerfix()}.author` }),
      dataIndex: 'author',
      ellipsis: true,
      width: 120,
      render: (_, record) => (
        <Space>
          <Avatar src={record.avatar_url} />
          <Text>{record.cn_name}</Text>
        </Space>
      ),
    },
    {
      title: formatMessage({ id: `${formatPerfix()}.title` }),
      dataIndex: 'title',
      ellipsis: true,
      width: 120,
    },
    {
      title: formatMessage({ id: `${formatPerfix()}.type` }),
      dataIndex: 'type',
      filters: true,
      onFilter: true,
      width: 100,
      valueEnum: AnnouncementTypeEnum,
      render: (_, record) => {
        const type: keyof typeof AnnouncementTypeColorEnum = record.type
        return <Tag color={AnnouncementTypeColorEnum[type]}>{AnnouncementTypeEnum[type]}</Tag>
      },
    },
    {
      title: formatMessage({ id: 'global.status' }),
      dataIndex: 'status',
      width: 100,
      filters: true,
      onFilter: true,
      valueEnum: {
        0: { text: formatMessage({ id: 'global.status.disable' }), status: 'Default' },
        1: { text: formatMessage({ id: 'global.status.normal' }), status: 'Processing' },
      },
    },
    {
      title: formatMessage({ id: 'global.table.created_time' }),
      dataIndex: 'created_time',
      valueType: 'dateTime',
      hideInSearch: true,
      sorter: true,
      width: 120,
      render: (text) => (
        <Space>
          <ClockCircleOutlined /><span>{text}</span>
        </Space>
      ),
    },
  ]
  return (
    <>
      <ProTable<API.ANNOUNCEMENT, TableSearchProps>
        actionRef={tableRef}
        columns={columns}
        rowKey="announcement_id"
        request={async (params: TableSearchProps): Promise<RequestData<API.ANNOUNCEMENT>> => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          const response = await getAnnouncementList(params).then((res) => {
            return {
              data: res.data.list,
              // success 请返回 true，不然 table 会停止解析数据，即使有数据
              success: res.code === 200,
              total: res.data.total,
            }
          })
          return Promise.resolve(response)
        }
        }
        // 工具栏
        toolBarRender={() => [
          <Access
            accessible={access.operationPermission(permissions.announcement.add)}
            fallback={null}
            key="plus"
          >
            <Button type="primary" onClick={() => { setCurrentRecord(undefined); setOpenModalTrue() }}>
              <PlusOutlined />
              {formatMessage({ id: `${formatPerfix(true)}.add` })}
            </Button>
          </Access>,
        ]}
        scroll={{ x: columnScrollX(columns) }}
      />
      {/* 抽屉表单 */}
      <FormTemplate
        reloadTable={reloadTable}
        formData={currentRecord}
        open={openModal}
        setOpenModalFalse={setOpenModalFalse}
      />
    </>
  )
}
export default TableTemplate
