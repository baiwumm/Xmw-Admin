/*
 * @Description: 表格列公共配置项
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-09-18 14:13:44
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-05 11:13:06
 */
import { ProColumns } from '@ant-design/pro-components';
import { Access, FormattedMessage, Icon, useAccess } from '@umijs/max';
import { Button, Space, Tag } from 'antd';
import dayjs from 'dayjs';
import { find, get, reduce, toNumber } from 'lodash-es';
import { FC } from 'react';

import { formatPathName, formatPerfix, getLocalStorageItem, randomTagColor } from '@/utils';
import { FLAG_OPTS } from '@/utils/const';
import { INTERNATION, LOCAL_STORAGE, OPERATION, ROUTES, STATUS } from '@/utils/enums';
import permissions from '@/utils/permission';
import type { PathNames } from '@/utils/types';

import defaultSettings from '../../../config/defaultSettings';

/**
 * @description: 状态
 * @author: 白雾茫茫丶
 */
export const statusColumn: ProColumns = {
  title: <FormattedMessage id={INTERNATION.STATUS} />,
  dataIndex: 'status',
  width: 100,
  filters: true,
  onFilter: true,
  align: 'center',
  valueEnum: {
    [STATUS.DISABLE]: {
      text: <FormattedMessage id={INTERNATION.STATUS_DISABLE} />,
      status: 'Default',
    },
    [STATUS.NORMAL]: {
      text: <FormattedMessage id={INTERNATION.STATUS_NORMAL} />,
      status: 'Processing',
    },
  },
};

/**
 * @description: 排序
 * @author: 白雾茫茫丶
 */
export const sortColumn: ProColumns = {
  title: <FormattedMessage id={INTERNATION.SORT} />,
  dataIndex: 'sort',
  ellipsis: true,
  hideInSearch: true,
  width: 100,
  sorter: true,
  align: 'center',
  render: (text) => <Tag color={randomTagColor()}>{text}</Tag>,
};

/**
 * @description: 创建时间
 * @author: 白雾茫茫丶
 */
export const createTimeColumn: ProColumns = {
  title: <FormattedMessage id={INTERNATION.CREATED_TIME} />,
  dataIndex: 'created_time',
  valueType: 'dateTime',
  hideInSearch: true,
  sorter: true,
  align: 'center',
  width: 160,
};

/**
 * @description: 创建时间-搜索
 * @author: 白雾茫茫丶
 */
export const createTimeInSearch: ProColumns = {
  title: <FormattedMessage id={INTERNATION.CREATED_TIME} />,
  dataIndex: 'created_time',
  valueType: 'dateRange',
  hideInTable: true,
  search: {
    transform: (value) => {
      return {
        start_time: dayjs(value[0]._d).format('YYYY-MM-DD 00:00:00'),
        end_time: dayjs(value[1]._d).format('YYYY-MM-DD 23:59:59'),
      };
    },
  },
};

/**
 * @description: 描述
 * @author: 白雾茫茫丶
 */
export const describeColumn: ProColumns = {
  title: <FormattedMessage id={INTERNATION.DESCRIBE} />,
  dataIndex: 'describe',
  ellipsis: true,
  width: 140,
  align: 'center',
  hideInSearch: true,
};

/**
 * @description: 操作菜单
 * @author: 白雾茫茫丶
 */
export const operationColumn: ProColumns = {
  title: <FormattedMessage id={INTERNATION.OPERATION} />,
  valueType: 'option',
  width: 100,
  align: 'center',
  fixed: 'right',
  key: 'option',
};

/**
 * @description: 是否
 * @author: 白雾茫茫丶
 */
export const flagColumn = (field: string): ProColumns => {
  return {
    title: <FormattedMessage id={formatPerfix(ROUTES.MENUMANAGEMENT, field)} />,
    dataIndex: field,
    ellipsis: true,
    hideInSearch: true,
    width: 100,
    align: 'center',
    render: (_, record) => (
      <Tag color={randomTagColor()}>
        {get(find(FLAG_OPTS, { value: record[field] }), 'label', '--')}
      </Tag>
    ),
  };
};

/**
 * @description: 渲染表单标题
 * @author: 白雾茫茫丶
 */
export const renderFormTitle = (pathName: string, id: string, name: string) => {
  const result = (
    <Space size={0}>
      <FormattedMessage
        id={`menu.${formatPathName(pathName)}.${id ? OPERATION.EDIT : OPERATION.ADD}`}
      />
      <FormattedMessage id={`pages.${formatPathName(pathName)}.title`} />
      {id && (
        <div>
          ：
          <span
            style={{
              color: get(
                getLocalStorageItem(LOCAL_STORAGE.LAYOUT),
                'colorPrimary',
                defaultSettings.colorPrimary,
              ),
            }}
          >
            {name}
          </span>
        </div>
      )}
    </Space>
  );
  return result;
};

/**
 * @description: 计算表格滚动长度
 * @Author: 白雾茫茫丶
 */
export const columnScrollX = (columns: ProColumns[]): number =>
  reduce(columns, (sum: number, record: ProColumns) => sum + (toNumber(record.width) || 100), 0);

/**
 * @description: 新增按钮
 * @author: 白雾茫茫丶
 */
type CreateButtonProps = {
  callback: () => void; // 点击按钮回调
  pathName: PathNames;
};
export const CreateButton: FC<CreateButtonProps> = ({ callback, pathName }) => {
  // 权限定义集合
  const access = useAccess();
  return (
    <Access
      accessible={access.operationPermission(
        get(permissions, `${formatPathName(pathName)}.${OPERATION.ADD}`, ''),
      )}
      fallback={null}
      key="plus"
    >
      <Button type="primary" onClick={() => callback()}>
        <Icon icon="ri:add-large-line" />
        <FormattedMessage id={formatPerfix(pathName, OPERATION.ADD, true)} />
      </Button>
    </Access>
  );
};
