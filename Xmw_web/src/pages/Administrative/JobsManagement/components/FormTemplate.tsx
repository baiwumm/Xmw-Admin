/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-08-31 17:31:31
 */

// 引入第三方库
import { DrawerForm } from '@ant-design/pro-components'; // 高级组件
import { Form, message } from 'antd'; // antd 组件库
import { omit } from 'lodash-es'
import type { FC } from 'react';

import { MENU } from '@/enums'
import { createJobs, updateJobs } from '@/services/administrative/jobs-management' // 岗位管理接口
import { renderFormTitle } from '@/utils'

// 引入业务组件
import FormTemplateItem from '../components/FormTemplateItem' // 表单组件 
import type { FormTemplateProps } from '../utils/interface' // 公共 interface

const FormTemplate: FC<FormTemplateProps> = ({
	treeData,
	reloadTable,
	formData,
	parent_id,
	orgTree,
	userList,
	open,
	setOpenDrawerFalse,
}) => {
	// 初始化表单
	const [form] = Form.useForm<API.JOBSMANAGEMENT>();
	// 渲染标题
	const formTitle = renderFormTitle<API.JOBSMANAGEMENT>(formData, MENU.JOBSMANAGEMENT, 'jobs_id', 'jobs_name')

	// 关闭抽屉浮层
	const handlerClose = () => {
		// 关闭表单
		setOpenDrawerFalse()
		// 重置表单
		form.resetFields();
	}

	// 提交表单
	const handlerSubmit = async (values: API.JOBSMANAGEMENT): Promise<void> => {
		// 提交数据
		let params = { ...formData, ...values }
		if (parent_id) {
			params.parent_id = parent_id
		}
		// 删除 children 属性
		params = omit(params, ['children'])
		await (params.jobs_id ? updateJobs : createJobs)(params).then((res) => {
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
		<DrawerForm<API.JOBSMANAGEMENT>
			title={formTitle}
			width={500}
			grid
			form={form}
			autoFocusFirstInput
			drawerProps={{
				destroyOnClose: true,
				maskClosable: false,
				onClose: () => handlerClose(),
			}}
			open={open}
			// 提交数据时，禁用取消按钮的超时时间（毫秒）。
			submitTimeout={2000}
			onFinish={async (values) => {
				// 提交数据
				await handlerSubmit(values)
			}}
			onVisibleChange={(visiable) => {
				if (visiable && formData) {
					form.setFieldsValue(formData);
				}
			}}
		>
			<FormTemplateItem treeData={treeData} parent_id={parent_id} orgTree={orgTree} userList={userList} />
		</DrawerForm>
	);
};

export default FormTemplate