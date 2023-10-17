/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-08 09:12:23
 */
import { ModalForm } from '@ant-design/pro-components';
import { App, Form } from 'antd';
import type { FC } from 'react';

import { renderFormTitle } from '@/components/TableColumns'
import { createInternational, updateInternational } from '@/services/system/internationalization'
import { isSuccess } from '@/utils'
import { ROUTES } from '@/utils/enums'
import type { FormTemplateProps } from '@/utils/types/system/internationalization'

// 引入业务组件
import FormTemplateItem from './FormTemplateItem' // 表单组件 

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
	const { id, name } = form.getFieldsValue(true)
	// 渲染标题
	const formTitle = renderFormTitle(ROUTES.INTERNATIONALIZATION, id, name)

	// 关闭抽屉浮层
	const handlerClose = () => {
		// 关闭表单
		setOpenDrawerFalse()
		// 重置表单
		form.resetFields();
	}

	// 提交表单
	const handlerSubmit = async (values: API.INTERNATIONALIZATION) => {
		// 执行数据库操作
		await (id ? updateInternational : createInternational)({ ...values, id }).then(({ code, msg }) => {
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
		<ModalForm<API.INTERNATIONALIZATION>
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
			<FormTemplateItem treeData={treeData} />
		</ModalForm>
	);
};

export default FormTemplate