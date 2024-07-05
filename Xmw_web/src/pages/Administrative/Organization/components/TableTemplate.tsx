/*
 * @Description: 组织管理-表格列表
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-05 09:44:08
 */
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Icon, useIntl } from '@umijs/max';
import { useBoolean, useRequest } from 'ahooks';
import { Form, Space, Tag } from 'antd';
import { get, mapValues } from 'lodash-es';
import { FC, useRef } from 'react';

import DropdownMenu from '@/components/DropdownMenu'; // 表格操作下拉菜单
import {
  columnScrollX,
  CreateButton,
  createTimeColumn,
  createTimeInSearch,
  describeColumn,
  operationColumn,
  sortColumn,
  statusColumn,
} from '@/components/TableColumns';
import { delOrganization, getOrganizationList } from '@/services/administrative/organization';
import { formatPerfix, formatResponse, randomTagColor } from '@/utils';
import { OrgTypeEnum } from '@/utils/const';
import { ROUTES } from '@/utils/enums';
import type { SearchParams } from '@/utils/types/administrative/organization';

import FormTemplate from './FormTemplate'; // 表单组件

const TableTemplate: FC = () => {
  // 国际化工具
  const { formatMessage } = useIntl();
  // 表单实例
  const [form] = Form.useForm<API.ORGANIZATION>();
  // 获取表格实例
  const tableRef = useRef<ActionType>();
  // 是否显示抽屉表单
  const [openDrawer, { setTrue: setOpenDrawerTrue, setFalse: setOpenDrawerFalse }] =
    useBoolean(false);
  // 跟随主题色变化
  const PrimaryColor = useEmotionCss(({ token }) => {
    return { color: token.colorPrimary, fontSize: 16 };
  });
  // 手动触发刷新表格
  function reloadTable() {
    tableRef?.current?.reload();
  }

  /**
   * @description: 获取组织列表
   * @author: 白雾茫茫丶
   */
  const { data: orgTree, runAsync: fetchOrganizationList } = useRequest(
    async (params) => formatResponse(await getOrganizationList(params)),
    {
      manual: true,
    },
  );

  /**
   * @description: proTable columns 配置项
   * @author: 白雾茫茫丶
   */
  const columns: ProColumns<API.ORGANIZATION>[] = [
    {
      title: formatMessage({ id: formatPerfix(ROUTES.ORGANIZATION, 'org_name') }),
      dataIndex: 'org_name',
      ellipsis: true,
      width: 140,
      render: (text) => (
        <Space>
          <Icon icon="ri:exchange-2-line" className={PrimaryColor} />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.ORGANIZATION, 'org_code') }),
      dataIndex: 'org_code',
      ellipsis: true,
      width: 120,
      align: 'center',
      render: (text) => <Tag color={randomTagColor()}>{text}</Tag>,
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.ORGANIZATION, 'org_logo') }),
      dataIndex: 'org_logo',
      valueType: {
        type: 'image',
        width: 60,
      },
      align: 'center',
      hideInSearch: true,
      width: 120,
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.ORGANIZATION, 'org_type') }),
      dataIndex: 'org_type',
      filters: true,
      onFilter: true,
      width: 100,
      align: 'center',
      valueEnum: mapValues(OrgTypeEnum, (item: string) =>
        formatMessage({ id: formatPerfix(ROUTES.ORGANIZATION, `org_type.${item}`) }),
      ),
      render: (_, record) => (
        <Tag color={randomTagColor()}>
          {formatMessage({
            id: formatPerfix(ROUTES.ORGANIZATION, `org_type.${OrgTypeEnum[record.org_type]}`),
          })}
        </Tag>
      ),
    },
    /* 状态 */
    statusColumn,
    /* 排序 */
    sortColumn,
    /* 创建时间 */
    createTimeColumn,
    /* 创建时间-搜索 */
    createTimeInSearch,
    /* 描述 */
    describeColumn,
    {
      ...operationColumn,
      render: (_, record) => (
        <DropdownMenu
          pathName={ROUTES.ORGANIZATION}
          addChildCallback={() => {
            form.setFieldValue('parent_id', record.org_id);
            setOpenDrawerTrue();
          }}
          editCallback={() => {
            form.setFieldsValue(record);
            setOpenDrawerTrue();
          }}
          deleteParams={{
            request: delOrganization,
            id: record.org_id,
          }}
          reloadTable={reloadTable}
        />
      ),
    },
  ];

  return (
    <>
      <ProTable<API.ORGANIZATION, SearchParams>
        actionRef={tableRef}
        columns={columns}
        request={async (params: SearchParams) => fetchOrganizationList(params)}
        rowKey="org_id"
        pagination={false}
        // 工具栏
        toolBarRender={() => [
          // 新增按钮
          <CreateButton
            key="create"
            pathName={ROUTES.ORGANIZATION}
            callback={() => setOpenDrawerTrue()}
          />,
        ]}
        scroll={{ x: columnScrollX(columns) }}
      />
      {/* 抽屉表单 */}
      <Form form={form}>
        <FormTemplate
          treeData={get(orgTree, 'data', [])}
          reloadTable={reloadTable}
          open={openDrawer}
          setOpenDrawerFalse={setOpenDrawerFalse}
        />
      </Form>
    </>
  );
};
export default TableTemplate;
