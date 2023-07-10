/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-28 15:35:24
 */

// 引入第三方库
import { ModalForm } from '@ant-design/pro-components'; // 高级组件
import { useIntl } from '@umijs/max'
import { Form, message } from 'antd'; // antd 组件库
import { omit } from 'lodash-es'
import type { FC } from 'react';

import { createRole, updateRole } from '@/services/system/role-management' // 角色管理接口

// 引入业务组件
import FormTemplateItem from '../components/FormTemplateItem' // 表单组件 
import { formatPerfix } from '../utils/config'
import type { FormTemplateProps } from '../utils/interface' // 公共 interface

const FormTemplate: FC<FormTemplateProps> = ({ reloadTable, formData, menuData, open, setOpenDrawerFalse }) => {
	const { formatMessage } = useIntl();
	// 初始化表单
	const [form] = Form.useForm<API.ROLEMANAGEMENT>();
	// ModalForm 不同状态下 标题显示
	const formTitle = formData?.role_id ? `${formatMessage({ id: `${formatPerfix(true)}.edit` }) +
		formatMessage({ id: `${formatPerfix()}.title` })}：${formData.role_name}` :
		(formatMessage({ id: `${formatPerfix(true)}.add` }) + formatMessage({ id: `${formatPerfix()}.title` }))

	// 关闭抽屉浮层
	const handlerClose = () => {
		// 关闭表单
		setOpenDrawerFalse()
		// 重置表单
		form.resetFields();
	}

	// 提交表单
	const handlerSubmit = async (values: API.ROLEMANAGEMENT): Promise<void> => {
		// 提交数据
		const params = { ...formData, ...values }
		await (params.role_id ? updateRole : createRole)(params).then((res) => {
			if (res.code === 200) {
				message.success(res.msg);
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
				destroyOnClose: true,
				maskClosable: false,
				onCancel: () => handlerClose(),
			}}
			// 提交数据时，禁用取消按钮的超时时间（毫秒）。
			submitTimeout={2000}
			onFinish={async (values) => {
				// 提交数据
				await handlerSubmit(values)
			}}
			onVisibleChange={(visiable) => {
				if (visiable && formData) {
					// menu_permission的值需要单独回显
					const roleMenus = formData.menu_permission.map((role: API.ROLEMENU) => role.menu_id)
					form.setFieldsValue(omit(formData, 'menu_permission'));
					form.setFieldValue('menu_permission', roleMenus)
				}
			}}
		>
			<FormTemplateItem menuData={menuData} />
		</ModalForm>
	);
};

export default FormTemplate