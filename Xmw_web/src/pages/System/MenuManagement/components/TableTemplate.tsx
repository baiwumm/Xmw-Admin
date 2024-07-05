/*
 * @Description: 菜单管理-表格列表
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-04 14:58:15
 */
import { ActionType, ColumnsState, ProColumns, ProTable } from '@ant-design/pro-components';
import { getLocale, Icon, useIntl } from '@umijs/max';
import { useBoolean, useRequest } from 'ahooks';
import { Form, Space, Tag } from 'antd';
import { drop, find, get, map, mapValues } from 'lodash-es';
import React, { FC, useRef, useState } from 'react';

import DropdownMenu from '@/components/DropdownMenu';
import {
  columnScrollX,
  CreateButton,
  createTimeColumn,
  createTimeInSearch,
  flagColumn,
  operationColumn,
  sortColumn,
  statusColumn,
} from '@/components/TableColumns';
import { delMenu, getMenuList } from '@/services/system/menu-management';
import { formatPerfix, formatResponse, randomTagColor, renderColumnsStateMap } from '@/utils';
import { LAYOUT_TYPE_OPTS, MenuTypeEnum, NAV_THEME_OPTS } from '@/utils/const';
import { ROUTES } from '@/utils/enums';
import type { Langs } from '@/utils/types';
import type { SearchParams } from '@/utils/types/system/menu-management';

import FormTemplate from './FormTemplate'; // 表单组件

/**
 * @description: 默认不显示的 column 项
 * @author: 白雾茫茫丶
 */
const MENU_CFG = [
  'redirect',
  'hideChildrenInMenu',
  'hideInMenu',
  'hideInBreadcrumb',
  'headerRender',
  'footerRender',
  'menuRender',
  'menuHeaderRender',
  'flatMenu',
  'fixedHeader',
  'fixSiderbar',
];

const TableTemplate: FC = () => {
  const { formatMessage } = useIntl();
  // 表单实例
  const [form] = Form.useForm<API.JOBSMANAGEMENT>();
  // 获取当前语言
  const locale: Langs = getLocale();
  // 获取表格实例
  const tableRef = useRef<ActionType>();
  // 受控的表格设置栏
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>(
    renderColumnsStateMap(MENU_CFG),
  );
  // 是否显示抽屉表单
  const [openDrawer, { setTrue: setOpenDrawerTrue, setFalse: setOpenDrawerFalse }] =
    useBoolean(false);
  // 手动触发刷新表格
  function reloadTable() {
    tableRef?.current?.reload();
  }

  /**
   * @description: 获取菜单列表
   * @author: 白雾茫茫丶
   */
  const { data: menuTree, runAsync: fetchMenuList } = useRequest(
    async (params) => formatResponse(await getMenuList(params)),
    {
      manual: true,
    },
  );

  /**
   * @description: proTable columns 配置项
   * @author: 白雾茫茫丶
   */
  const columns: ProColumns<API.MENUMANAGEMENT>[] = [
    /* 菜单名称 */
    {
      title: formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'name') }),
      dataIndex: locale,
      ellipsis: true,
      hideInSearch: true,
      fixed: 'left',
      render: (_, record) => {
        return record.redirect ? (
          <Tag>{formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'redirect') })}</Tag>
        ) : (
          <Space>
            {record.icon ? (
              <Tag>
                <Space size={4}>
                  <Icon icon={record.icon} style={{ fontSize: 16 }} />
                  <span>{record[locale]}</span>
                </Space>
              </Tag>
            ) : (
              <Tag>{record[locale]}</Tag>
            )}
          </Space>
        );
      },
    },
    /* 菜单类型 */
    {
      title: formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'menu_type') }),
      dataIndex: 'menu_type',
      width: 120,
      align: 'center',
      filters: true,
      onFilter: true,
      valueEnum: mapValues(MenuTypeEnum, (item: string) =>
        formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, `menu_type.${item}`) }),
      ),
      render: (_, record) => (
        <Tag color={randomTagColor()}>
          {formatMessage({
            id: formatPerfix(ROUTES.MENUMANAGEMENT, `menu_type.${MenuTypeEnum[record.menu_type]}`),
          })}
        </Tag>
      ),
    },
    /* 路由地址 */
    {
      title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.path` }),
      dataIndex: 'path',
      width: 120,
      ellipsis: true,
      align: 'center',
      hideInSearch: true,
    },
    /* 重定向 */
    {
      title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.redirect` }),
      dataIndex: 'redirect',
      ellipsis: true,
      width: 120,
      align: 'center',
      hideInSearch: true,
    },
    /* 组件路径 */
    {
      title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.component` }),
      dataIndex: 'component',
      width: 120,
      ellipsis: true,
      align: 'center',
      hideInSearch: true,
    },
    /* 权限标识 */
    {
      title: formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'permission') }),
      dataIndex: 'permission',
      ellipsis: true,
      tip: formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'permission.tooltip') }),
      hideInSearch: true,
      width: 250,
      align: 'center',
      render: (text) => <Tag color={randomTagColor()}>{text}</Tag>,
    },
    /* 状态 */
    statusColumn,
    /* 排序 */
    sortColumn,
    /* 显示 layout 布局、菜单主题、顶部菜单主题 */
    ...map(
      ['navTheme', 'headerTheme', 'layout'],
      (field: keyof API.MENUMANAGEMENT): ProColumns => ({
        title: formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, field) }),
        dataIndex: field,
        ellipsis: true,
        hideInSearch: true,
        width: 100,
        align: 'center',
        render: (_, record: API.MENUMANAGEMENT) => (
          <Tag color={randomTagColor()}>
            {get(
              find(field === 'layout' ? LAYOUT_TYPE_OPTS : NAV_THEME_OPTS, {
                value: record[field],
              }),
              'label',
              '--',
            )}
          </Tag>
        ),
      }),
    ),
    /* 路由配置 */
    ...map(drop(MENU_CFG), (fidle: string) => flagColumn(fidle)),
    // 创建时间
    createTimeColumn,
    /* 创建时间-搜索 */
    createTimeInSearch,
    {
      ...operationColumn,
      render: (_, record) => (
        <DropdownMenu
          pathName={ROUTES.MENUMANAGEMENT}
          addChildCallback={() => {
            form.setFieldValue('parent_id', record.menu_id);
            setOpenDrawerTrue();
          }}
          editCallback={() => {
            form.setFieldsValue(record);
            setOpenDrawerTrue();
          }}
          deleteParams={{
            request: delMenu,
            id: record.menu_id,
          }}
          reloadTable={reloadTable}
        />
      ),
    },
  ];

  return (
    <>
      <ProTable<API.MENUMANAGEMENT, SearchParams>
        actionRef={tableRef}
        columns={columns}
        request={async (params: SearchParams) => fetchMenuList(params)}
        rowKey="menu_id"
        pagination={false}
        columnsState={{
          value: columnsStateMap,
          onChange: setColumnsStateMap,
        }}
        // 工具栏
        toolBarRender={() => [
          // 新增按钮
          <CreateButton
            key="create"
            pathName={ROUTES.MENUMANAGEMENT}
            callback={() => setOpenDrawerTrue()}
          />,
        ]}
        scroll={{ x: columnScrollX(columns) }}
      />
      {/* 抽屉表单 */}
      <Form form={form}>
        <FormTemplate
          treeData={get(menuTree, 'data', [])}
          reloadTable={reloadTable}
          open={openDrawer}
          setOpenDrawerFalse={setOpenDrawerFalse}
        />
      </Form>
    </>
  );
};
export default TableTemplate;
