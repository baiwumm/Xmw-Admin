/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-01 17:12:40
 */

// 引入第三方库
import type { FC } from 'react';
import { useIntl } from '@umijs/max'
import { PlusOutlined } from '@ant-design/icons';// antd 图标
import { DrawerForm } from '@ant-design/pro-components'; // 高级组件
import { Button, Form, message } from 'antd'; // antd 组件库
import { omit } from 'lodash'

// 引入业务组件
import FormTemplateItem from '../components/FormTemplateItem' // 表单组件 
import { createJobs, updateJobs } from '@/services/administrative/jobs-management' // 岗位管理接口
import type { FormTemplateProps } from '../utils/interface' // 公共 interface

const FormTemplate: FC<FormTemplateProps> = ({ treeData, reloadTable, formData, triggerDom, parent_id, orgTree, userList }) => {
	const { formatMessage } = useIntl();
	// 初始化表单
	const [form] = Form.useForm<API.JOBSMANAGEMENT>();
	// DrawerForm 不同状态下 标题显示
	const formTitle = formData?.jobs_id ? `${formatMessage({ id: 'menu.administrative.jobs-management.edit' }) + formatMessage({ id: 'pages.administrative.jobs-management.title' })}：${formData.jobs_name}` : (formatMessage({ id: 'menu.administrative.jobs-management.add' }) + formatMessage({ id: 'pages.administrative.jobs-management.title' }))
	// 提交表单
	const handlerSubmit = async (values: API.JOBSMANAGEMENT): Promise<boolean> => {
		// 提交数据
		let result = false
		let params = { ...formData, ...values }
		if (parent_id) {
			params.parent_id = parent_id
		}
		// 删除 children 属性
		params = omit(params, ['children'])
		await (params.jobs_id ? updateJobs : createJobs)(params).then(res => {
			if (res.code === 200) {
				message.success(res.msg);
				reloadTable()
				// 重置表单
				form.resetFields()
				result = true
			}
		})
		return result
	}
	return (
		<DrawerForm<API.JOBSMANAGEMENT>
			title={formTitle}
			width={500}
			grid
			form={form}
			trigger={triggerDom ||
				<Button type="primary">
					<PlusOutlined />
					{formatMessage({ id: 'menu.administrative.jobs-management.add' })}
				</Button>
			}
			autoFocusFirstInput
			drawerProps={{
				destroyOnClose: false,
				maskClosable: false,
				onClose: () => form.resetFields()
			}}
			// 提交数据时，禁用取消按钮的超时时间（毫秒）。
			submitTimeout={2000}
			onFinish={async (values) => {
				// 提交数据
				const isSuccess = await handlerSubmit(values)
				// 返回true关闭弹框，否则不关闭
				return isSuccess
			}}
			onVisibleChange={visiable => {
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