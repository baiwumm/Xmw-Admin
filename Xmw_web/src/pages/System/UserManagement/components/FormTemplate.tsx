/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-07 17:13:54
 */

// 引入第三方库
import { ProFormInstance, StepsForm } from '@ant-design/pro-components'; // 高级组件
import { useIntl } from '@umijs/max'
import { message, Modal } from 'antd'; // antd 组件库
import { omit } from 'lodash-es'
import { FC, useEffect, useRef } from 'react';

import StrengthMeter from '@/components/StrengthMeter' // 密码强度校验
import { createUser, updateUser } from '@/services/system/user-management' // 用户管理接口
import { decryptionAesPsd, encryptionAesPsd, formatPathName, formatPerfix, renderFormTitle } from '@/utils'
import { REQUEST_CODE, ROUTES } from '@/utils/enums'
import type { FormTemplateProps } from '@/utils/types/system/user-management'

// 引入业务组件
import { PersonalInformation, SetAvatar, UserInformation } from '../Steps'

const FormTemplate: FC<FormTemplateProps> = ({
	reloadTable,
	formData,
	roleData,
	jobsData,
	organizationData,
	modalVisible,
	setModalVisibleFalse,
}) => {
	const { formatMessage } = useIntl();
	// 初始化表单
	const formMapRef = useRef<React.MutableRefObject<ProFormInstance>[]>([]);
	// 渲染标题
	const formTitle = renderFormTitle<API.USERMANAGEMENT>(formData,
		formatPathName(ROUTES.USERMANAGEMENT), 'user_id', 'user_name')

	// 提交表单
	const handlerSubmit = async (values: API.USERMANAGEMENT) => {
		// 提交数据
		let params = { ...formData, ...values }
		// 将密码加密
		params.password = encryptionAesPsd(params.password)
		// 删除参数多余的属性
		params = omit(params, ['confirmPassword'])
		await (params.user_id ? updateUser : createUser)(params).then((res) => {
			if (res.code === REQUEST_CODE.SUCCESS) {
				message.success(res.msg);
				reloadTable()
				setModalVisibleFalse()
			}
		})
	}

	/**
	 * @description: 分步组件对应的组件
	 * @return {*}
	 * @author: 白雾茫茫丶
	 */
	const StepComponents = [
		// 个人信息
		{
			title: `${formatPerfix(ROUTES.USERMANAGEMENT)}.steps-form.personal-information`,
			component: <PersonalInformation />,
		},
		// 用户信息
		{
			title: `${formatPerfix(ROUTES.USERMANAGEMENT)}.steps-form.user-information`,
			component: <UserInformation roleData={roleData} jobsData={jobsData} organizationData={organizationData} />,
		},
		// 设置头像
		{
			title: `${formatPerfix(ROUTES.USERMANAGEMENT)}.steps-form.set-avatar`,
			component: <SetAvatar />,
		},
		// 设置密码
		{
			title: `${formatPerfix(ROUTES.USERMANAGEMENT)}.steps-form.set-password`,
			component: <StrengthMeter />,
		},
	]

	// 当 formData 有数据的时候  回显
	useEffect(() => {
		if (formData) {
			// 表单数据回显处理,密码解密
			formData.password = decryptionAesPsd(formData.password)
			formData.confirmPassword = formData.password
			// 编辑场景下需要使用formMapRef循环设置formData
			formMapRef?.current?.forEach((formInstanceRef) => {
				formInstanceRef?.current?.setFieldsValue(formData);
			});
		}
	}, [formData]);
	return (
		<StepsForm
			formMapRef={formMapRef}
			onFinish={async (values: API.USERMANAGEMENT) => {
				handlerSubmit(values)
			}}
			stepsFormRender={(dom, submitter) => {
				return (
					<Modal
						title={formTitle}
						width={800}
						onCancel={() => setModalVisibleFalse()}
						open={modalVisible}
						footer={submitter}
						destroyOnClose
						maskClosable={false}
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