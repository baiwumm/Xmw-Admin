/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-17 13:49:20
 */
import { DrawerForm } from '@ant-design/pro-components';
import { App, Form } from 'antd';
import type { FC } from 'react';

import { renderFormTitle } from '@/components/TableColumns'
import { createJobs, updateJobs } from '@/services/administrative/jobs-management'
import { isSuccess } from '@/utils'
import { ROUTES } from '@/utils/enums'
import type { FormTemplateProps } from '@/utils/types/administrative/jobs-management'

// 引入业务组件
import FormTemplateItem from './FormTemplateItem' // 表单组件 

const FormTemplate: FC<FormTemplateProps> = ({
	treeData,
	reloadTable,
	orgTree,
	open,
	setOpenDrawerFalse,
}) => {
	// hooks 调用
	const { message } = App.useApp();
	// 上下文表单实例
	const form = Form.useFormInstance()
	// 获取表单全部字段
	const { jobs_id, jobs_name } = form.getFieldsValue(true)
	// 渲染标题
	const formTitle = renderFormTitle(ROUTES.JOBSMANAGEMENT, jobs_id, jobs_name)

	// 关闭抽屉浮层
	const handlerClose = () => {
		// 关闭表单
		setOpenDrawerFalse()
		// 重置表单
		form.resetFields();
	}

	// 提交表单
	const handlerSubmit = async (values: API.JOBSMANAGEMENT) => {
		// 请求接口
		await (jobs_id ? updateJobs : createJobs)({ ...values, jobs_id }).then(({ code, msg }) => {
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
		<DrawerForm<API.JOBSMANAGEMENT>
			title={formTitle}
			width={500}
			grid
			form={form}
			autoFocusFirstInput
			drawerProps={{ maskClosable: false, onClose: () => handlerClose() }}
			open={open}
			// 提交数据时，禁用取消按钮的超时时间（毫秒）。
			submitTimeout={2000}
			onFinish={handlerSubmit}
		>
			<FormTemplateItem treeData={treeData} orgTree={orgTree} />
		</DrawerForm>
	);
};

export default FormTemplate