/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-08-31 16:13:56
 */

// 引入第三方库
import { DrawerForm } from '@ant-design/pro-components'; // 高级组件
import { Form, message } from 'antd'; // antd 组件库
import { get, isString, omit } from 'lodash-es';
import type { FC } from 'react';

import { MENU } from '@/enums'
import { createOrganization, updateOrganization } from '@/services/administrative/organization'; // 组织管理接口
import { renderFormTitle } from '@/utils'

// 引入业务组件
import FormTemplateItem from '../components/FormTemplateItem'; // 表单组件
import type { FormTemplateProps } from '../utils/interface'; // 公共 interface

const FormTemplate: FC<FormTemplateProps> = ({
	treeData,
	reloadTable,
	formData,
	parent_id,
	userList,
	open,
	setOpenDrawerFalse,
}) => {
	// 初始化表单
	const [form] = Form.useForm<API.ORGANIZATION>();
	// 渲染标题
	const formTitle = renderFormTitle<API.ORGANIZATION>(formData, MENU.ORGANIZATION, 'org_id', 'org_name')

	// 关闭抽屉浮层
	const handlerClose = () => {
		// 关闭表单
		setOpenDrawerFalse()
		// 重置表单
		form.resetFields();
	}

	// 提交表单
	const handlerSubmit = async ({ org_logo, ...values }: API.ORGANIZATION): Promise<void> => {
		// 提交数据
		let params = {
			...formData,
			...values,
			org_logo: isString(org_logo) ? org_logo : get(org_logo, '[0].response.data.path', ''),
		};
		if (parent_id) {
			params.parent_id = parent_id;
		}
		// 删除 children 属性
		params = omit(params, ['children']);
		await (params.org_id ? updateOrganization : createOrganization)(params).then((res) => {
			if (res.code === 200) {
				message.success(res.msg);
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
				destroyOnClose: true,
				maskClosable: false,
				onClose: () => handlerClose(),
			}}
			// 提交数据时，禁用取消按钮的超时时间（毫秒）。
			submitTimeout={2000}
			onFinish={async (values) => {
				// 提交数据
				await handlerSubmit(values);
			}}
			onVisibleChange={(visiable) => {
				if (visiable && formData) {
					form.setFieldsValue(formData);
				}
			}}
		>
			<FormTemplateItem treeData={treeData} parent_id={parent_id} userList={userList} />
		</DrawerForm>
	);
};

export default FormTemplate;
