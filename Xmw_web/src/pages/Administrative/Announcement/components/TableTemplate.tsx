/*
 * @Description: 活动公告-表格列表
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-25 17:28:14
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-08 09:09:40
 */
import { EyeOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { useBoolean, useRequest } from 'ahooks'
import { Avatar, Badge, Form, message, Popconfirm, Space, Statistic, Switch, Tag, Typography } from 'antd'
import { eq, mapValues, pick } from 'lodash-es'
import { createRef, FC, useRef, useState } from 'react';

import DropdownMenu from '@/components/DropdownMenu' // 表格操作下拉菜单
import {
  columnScrollX,
  CreateButton,
  createTimeColumn,
  operationColumn,
  statusColumn,
} from '@/components/TableColumns'
import {
  announcementAlready,
  delAnnouncement,
  getAnnouncementList,
  incrementAlreadyCount,
  setPinned,
} from '@/services/administrative/announcement'
import { formatPerfix, formatResponse, isSuccess, randomTagColor } from '@/utils'
import { AnnouncementTypeEnum } from '@/utils/const'
import { FLAG, INTERNATION, ROUTES } from '@/utils/enums'
import type {
  AlreadyParams,
  AnnouncementDetailRefsProps,
  PinnedParams,
  SearchParams,
} from '@/utils/types/administrative/announcement'

import AnnouncementDetail from './AnnouncementDetail'
import FormTemplate from './FormTemplate'

const { Text, Link } = Typography;

const TableTemplate: FC = () => {
  // 国际化工具
  const { formatMessage } = useIntl();
  // 表单实例
  const [form] = Form.useForm<API.ANNOUNCEMENT>();
  // 公告详情
  const announcementDetailRefs = createRef<AnnouncementDetailRefsProps>();
  // 是否显示 Modal
  const [openModal, { setTrue: setOpenModalTrue, setFalse: setOpenModalFalse }] = useBoolean(false)
  // 切换状态 loading
  const [pinnedLoading, { setTrue: setPinnedLoadingTrue, setFalse: setPinnedLoadingFalse }] = useBoolean(false);
  // 保存当前公告 id
  const [announcementId, setAnnouncementId] = useState<string>('')
  // 获取表格实例
  const tableRef = useRef<ActionType>();
  // 手动触发刷新表格
  function reloadTable() {
    tableRef?.current?.reload()
  }

  /**
   * @description: 获取活动公告列表
   * @author: 白雾茫茫丶
   */
  const { runAsync: fetchAnnouncementList } = useRequest(
    async (params) => formatResponse(await getAnnouncementList(params)), {
    manual: true,
  })

  /**
   * @description: 公告已读
   * @author: 白雾茫茫丶
   */
  const { run: fetchAnnouncementAlready } = useRequest(async (params) => await announcementAlready(params), {
    manual: true,
    onSuccess: ({ code }) => {
      if (isSuccess(code)) {
        reloadTable()
      }
    },
  })

  /**
   * @description: 已读次数
   * @author: 白雾茫茫丶
   */
  const { run: fetchIncrementAlreadyCount } = useRequest(async (params) => await incrementAlreadyCount(params), {
    manual: true,
  })

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
      title: formatMessage({ id: formatPerfix(ROUTES['ANNOUNCEMENT'], 'author') }),
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
      title: formatMessage({ id: formatPerfix(ROUTES.ANNOUNCEMENT, 'title') }),
      dataIndex: 'title',
      ellipsis: true,
      align: 'center',
      width: 260,
      render: (_, record) => {
        // 判断是否已读
        const isAlready = eq(record.already, FLAG.YES)
        return (
          <Badge dot={!isAlready} offset={[5, 5]}>
            <Link onClick={async () => {
              announcementDetailRefs?.current?.setCurrentRecord(record);
              announcementDetailRefs?.current?.setOpenDrawerTrue();
              // 请求参数
              const params: AlreadyParams = pick(record, 'announcement_id')
              // 已读次数 + 1
              fetchIncrementAlreadyCount(params)
              if (!isAlready) {
                fetchAnnouncementAlready(pick(record, 'announcement_id'))
              }
            }}>{record.title}</Link>
          </Badge>
        )
      },
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.ANNOUNCEMENT, 'type') }),
      dataIndex: 'type',
      filters: true,
      onFilter: true,
      width: 100,
      align: 'center',
      valueEnum: mapValues(AnnouncementTypeEnum, (item: string) =>
        formatMessage({ id: formatPerfix(ROUTES.ANNOUNCEMENT, `type.${item}`) })),
      render: (_, record) => {
        return <Tag color={randomTagColor()}>
          {
            formatMessage({ id: formatPerfix(ROUTES.ANNOUNCEMENT, `type.${AnnouncementTypeEnum[record.type]}`) })
          }
        </Tag>
      },
    },
    /* 状态 */
    statusColumn,
    {
      title: formatMessage({ id: formatPerfix(ROUTES.ANNOUNCEMENT, 'pinned') }),
      dataIndex: 'pinned',
      filters: true,
      onFilter: true,
      width: 160,
      align: 'center',
      valueEnum: {
        [FLAG.NO]: { text: formatMessage({ id: formatPerfix(INTERNATION.FLAG_NO) }), status: 'Default' },
        [FLAG.YES]: { text: formatMessage({ id: formatPerfix(INTERNATION.FLAG_YES) }), status: 'Processing' },
      },
      render: (_, record) => renderPinned(record),
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.ANNOUNCEMENT, 'read_counts') }),
      dataIndex: 'read_counts',
      width: 160,
      align: 'center',
      render: (_, record) => (
        <Statistic value={record.read_counts} prefix={<EyeOutlined />} valueStyle={{ fontSize: 18 }} />
      ),
    },
    /* 创建时间 */
    createTimeColumn,
    /* 操作项 */
    {
      ...operationColumn,
      render: (_, record) => (
        <DropdownMenu
          pathName={ROUTES.ANNOUNCEMENT}
          editCallback={() => {
            form.setFieldsValue(record);
            setOpenModalTrue();
          }}
          deleteParams={{
            request: delAnnouncement,
            id: record.announcement_id,
          }}
          reloadTable={reloadTable}
        />
      ),
    },
  ]
  return (
    <>
      <ProTable<API.ANNOUNCEMENT, SearchParams>
        actionRef={tableRef}
        columns={columns}
        rowKey="announcement_id"
        request={async (params: SearchParams) => fetchAnnouncementList(params)
        }
        pagination={{ pageSize: 8 }}
        // 工具栏
        toolBarRender={() => [
          // 新增按钮
          <CreateButton
            key="create"
            pathName={ROUTES.ANNOUNCEMENT}
            callback={() => setOpenModalTrue()} />,
        ]}
        scroll={{ x: columnScrollX(columns) }}
      />
      {/* 抽屉表单 */}
      <Form form={form}>
        <FormTemplate reloadTable={reloadTable} open={openModal} setOpenModalFalse={setOpenModalFalse} />
      </Form>
      {/* 公告详情 */}
      <AnnouncementDetail onRef={announcementDetailRefs} />
    </>
  )
}
export default TableTemplate
