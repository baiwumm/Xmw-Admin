/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-05 16:31:34
 */

// 引入第三方库
import { ModalForm } from '@ant-design/pro-components'; // 高级组件
import { useIntl } from '@umijs/max'
import { Form, message } from 'antd'; // antd 组件库
import { omit } from 'lodash-es'
import type { FC } from 'react';

import { createInternational, updateInternational } from '@/services/system/internationalization' // 国际化接口

// 引入业务组件
import FormTemplateItem from '../components/FormTemplateItem' // 表单组件 
import { formatPerfix } from '../utils/config'
import type { FormTemplateProps } from '../utils/interface' // 公共 interface

const FormTemplate: FC<FormTemplateProps> = ({
	treeData,
	reloadTable,
	formData,
	parent_id,
	open,
	setOpenDrawerFalse,
}) => {
	const { formatMessage } = useIntl();
	// 初始化表单
	const [form] = Form.useForm<API.INTERNATIONALIZATION>();
	// ModalForm 不同状态下 标题显示
	const formTitle = formData?.id ? `${formatMessage({ id: `${formatPerfix(true)}.edit` }) +
		formatMessage({ id: `${formatPerfix()}.title` })}：${formData.name}` :
		(formatMessage({ id: `${formatPerfix(true)}.add` }) + formatMessage({ id: `${formatPerfix()}.title` }))

	// 关闭抽屉浮层
	const handlerClose = () => {
		// 关闭表单
		setOpenDrawerFalse()
		// 重置表单
		form.resetFields();
	}

	// 提交表单
	const handlerSubmit = async (values: API.INTERNATIONALIZATION): Promise<void> => {
		// 提交数据
		let params = { ...formData, ...values }
		if (parent_id) {
			params.parent_id = parent_id
		}
		// 删除 多余的 属性
		params = omit(params, ['children'])
		// 执行数据库操作
		await (params.id ? updateInternational : createInternational)(params).then((res) => {
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
		<ModalForm<API.INTERNATIONALIZATION>
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
			<FormTemplateItem treeData={treeData} parent_id={parent_id} />
		</ModalForm>
	);
};

export default FormTemplate