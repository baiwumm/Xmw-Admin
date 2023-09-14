/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-13 10:51:14
 */

// 引入第三方库
import { DrawerForm } from '@ant-design/pro-components'; // 高级组件
import { Form, message } from 'antd'; // antd 组件库
import type { FC } from 'react';

import { createMenu, updateMenu } from '@/services/system/menu-management' // 菜单管理接口
import { formatPathName, renderFormTitle } from '@/utils'
import { REQUEST_CODE, ROUTES } from '@/utils/enums'
import type { FormTemplateProps } from '@/utils/types/system/menu-management' // 公共 interface

// 引入业务组件
import FormTemplateItem from './FormTemplateItem' // 表单组件 

const FormTemplate: FC<FormTemplateProps> = ({
	treeData,
	reloadTable,
	formData,
	parent_id,
	internationalData,
	open,
	setOpenDrawerFalse,
}) => {
	// 初始化表单
	const [form] = Form.useForm<API.MENUMANAGEMENT>();
	// 渲染标题
	const formTitle = renderFormTitle<API.MENUMANAGEMENT>(formData,
		formatPathName(ROUTES.MENUMANAGEMENT), 'menu_id', 'name', true)

	// 关闭抽屉浮层
	const handlerClose = () => {
		// 关闭表单
		setOpenDrawerFalse()
		// 重置表单
		form.resetFields();
	}

	// 提交表单
	const handlerSubmit = async (values: API.MENUMANAGEMENT): Promise<void> => {
		// 提交数据
		const params = { ...formData, ...values }
		if (parent_id) {
			params.parent_id = parent_id
		}
		// 删除 routes 属性
		delete params.routes
		await (params.menu_id ? updateMenu : createMenu)(params).then((res) => {
			if (res.code === REQUEST_CODE.SUCCESS) {
				message.success(res.msg);
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
			drawerProps={{
				destroyOnClose: true,
				maskClosable: false,
				onClose: () => handlerClose(),
			}}
			// 提交数据时，禁用取消按钮的超时时间（毫秒）。
			submitTimeout={2000}
			onFinish={async (values) => {
				// 提交数据
				const isSuccess = await handlerSubmit(values)
				// 返回true关闭弹框，否则不关闭
				return isSuccess
			}}
			onVisibleChange={(visiable) => {
				if (visiable && formData) {
					form.setFieldsValue(formData);
				}
			}}
		>
			<FormTemplateItem treeData={treeData} parent_id={parent_id} internationalData={internationalData} />
		</DrawerForm>
	);
};

export default FormTemplate