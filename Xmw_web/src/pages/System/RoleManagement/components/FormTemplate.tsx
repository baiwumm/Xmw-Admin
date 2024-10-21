/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-21 17:04:50
 */
import { ModalForm } from '@ant-design/pro-components';
import { useRequest } from 'ahooks'
import { App, Form } from 'antd';
import type { TreeProps } from 'antd/es/tree';
import { concat, forEach, get, uniq } from 'lodash-es';
import type { FC } from 'react';

import { renderFormTitle } from '@/components/TableColumns'
import { getMenuList } from '@/services/system/menu-management'
import { createRole, updateRole } from '@/services/system/role-management'
import { isSuccess } from '@/utils'
import { ROUTES } from '@/utils/enums'
import type { FormTemplateProps } from '@/utils/types/system/role-management'

import FormTemplateItem from './FormTemplateItem' // 表单组件 

const FormTemplate: FC<FormTemplateProps> = ({
	reloadTable,
	open,
	setOpenDrawerFalse,
}) => {
	// hooks 调用
	const { message } = App.useApp();
	// 上下文表单实例
	const form = Form.useFormInstance()
	// 获取表单全部字段
	const { role_id, role_name } = form.getFieldsValue(true)
	// 渲染标题
	const formTitle = renderFormTitle(ROUTES.MENUMANAGEMENT, role_id, role_name)

	/**
	 * @description: 获取当前菜单数据
	 * @author: 白雾茫茫丶
	 */
	const { data: menuData } = useRequest(async (params) => get(await getMenuList(params), 'data', []), {
		defaultParams: [{ isPremission: true }],
	})

	// 关闭抽屉浮层
	const handlerClose = () => {
		// 关闭表单
		setOpenDrawerFalse();
		// 重置表单
		form.resetFields();
	}

	const findParentIds = (dataSource, nodeId: React.Key, fieldNames: TreeProps['fieldNames']) => {
		const { key, children } = fieldNames
		const parentIds: string[] = []; // 用于存储所有父节点ID的数组
		// 定义一个递归函数，用于遍历整棵树并查找子节点的所有父节点
		function traverse(node, nodeId: React.Key) {
			if (node[key] === nodeId) { // 如果当前节点的ID等于子节点的ID，则表示已经找到了子节点，可以开始向上查找父节点
				return true; // 返回true表示已经找到了子节点
			}
			if (node[children]) { // 如果当前节点有子节点，则继续遍历子节点
				for (const childNode of node[children]) {
					if (traverse(childNode, nodeId)) { // 如果在子节点中找到了子节点的父节点，则将当前节点的ID添加到父节点ID数组中，并返回true表示已经找到了子节点
						parentIds.push(node[key]);
						return true;
					}
				}
			}
			return false; // 如果当前节点不是子节点的父节点，则返回false
		}
		// 从根节点开始遍历整棵树，并调用递归函数查找子节点的所有父节点
		for (const node of dataSource) {
			if (traverse(node, nodeId)) { // 如果在当前节点的子树中找到了子节点的父节点，则直接退出循环
				break;
			}
		}
		return parentIds; // 返回所有父节点ID的数组
	}

	// 提交表单
	const handlerSubmit = async ({ menu_permission, ...values }: API.ROLEMANAGEMENT): Promise<void> => {
		let result: string[] = [];
		if (menu_permission?.length) {
			forEach(menu_permission, (id: string) => {
				const parentIds = findParentIds(menuData, id, { key: 'menu_id', children: 'children' });
				result = concat(result, parentIds)
			})
		}
		// 提交数据
		await (role_id ? updateRole : createRole)({
			...values,
			menu_permission: uniq([...menu_permission, ...result]),
			role_id,
		}).then(({ code, msg }) => {
			if (isSuccess(code)) {
				message.success(msg);
				// 刷新表格
				reloadTable()
				// 关闭浮层
				handlerClose()
			}
		})
	}
	return (
		<ModalForm<API.ROLEMANAGEMENT>
			title={formTitle}
			width={500}
			grid
			form={form}
			open={open}
			autoFocusFirstInput
			modalProps={{
				maskClosable: false,
				onCancel: () => handlerClose(),
			}}
			// 提交数据时，禁用取消按钮的超时时间（毫秒）。
			submitTimeout={2000}
			onFinish={handlerSubmit}
		>
			<FormTemplateItem menuData={menuData} />
		</ModalForm>
	);
};

export default FormTemplate