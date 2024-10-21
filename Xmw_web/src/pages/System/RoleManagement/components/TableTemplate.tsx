/*
 * @Description: 角色管理-表格列表
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-21 17:11:29
 */
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Icon, useIntl } from '@umijs/max';
import { useBoolean, useRequest } from 'ahooks';
import { App, Form, Popconfirm, Space, Switch, Tag } from 'antd';
import { filter, includes, map } from 'lodash-es';
import { FC, useRef, useState } from 'react';

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
import { delRole, getRoleList, setRoleStatus } from '@/services/system/role-management'; // 角色管理接口
import { formatPerfix, formatResponse } from '@/utils';
import { INTERNATION, ROUTES, STATUS } from '@/utils/enums';
import type { RoleStatusParams, SearchParams } from '@/utils/types/system/role-management';

import FormTemplate from './FormTemplate'; // 表单组件

const TableTemplate: FC = () => {
  const { formatMessage } = useIntl();
  // hooks 调用
  const { message } = App.useApp();
  // 表单实例
  const [form] = Form.useForm<API.ROLEMANAGEMENT>();
  // 获取表格实例
  const tableRef = useRef<ActionType>();
  const [roleLoading, { setTrue: setRoleLoadingTrue, setFalse: setRoleLoadingFalse }] =
    useBoolean(false);
  const [roleId, setRoleId] = useState<string>('');
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
   * @description: 获取角色管理列表
   * @author: 白雾茫茫丶
   */
  const { runAsync: fetchRoleList } = useRequest(
    async (params) => formatResponse(await getRoleList(params)),
    {
      manual: true,
    },
  );

  // 设置角色状态
  const changeRoleStatus = async ({ role_id, status }: RoleStatusParams) => {
    await setRoleStatus({
      role_id,
      status: status === STATUS.DISABLE ? STATUS.NORMAL : STATUS.DISABLE,
    })
      .then((result) => {
        message.success(result.msg);
        reloadTable();
      })
      .finally(() => {
        setRoleLoadingFalse();
      });
  };

  // 渲染设置角色状态
  const renderRoleStatus = (record: API.ROLEMANAGEMENT) => (
    <Popconfirm
      title={formatMessage({ id: INTERNATION.POPCONFIRM_TITLE })}
      open={roleId === record.role_id && roleLoading}
      onConfirm={() => changeRoleStatus(record)}
      onCancel={() => setRoleLoadingFalse()}
      key="popconfirm"
    >
      <Switch
        checkedChildren={formatMessage({ id: INTERNATION.STATUS_NORMAL })}
        unCheckedChildren={formatMessage({ id: INTERNATION.STATUS_DISABLE })}
        checked={record.status === STATUS.NORMAL}
        loading={roleId === record.role_id && roleLoading}
        onChange={() => {
          setRoleLoadingTrue();
          setRoleId(record.role_id);
        }}
      />
    </Popconfirm>
  );
  /**
   * @description: proTable columns 配置项
   * @return {*}
   * @author: 白雾茫茫丶
   */
  const columns: ProColumns<API.ROLEMANAGEMENT>[] = [
    {
      title: formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'role_name') }),
      dataIndex: 'role_name',
      ellipsis: true,
      width: 160,
      render: (text) => (
        <Tag>
          <Space>
            <Icon icon="ri:shield-user-line" className={PrimaryColor} />
            <span>{text}</span>
          </Space>
        </Tag>
      ),
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'role_code') }),
      dataIndex: 'role_code',
      width: 140,
      ellipsis: true,
    },
    /* 状态 */
    {
      ...statusColumn,
      render: (_, record) => renderRoleStatus(record),
    },
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
          pathName={ROUTES.ROLEMANAGEMENT}
          editCallback={() => {
            // 获取全部勾选的节点
            const checkedKeys = map(record.menu_permission, 'menu_id');
            // 获取勾选节点的父节点
            const parentIds = map(map(record.menu_permission, 'menuInfo'), 'parent_id');
            // 过滤掉半勾选的节点
            const menus = filter(checkedKeys, (key: string) => !includes(parentIds, key));
            form.setFieldsValue({
              ...record,
              menu_permission: menus,
            });
            setOpenDrawerTrue();
          }}
          deleteParams={{
            request: delRole,
            id: record.role_id,
          }}
          reloadTable={reloadTable}
        />
      ),
    },
  ];

  return (
    <>
      <ProTable<API.ROLEMANAGEMENT, SearchParams>
        actionRef={tableRef}
        columns={columns}
        request={async (params: SearchParams) => fetchRoleList(params)}
        rowKey="role_id"
        pagination={{
          pageSize: 5,
        }}
        // 工具栏
        toolBarRender={() => [
          // 新增按钮
          <CreateButton
            key="create"
            pathName={ROUTES.ROLEMANAGEMENT}
            callback={() => setOpenDrawerTrue()}
          />,
        ]}
        scroll={{ x: columnScrollX(columns) }}
      />
      {/* 抽屉表单 */}
      <Form form={form}>
        <FormTemplate
          reloadTable={reloadTable}
          open={openDrawer}
          setOpenDrawerFalse={setOpenDrawerFalse}
        />
      </Form>
    </>
  );
};
export default TableTemplate;
