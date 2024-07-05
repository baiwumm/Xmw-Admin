/*
 * @Description: 用户管理-表格列表
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-05 14:14:43
 */
import {
  ActionType,
  ColumnsState,
  ProColumns,
  ProFormInstance,
  ProTable,
} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Icon, useIntl } from '@umijs/max';
import { useBoolean, useRequest } from 'ahooks';
import { App, Popconfirm, Space, Switch, Tag } from 'antd';
import { cloneDeep } from 'lodash-es';
import { FC, MutableRefObject, useRef, useState } from 'react';

import DropdownMenu from '@/components/DropdownMenu'; // 表格操作下拉菜单
import {
  columnScrollX,
  CreateButton,
  createTimeColumn,
  createTimeInSearch,
  operationColumn,
  sortColumn,
  statusColumn,
} from '@/components/TableColumns';
import { delUser, getUserList, setUserStatus } from '@/services/system/user-management'; // 用户管理接口
import { decryptionAesPsd, formatPerfix, formatResponse, renderColumnsStateMap } from '@/utils';
import { INTERNATION, ROUTES, SEX, STATUS } from '@/utils/enums';
import type { SearchParams } from '@/utils/types/system/user-management';

import FormTemplate from './FormTemplate'; // 表单组件

const TableTemplate: FC = () => {
  const { formatMessage } = useIntl();
  // hooks 调用
  const { message } = App.useApp();
  // 分步表单实例
  const stepFormMapRef = useRef<MutableRefObject<ProFormInstance>[]>([]);
  // 获取表格实例
  const tableRef = useRef<ActionType>();
  // 设置用户状态
  const [userLoading, { setTrue: setUserLoadingTrue, setFalse: setUserLoadingFalse }] =
    useBoolean(false);
  const [userId, setUserId] = useState<string>('');
  // Modal 框显隐
  const [modalVisible, { setTrue: setModalVisibleTrue, setFalse: setModalVisibleFalse }] =
    useBoolean(false);
  // 受控的表格设置栏
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>(
    renderColumnsStateMap(['en_name', 'sort', 'age', 'email']),
  );
  // 跟随主题色变化
  const PrimaryColor = useEmotionCss(({ token }) => {
    return { color: token.colorPrimary, fontSize: 16 };
  });
  // 手动触发刷新表格
  function reloadTable() {
    tableRef?.current?.reload();
  }

  /**
   * @description: 获取用户管理列表
   * @author: 白雾茫茫丶
   */
  const { runAsync: fetchUserList } = useRequest(
    async (params) => formatResponse(await getUserList(params)),
    {
      manual: true,
    },
  );

  // 设置用户状态
  const changeUserStatus = async ({ user_id, status }: API.USERMANAGEMENT) => {
    await setUserStatus({
      user_id,
      status: status === STATUS.DISABLE ? STATUS.NORMAL : STATUS.DISABLE,
    })
      .then((result) => {
        message.success(result.msg);
        reloadTable();
      })
      .finally(() => {
        setUserLoadingFalse();
      });
  };

  // 渲染设置角色状态
  const renderRoleStatus = (record: API.USERMANAGEMENT) => (
    <Popconfirm
      title={formatMessage({ id: INTERNATION.POPCONFIRM_TITLE })}
      open={userId === record.user_id && userLoading}
      onConfirm={() => changeUserStatus(record)}
      onCancel={() => setUserLoadingFalse()}
      key="popconfirm"
    >
      <Switch
        checkedChildren={formatMessage({ id: INTERNATION.STATUS_NORMAL })}
        unCheckedChildren={formatMessage({ id: INTERNATION.STATUS_DISABLE })}
        checked={record.status === STATUS.NORMAL}
        loading={userId === record.user_id && userLoading}
        onChange={() => {
          setUserLoadingTrue();
          setUserId(record.user_id);
        }}
      />
    </Popconfirm>
  );

  /**
   * @description: proTable columns 配置项
   * @author: 白雾茫茫丶
   */
  const columns: ProColumns<API.USERMANAGEMENT>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      align: 'center',
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'user_name') }),
      dataIndex: 'user_name',
      ellipsis: true,
      width: 100,
      align: 'center',
      render: (text) => (
        <Tag>
          <Space size={4}>
            <Icon icon="ri:user-line" className={PrimaryColor} />
            <span>{text}</span>
          </Space>
        </Tag>
      ),
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'cn_name') }),
      dataIndex: 'cn_name',
      hideInSearch: true,
      ellipsis: true,
      align: 'center',
      width: 80,
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'en_name') }),
      dataIndex: 'en_name',
      hideInSearch: true,
      ellipsis: true,
      align: 'center',
      width: 80,
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'avatar_url') }),
      dataIndex: 'avatar_url',
      key: 'avatar_url',
      valueType: 'image',
      width: 80,
      hideInSearch: true,
      align: 'center',
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'sex') }),
      dataIndex: 'sex',
      ellipsis: true,
      align: 'center',
      width: 60,
      filters: true,
      onFilter: true,
      valueEnum: {
        [SEX.FEMALE]: {
          text: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'sex.female') }),
          status: 'Default',
        },
        [SEX.MALE]: {
          text: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'sex.male') }),
          status: 'Processing',
        },
        [SEX.PRIVACY]: {
          text: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'sex.secret') }),
          status: 'Processing',
        },
      },
      render: (_, record) => {
        const colors: Record<string, string> = { 0: '#ff45cb', 1: '#0091ff' };
        const styles = { fontSize: 20, display: 'inline-block' };
        return {
          [SEX.FEMALE]: (
            <Icon icon="ri:women-line" style={{ color: colors[record.sex], ...styles }} />
          ),
          [SEX.MALE]: <Icon icon="ri:men-line" style={{ color: colors[record.sex], ...styles }} />,
          [SEX.PRIVACY]: (
            <Icon icon="ri:lock-unlock-line" style={styles} className={PrimaryColor} />
          ),
        }[record.sex];
      },
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'work_no') }),
      dataIndex: 'work_no',
      hideInSearch: true,
      ellipsis: true,
      align: 'center',
      width: 80,
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'role_id') }),
      dataIndex: 'role_name',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
      align: 'center',
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
      title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'org_id') }),
      dataIndex: 'org_name',
      hideInSearch: true,
      ellipsis: true,
      width: 100,
      align: 'center',
      render: (text) => (
        <Tag>
          <Space>
            <Icon icon="ri:exchange-2-line" className={PrimaryColor} />
            <span>{text}</span>
          </Space>
        </Tag>
      ),
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'jobs_id') }),
      dataIndex: 'jobs_name',
      hideInSearch: true,
      ellipsis: true,
      width: 100,
      align: 'center',
      render: (text) => (
        <Tag>
          <Space>
            <Icon icon="ri:contacts-book-3-line" className={PrimaryColor} />
            <span>{text}</span>
          </Space>
        </Tag>
      ),
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'age') }),
      dataIndex: 'age',
      hideInSearch: true,
      ellipsis: true,
      align: 'center',
      width: 60,
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'phone') }),
      dataIndex: 'phone',
      hideInSearch: true,
      width: 100,
      ellipsis: true,
      align: 'center',
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'email') }),
      dataIndex: 'email',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
      align: 'center',
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
    {
      ...operationColumn,
      render: (_, record) => (
        <DropdownMenu
          pathName={ROUTES.USERMANAGEMENT}
          editCallback={() => {
            const result = cloneDeep(record);
            // 表单数据回显处理,密码解密
            result.password = result.confirmPassword = decryptionAesPsd(record.password);
            // 编辑场景下需要使用formMapRef循环设置formData
            stepFormMapRef?.current?.forEach((formInstanceRef) => {
              formInstanceRef?.current?.setFieldsValue(result);
            });
            setModalVisibleTrue();
          }}
          deleteParams={{
            request: delUser,
            id: record.user_id,
          }}
          reloadTable={reloadTable}
        />
      ),
    },
  ];

  return (
    <>
      <ProTable<API.USERMANAGEMENT, SearchParams>
        actionRef={tableRef}
        columns={columns}
        request={async (params: SearchParams) => fetchUserList(params)}
        rowKey="user_id"
        pagination={{ pageSize: 5 }}
        columnsState={{
          value: columnsStateMap,
          onChange: setColumnsStateMap,
        }}
        // 工具栏
        toolBarRender={() => [
          // 新增按钮
          <CreateButton
            key="create"
            pathName={ROUTES.USERMANAGEMENT}
            callback={() => setModalVisibleTrue()}
          />,
        ]}
        scroll={{ x: columnScrollX(columns) }}
      />
      {/* 分步表单 */}
      <FormTemplate
        reloadTable={reloadTable}
        modalVisible={modalVisible}
        setModalVisibleFalse={setModalVisibleFalse}
        stepFormMapRef={stepFormMapRef}
      />
    </>
  );
};
export default TableTemplate;
