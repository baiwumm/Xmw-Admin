/*
 * @Description: 岗位管理-表格列表
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-05 09:41:58
 */
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Icon, useIntl } from '@umijs/max';
import { useBoolean, useRequest } from 'ahooks';
import { Avatar, Form, Space, Tag } from 'antd';
import { get } from 'lodash-es';
import React, { FC, useRef } from 'react';

import DropdownMenu from '@/components/DropdownMenu';
import {
  columnScrollX,
  CreateButton,
  createTimeColumn,
  createTimeInSearch,
  describeColumn,
  operationColumn,
  sortColumn,
} from '@/components/TableColumns';
import { delJobs, getJobsList } from '@/services/administrative/jobs-management'; // 岗位管理接口
import { getOrganizationList } from '@/services/administrative/organization'; // 组织管理接口
import { formatPerfix, formatResponse } from '@/utils';
import { INTERNATION, ROUTES } from '@/utils/enums';
import type { SearchParams } from '@/utils/types/administrative/jobs-management';

import FormTemplate from './FormTemplate'; // 表单组件

const TableTemplate: FC = () => {
  const { formatMessage } = useIntl();
  // 表单实例
  const [form] = Form.useForm<API.JOBSMANAGEMENT>();
  // 获取表格实例
  const tableRef = useRef<ActionType>();
  // 是否显示抽屉表单
  const [openDrawer, { setTrue: setOpenDrawerTrue, setFalse: setOpenDrawerFalse }] =
    useBoolean(false);
  // 跟随主题色变化
  const PrimaryColor = useEmotionCss(({ token }) => {
    return { color: token.colorPrimary };
  });
  // 手动触发刷新表格
  function reloadTable() {
    tableRef?.current?.reload();
  }

  /**
   * @description: 获取组织树形数据
   * @author: 白雾茫茫丶
   */
  const { data: orgTree } = useRequest(async () => get(await getOrganizationList(), 'data', []));

  /**
   * @description: 获取岗位列表
   * @author: 白雾茫茫丶
   */
  const { data: jobsTree, runAsync: fetchJobsList } = useRequest(
    async (params) => formatResponse(await getJobsList(params)),
    {
      manual: true,
    },
  );

  /**
   * @description: proTable columns 配置项
   * @Author: 白雾茫茫丶
   */
  const columns: ProColumns<API.JOBSMANAGEMENT>[] = [
    {
      title: formatMessage({ id: `${formatPerfix(ROUTES.JOBSMANAGEMENT)}.jobs_name` }),
      dataIndex: 'jobs_name',
      ellipsis: true,
      width: 120,
      render: (text) => (
        <Space>
          <Icon
            icon="ri:contacts-book-3-line"
            style={{ fontSize: '16px' }}
            className={PrimaryColor}
          />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.JOBSMANAGEMENT, 'org_name') }),
      dataIndex: 'org_id',
      ellipsis: true,
      valueType: 'treeSelect',
      fieldProps: {
        allowClear: true,
        fieldNames: {
          label: 'org_name',
          value: 'org_id',
        },
        options: orgTree,
        placeholder: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }),
      },
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Space>
          {record.org_logo ? (
            <Avatar src={record.org_logo}></Avatar>
          ) : (
            <Icon icon="ri:exchange-2-line" className={PrimaryColor} />
          )}
          <Tag color="geekblue">{record.org_name}</Tag>
        </Space>
      ),
    },
    /* 排序 */
    sortColumn,
    // 创建时间
    createTimeColumn,
    /* 创建时间-搜索 */
    createTimeInSearch,
    /* 描述 */
    describeColumn,
    {
      ...operationColumn,
      render: (_, record) => (
        <DropdownMenu
          pathName={ROUTES.JOBSMANAGEMENT}
          addChildCallback={() => {
            form.setFieldValue('parent_id', record.jobs_id);
            setOpenDrawerTrue();
          }}
          editCallback={() => {
            form.setFieldsValue(record);
            setOpenDrawerTrue();
          }}
          deleteParams={{
            request: delJobs,
            id: record.jobs_id,
          }}
          reloadTable={reloadTable}
        />
      ),
    },
  ];

  return (
    <>
      <ProTable<API.JOBSMANAGEMENT, SearchParams>
        actionRef={tableRef}
        columns={columns}
        request={async (params: SearchParams) => fetchJobsList(params)}
        rowKey="jobs_id"
        pagination={false}
        // 工具栏
        toolBarRender={() => [
          // 新增按钮
          <CreateButton
            key="create"
            pathName={ROUTES.JOBSMANAGEMENT}
            callback={() => setOpenDrawerTrue()}
          />,
        ]}
        scroll={{ x: columnScrollX(columns) }}
      />
      {/* 抽屉表单 */}
      <Form form={form}>
        <FormTemplate
          treeData={get(jobsTree, 'data', [])}
          reloadTable={reloadTable}
          orgTree={orgTree || []}
          open={openDrawer}
          setOpenDrawerFalse={setOpenDrawerFalse}
        />
      </Form>
    </>
  );
};
export default TableTemplate;
