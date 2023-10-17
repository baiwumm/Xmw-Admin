/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-08 09:10:45
 */

import { DrawerForm } from '@ant-design/pro-components';
import { App, Form } from 'antd';
import { get, isString } from 'lodash-es';
import type { FC } from 'react';

import { renderFormTitle } from '@/components/TableColumns'
import { createOrganization, updateOrganization } from '@/services/administrative/organization';
import { isSuccess } from '@/utils'
import { ROUTES } from '@/utils/enums'
import type { FormTemplateProps } from '@/utils/types/administrative/organization';

// 引入业务组件
import FormTemplateItem from './FormTemplateItem'; // 表单组件

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
	const { org_id, org_name } = form.getFieldsValue(true)
	// 渲染标题
	const formTitle = renderFormTitle(ROUTES.ORGANIZATION, org_id, org_name)

	// 关闭抽屉浮层
	const handlerClose = () => {
		// 关闭表单
		setOpenDrawerFalse()
		// 重置表单
		form.resetFields();
	}

	// 提交表单
	const handlerSubmit = async ({ org_logo, ...values }: API.ORGANIZATION) => {
		// 提交数据
		const params: API.ORGANIZATION = {
			...values,
			org_id,
			org_logo: isString(org_logo) ? org_logo : get(org_logo, '[0].response.data.path', ''),
		};
		await (org_id ? updateOrganization : createOrganization)(params).then(({ code, msg }) => {
			if (isSuccess(code)) {
				message.success(msg);
				// 关闭浮层
				handlerClose()
				// 刷新表格
				reloadTable();
			}
		});
	};

	return (
		<DrawerForm<API.ORGANIZATION>
			title={formTitle}
			width={500}
			grid
			form={form}
			open={open}
			autoFocusFirstInput
			drawerProps={{
				maskClosable: false,
				onClose: () => handlerClose(),
			}}
			// 提交数据时，禁用取消按钮的超时时间（毫秒）。
			submitTimeout={2000}
			onFinish={handlerSubmit}
		>
			<FormTemplateItem treeData={treeData} />
		</DrawerForm>
	);
};

export default FormTemplate;
