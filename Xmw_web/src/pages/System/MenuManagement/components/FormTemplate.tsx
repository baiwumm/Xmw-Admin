/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-17 13:50:16
 */

import { DrawerForm } from '@ant-design/pro-components';
import { getLocale } from '@umijs/max'
import { App, Form } from 'antd';
import type { FC } from 'react';

import { renderFormTitle } from '@/components/TableColumns'
import { createMenu, updateMenu } from '@/services/system/menu-management'
import { isSuccess } from '@/utils'
import { ROUTES } from '@/utils/enums'
import type { FormTemplateProps } from '@/utils/types/system/menu-management'

import FormTemplateItem from './FormTemplateItem'

const FormTemplate: FC<FormTemplateProps> = ({
	treeData,
	reloadTable,
	open,
	setOpenDrawerFalse,
}) => {
	// hooks 调用
	const { message } = App.useApp();
	// 上下文表单实例
	const form = Form.useFormInstance()
	// 获取表单全部字段
	const { menu_id, ...formValue } = form.getFieldsValue(true)
	// 渲染标题
	const formTitle = renderFormTitle(ROUTES.MENUMANAGEMENT, menu_id, formValue[getLocale()])

	// 关闭抽屉浮层
	const handlerClose = () => {
		// 关闭表单
		setOpenDrawerFalse()
		// 重置表单
		form.resetFields();
	}

	// 提交表单
	const handlerSubmit = async (values: API.MENUMANAGEMENT): Promise<void> => {
		// 请求接口
		await (menu_id ? updateMenu : createMenu)({ ...values, menu_id }).then(({ code, msg }) => {
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
		<DrawerForm<API.MENUMANAGEMENT>
			title={formTitle}
			width={550}
			grid
			form={form}
			open={open}
			autoFocusFirstInput
			drawerProps={{ maskClosable: false, onClose: () => handlerClose() }}
			// 提交数据时，禁用取消按钮的超时时间（毫秒）。
			submitTimeout={2000}
			onFinish={handlerSubmit}
		>
			<FormTemplateItem treeData={treeData} />
		</DrawerForm>
	);
};

export default FormTemplate