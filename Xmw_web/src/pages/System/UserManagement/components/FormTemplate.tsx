/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-08 09:14:38
 */
import { StepsForm } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max'
import { useCounter } from 'ahooks'
import { App, Modal } from 'antd';
import { get, subtract } from 'lodash-es'
import { FC } from 'react';

import StrengthMeter from '@/components/StrengthMeter' // 密码强度校验
import { renderFormTitle } from '@/components/TableColumns'
import { createUser, updateUser } from '@/services/system/user-management'
import { encryptionAesPsd, formatPerfix, isSuccess } from '@/utils'
import { ROUTES } from '@/utils/enums'
import type { FormTemplateProps } from '@/utils/types/system/user-management'

import { PersonalInformation, SetAvatar, UserInformation } from '../Steps'

const FormTemplate: FC<FormTemplateProps> = ({
	reloadTable,
	modalVisible,
	setModalVisibleFalse,
	stepFormMapRef,
}) => {
	const { formatMessage } = useIntl()
	// hooks 调用
	const { message } = App.useApp();
	// 获取表单全部字段
	const { user_id, user_name } =
		get(stepFormMapRef, 'current.[0].current')?.getFieldsValue(['user_id', 'user_name']) || {}
	// 渲染标题
	const formTitle = renderFormTitle(ROUTES.USERMANAGEMENT, user_id, user_name)

	// 提交表单
	const handlerSubmit = async (values: API.USERMANAGEMENT) => {
		// 将密码加密
		values.password = encryptionAesPsd(values.password)
		// 提交数据
		await (user_id ? updateUser : createUser)({ ...values, user_id }).then(({ code, msg }) => {
			if (isSuccess(code)) {
				message.success(msg);
				reloadTable()
				setModalVisibleFalse()
			}
		})
	}

	/**
	 * @description: 分步组件对应的组件
	 * @author: 白雾茫茫丶
	 */
	const StepComponents = [
		// 个人信息
		{
			title: formatPerfix(ROUTES.USERMANAGEMENT, 'steps-form.personal-information'),
			component: <PersonalInformation />,
		},
		// 用户信息
		{
			title: formatPerfix(ROUTES.USERMANAGEMENT, 'steps-form.user-information'),
			component: <UserInformation />,
		},
		// 设置头像
		{
			title: formatPerfix(ROUTES.USERMANAGEMENT, 'steps-form.set-avatar'),
			component: <SetAvatar />,
		},
		// 设置密码
		{
			title: formatPerfix(ROUTES.USERMANAGEMENT, 'steps-form.set-password'),
			component: <StrengthMeter />,
		},
	]

	// 当前表单的步骤数，从 0 开始
	const [current,
		{ set: setCurrent, reset: resetCurrent },
	] = useCounter(0, { min: 0, max: subtract(StepComponents.length, 1) })
	return (
		<StepsForm
			current={current}
			formMapRef={stepFormMapRef}
			onFinish={handlerSubmit}
			onCurrentChange={(current) => setCurrent(current)}
			stepsFormRender={(dom, submitter) => {
				return (
					<Modal
						title={formTitle}
						width={800}
						onCancel={() => {
							// 重置表单
							stepFormMapRef?.current?.forEach((formInstanceRef) => {
								formInstanceRef?.current?.resetFields();
							});
							resetCurrent();
							setModalVisibleFalse();
						}}
						open={modalVisible}
						footer={submitter}
						maskClosable={false}
						forceRender
					>
						{dom}
					</Modal>
				);
			}}
		>
			{/* 遍历渲染 Step */}
			{
				StepComponents.map((step, index) => {
					return (
						<StepsForm.StepForm
							title={formatMessage({ id: step.title })}
							grid={index !== 2}
							key={step.title}
						>
							{step.component}
						</StepsForm.StepForm>
					)
				})
			}
		</StepsForm>
	);
};

export default FormTemplate