/*
 * @Description: 国际化-表格列表
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-05 14:17:25
 */
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Icon, useIntl } from '@umijs/max';
import { useBoolean, useRequest } from 'ahooks';
import { Form, Space, Tag } from 'antd';
import { get } from 'lodash-es';
import { FC, useRef } from 'react';

import DropdownMenu from '@/components/DropdownMenu'; // 表格操作下拉菜单
import {
  columnScrollX,
  CreateButton,
  createTimeColumn,
  createTimeInSearch,
  operationColumn,
  sortColumn,
} from '@/components/TableColumns';
import { delInternational, getInternationalList } from '@/services/system/internationalization'; // 国际化接口
import { formatPerfix, formatResponse } from '@/utils';
import { LANGS, ROUTES } from '@/utils/enums';
import type { SearchParams } from '@/utils/types/system/internationalization';

import FormTemplate from './FormTemplate'; // 表单组件

const TableTemplate: FC = () => {
  // 国际化工具
  const { formatMessage } = useIntl();
  // 表单实例
  const [form] = Form.useForm<API.ANNOUNCEMENT>();
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
   * @description: 获取国际化列表
   * @author: 白雾茫茫丶
   */
  const { data: internationalList, runAsync: fetchInternationalList } = useRequest(
    async (params) => formatResponse(await getInternationalList(params)),
    {
      manual: true,
    },
  );

  /**
   * @description: proTable columns 配置项
   * @author: 白雾茫茫丶
   */
  const columns: ProColumns<API.INTERNATIONALIZATION>[] = [
    {
      title: formatMessage({ id: formatPerfix(ROUTES.INTERNATIONALIZATION, 'name') }),
      dataIndex: 'name',
      ellipsis: true,
      width: 140,
      align: 'center',
      render: (text) => (
        <Tag>
          <Space size={4}>
            <Icon icon="ri:font-size-2" className={PrimaryColor} />
            <span>{text}</span>
          </Space>
        </Tag>
      ),
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.INTERNATIONALIZATION, LANGS.CN) }),
      dataIndex: LANGS.CN,
      ellipsis: true,
      width: 120,
      align: 'center',
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.INTERNATIONALIZATION, LANGS.US) }),
      dataIndex: LANGS.US,
      ellipsis: true,
      width: 120,
      align: 'center',
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.INTERNATIONALIZATION, LANGS.JP) }),
      dataIndex: LANGS.JP,
      ellipsis: true,
      width: 120,
      align: 'center',
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.INTERNATIONALIZATION, LANGS.TW) }),
      dataIndex: LANGS.TW,
      ellipsis: true,
      width: 120,
      align: 'center',
      hideInSearch: true,
    },
    /* 排序 */
    sortColumn,
    /* 创建时间 */
    createTimeColumn,
    /* 创建时间-搜索 */
    createTimeInSearch,
    {
      ...operationColumn,
      render: (_, record) => (
        <DropdownMenu
          pathName={ROUTES.INTERNATIONALIZATION}
          addChildCallback={() => {
            form.setFieldValue('parent_id', record.id);
            setOpenDrawerTrue();
          }}
          editCallback={() => {
            form.setFieldsValue(record);
            setOpenDrawerTrue();
          }}
          deleteParams={{
            request: delInternational,
            id: record.id,
          }}
          reloadTable={reloadTable}
        />
      ),
    },
  ];

  return (
    <>
      <ProTable<API.INTERNATIONALIZATION, SearchParams>
        actionRef={tableRef}
        columns={columns}
        request={async (params: SearchParams) => fetchInternationalList(params)}
        rowKey="id"
        pagination={false}
        // 工具栏
        toolBarRender={() => [
          // 新增按钮
          <CreateButton
            key="create"
            pathName={ROUTES.INTERNATIONALIZATION}
            callback={() => setOpenDrawerTrue()}
          />,
        ]}
        scroll={{ x: columnScrollX(columns) }}
      />
      {/* 抽屉表单 */}
      <Form form={form}>
        <FormTemplate
          treeData={get(internationalList, 'data', [])}
          reloadTable={reloadTable}
          open={openDrawer}
          setOpenDrawerFalse={setOpenDrawerFalse}
        />
      </Form>
    </>
  );
};
export default TableTemplate;
