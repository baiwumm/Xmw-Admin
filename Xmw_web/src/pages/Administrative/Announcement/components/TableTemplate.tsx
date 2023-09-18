/*
 * @Description: 活动公告-表格列表
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-25 17:28:14
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-15 14:19:04
 */
import { ClockCircleOutlined, PlusOutlined } from '@ant-design/icons' // antd 图标库
import { ActionType, ProColumns, ProTable, RequestData } from '@ant-design/pro-components' // antd 高级组件
import { Access, useAccess, useIntl } from '@umijs/max'
import { useBoolean } from 'ahooks'
import { Avatar, Button, message, Modal, Popconfirm, Space, Switch, Tag, Typography } from 'antd'
import { get } from 'lodash-es'
import { FC, useRef, useState } from 'react';

import DropdownMenu from '@/components/DropdownMenu' // 表格操作下拉菜单
import { delAnnouncement, getAnnouncementList, setPinned } from '@/services/administrative/announcement'
import { columnScrollX, formatPathName, formatPerfix } from '@/utils'
import { AnnouncementTypeEnum, randomTagColor } from '@/utils/const'
import { FLAG, INTERNATION, OPERATION, REQUEST_CODE, ROUTES, STATUS } from '@/utils/enums'
import permissions from '@/utils/permission'
import type { AnnouncementType, PinnedParams, SearchParams } from '@/utils/types/administrative/announcement'

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
  const [pinnedLoading, { setTrue: setPinnedLoadingTrue, setFalse: setPinnedLoadingFalse }] = useBoolean(false);
  const [announcementId, setAnnouncementId] = useState<string>('')
  // 获取表格实例
  const tableRef = useRef<ActionType>();
  // 手动触发刷新表格
  function reloadTable() {
    tableRef?.current?.reload()
  }

  /**
   * @description: 删除活动公告
   * @param {string} announcement_id
   * @author: 白雾茫茫丶
   */
  const handlerDelete = (announcement_id: string): void => {
    Modal.confirm({
      title: formatMessage({ id: INTERNATION.DELETE_TITLE }),
      content: formatMessage({ id: INTERNATION.DELETE_CONTENT }),
      onOk: async () => {
        await delAnnouncement(announcement_id).then((res) => {
          if (res.code === REQUEST_CODE.SUCCESS) {
            message.success(res.msg)
            // 刷新表格
            reloadTable()
          }
        })
      },
    })
  }

  // 设置角色状态
  const changePinned = async ({ announcement_id, pinned }: PinnedParams) => {
    await setPinned({
      announcement_id,
      pinned: pinned === FLAG.NO ? FLAG.YES : FLAG.NO,
    }).then((result) => {
      message.success(result.msg)
      reloadTable()
    }).finally(() => {
      setPinnedLoadingFalse()
    })
  }

  // 渲染是否置顶
  const renderPinned = (record: API.ANNOUNCEMENT) => (
    <Popconfirm
      title={formatMessage({ id: INTERNATION.POPCONFIRM_TITLE })}
      open={announcementId === record.announcement_id && pinnedLoading}
      onConfirm={() => changePinned(record)}
      onCancel={() => setPinnedLoadingFalse()}
      key="popconfirm"
    ><Switch
        checkedChildren={formatMessage({ id: INTERNATION.FLAG_YES })}
        unCheckedChildren={formatMessage({ id: INTERNATION.FLAG_NO })}
        checked={record.pinned === FLAG.YES}
        loading={announcementId === record.announcement_id && pinnedLoading}
        onChange={() => { setPinnedLoadingTrue(); setAnnouncementId(record.announcement_id) }}
      />
    </Popconfirm>
  );

  /**
   * @description: 表格配置项
   * @author: 白雾茫茫丶
   */
  const columns: ProColumns<API.ANNOUNCEMENT>[] = [
    {
      title: formatMessage({ id: `${formatPerfix(ROUTES.ANNOUNCEMENT)}.author` }),
      dataIndex: 'author',
      ellipsis: true,
      width: 120,
      align: 'center',
      hideInSearch: true,
      render: (_, record) => (
        <Space>
          <Avatar src={record.avatar_url} />
          <Text>{record.cn_name}</Text>
        </Space>
      ),
    },
    {
      title: formatMessage({ id: `${formatPerfix(ROUTES.ANNOUNCEMENT)}.title` }),
      dataIndex: 'title',
      ellipsis: true,
      align: 'center',
      width: 260,
    },
    {
      title: formatMessage({ id: `${formatPerfix(ROUTES.ANNOUNCEMENT)}.type` }),
      dataIndex: 'type',
      filters: true,
      onFilter: true,
      width: 100,
      align: 'center',
      valueEnum: AnnouncementTypeEnum,
      render: (_, record) => {
        const type: AnnouncementType = record.type
        return <Tag color={randomTagColor()}>{AnnouncementTypeEnum[type]}</Tag>
      },
    },
    {
      title: formatMessage({ id: INTERNATION.STATUS }),
      dataIndex: 'status',
      width: 100,
      filters: true,
      onFilter: true,
      align: 'center',
      valueEnum: {
        [STATUS.DISABLE]: { text: formatMessage({ id: INTERNATION.STATUS_DISABLE }), status: 'Default' },
        [STATUS.NORMAL]: { text: formatMessage({ id: INTERNATION.STATUS_NORMAL }), status: 'Processing' },
      },
    },
    {
      title: formatMessage({ id: `${formatPerfix(ROUTES.ANNOUNCEMENT)}.pinned` }),
      dataIndex: 'pinned',
      filters: true,
      onFilter: true,
      width: 160,
      align: 'center',
      valueEnum: {
        [FLAG.NO]: { text: formatMessage({ id: INTERNATION.FLAG_NO }), status: 'Default' },
        [FLAG.YES]: { text: formatMessage({ id: INTERNATION.FLAG_YES }), status: 'Processing' },
      },
      render: (_, record) => renderPinned(record),
    },
    {
      title: formatMessage({ id: INTERNATION.CREATED_TIME }),
      dataIndex: 'created_time',
      valueType: 'dateTime',
      hideInSearch: true,
      sorter: true,
      align: 'center',
      width: 160,
      render: (text) => (
        <Space size="small">
          <ClockCircleOutlined /><span>{text}</span>
        </Space>
      ),
    },
    {
      title: formatMessage({ id: INTERNATION.OPERATION }),
      valueType: 'option',
      width: 80,
      align: 'center',
      fixed: 'right',
      key: 'option',
      render: (_, record) => [
        <DropdownMenu
          formatPerfix={formatPathName(ROUTES.ROLEMANAGEMENT)}
          editCallback={() => {
            setCurrentRecord(record);
            setOpenModalTrue()
          }}
          deleteCallback={() => handlerDelete(record.announcement_id)}
          key="dropdownMenu"
        />,
      ],
    },
  ]
  return (
    <>
      <ProTable<API.ANNOUNCEMENT, SearchParams>
        actionRef={tableRef}
        columns={columns}
        rowKey="announcement_id"
        request={async (params: SearchParams): Promise<RequestData<API.ANNOUNCEMENT>> => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          const response = await getAnnouncementList(params).then((res) => {
            return {
              data: get(res, 'data.list', []),
              // success 请返回 true，不然 table 会停止解析数据，即使有数据
              success: res.code === REQUEST_CODE.SUCCESS,
              total: get(res, 'data.total', 0),
            }
          })
          return Promise.resolve(response)
        }
        }
        // 工具栏
        toolBarRender={() => [
          <Access
            accessible={access.operationPermission(
              get(permissions, `${formatPathName(ROUTES.ANNOUNCEMENT)}.${OPERATION.ADD}`, ''),
            )}
            fallback={null}
            key="plus"
          >
            <Button type="primary" onClick={() => { setCurrentRecord(undefined); setOpenModalTrue() }}>
              <PlusOutlined />
              {formatMessage({ id: `${formatPerfix(ROUTES.ANNOUNCEMENT, true)}.${OPERATION.ADD}` })}
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
