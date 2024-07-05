/*
 * @Description: 表格操作下拉菜单
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-30 17:50:17
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-05 11:06:14
 */
import { Access, Icon, useAccess, useIntl } from '@umijs/max';
import { App, Button, Dropdown, MenuProps } from 'antd';
import { filter, get } from 'lodash-es';
import { FC } from 'react';

import { formatPathName, isSuccess } from '@/utils';
import { INTERNATION, OPERATION } from '@/utils/enums';
import permissions from '@/utils/permission';
import type { PathNames, Response } from '@/utils/types';

type DeleteParams = {
  request: (id: string) => Promise<Response>; // 删除接口
  id: string; // 删除 id 字段
};

export type DropdownMenuProps = {
  pathName: PathNames; // 路由字段
  addChildCallback?: () => void; // 添加子级回调
  editCallback?: () => void; // 编辑回调
  deleteParams: DeleteParams;
  reloadTable: () => void; // 刷新表格
};

const DropdownMenu: FC<DropdownMenuProps> = ({
  pathName,
  addChildCallback,
  editCallback,
  deleteParams,
  reloadTable,
}) => {
  // 国际化工具
  const { formatMessage } = useIntl();
  // 权限定义集合
  const access = useAccess();
  // hooks 调用
  const { modal, message } = App.useApp();
  // 国际化前缀
  const formatPerfix = formatPathName(pathName);
  // 下拉菜单
  const menuItems: MenuProps['items'] = [
    // 添加子级
    {
      label: (
        <Access
          accessible={access.operationPermission(
            get(permissions, `${formatPerfix}.${OPERATION.ADDCHILD}`, ''),
          )}
          fallback={null}
        >
          <span>
            {addChildCallback
              ? formatMessage({ id: `menu.${formatPerfix}.${OPERATION.ADDCHILD}` })
              : null}
          </span>
        </Access>
      ),
      icon: <Icon icon="ri:add-box-line" />,
      key: OPERATION.ADDCHILD,
      disabled: !addChildCallback,
    },
    // 编辑
    {
      label: (
        <Access
          accessible={access.operationPermission(
            get(permissions, `${formatPerfix}.${OPERATION.EDIT}`, ''),
          )}
          fallback={null}
        >
          <span>{formatMessage({ id: `menu.${formatPerfix}.${OPERATION.EDIT}` })}</span>
        </Access>
      ),
      icon: <Icon icon="ri:edit-line" />,
      key: OPERATION.EDIT,
      disabled: !editCallback,
    },
    // 删除
    {
      label: (
        <Access
          accessible={access.operationPermission(
            get(permissions, `${formatPerfix}.${OPERATION.DELETE}`, ''),
          )}
          fallback={null}
        >
          <span>{formatMessage({ id: `menu.${formatPerfix}.${OPERATION.DELETE}` })}</span>
        </Access>
      ),
      icon: <Icon icon="ri:delete-bin-line" />,
      key: OPERATION.DELETE,
      disabled: !deleteParams,
    },
  ];

  /**
   * @description: 点击菜单回调
   * @author: 白雾茫茫丶
   */
  const onClickMenuItem: MenuProps['onClick'] = ({ key }) => {
    // 删除参数
    const { request, id } = deleteParams;
    // 判断操作类型
    switch (key) {
      // 添加子级
      case OPERATION.ADDCHILD:
        addChildCallback?.();
        break;
      // 编辑
      case OPERATION.EDIT:
        editCallback?.();
        break;
      // 删除
      case OPERATION.DELETE:
        modal.confirm({
          title: formatMessage({ id: INTERNATION.DELETE_TITLE }),
          content: formatMessage({ id: INTERNATION.DELETE_CONTENT }),
          onOk: async () => {
            await request(id).then(({ code, msg }) => {
              if (isSuccess(code)) {
                message.success(msg);
                // 刷新表格
                reloadTable();
              }
            });
          },
        });
        break;
    }
  };
  return (
    <Dropdown menu={{ items: filter(menuItems, ['disabled', false]), onClick: onClickMenuItem }}>
      <Button size="small">
        {formatMessage({ id: INTERNATION.OPERATION })}
        <Icon icon="ri:arrow-down-s-line" />
      </Button>
    </Dropdown>
  );
};
export default DropdownMenu;
