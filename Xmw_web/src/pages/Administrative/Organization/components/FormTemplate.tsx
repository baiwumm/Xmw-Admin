/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-05 15:22:19
 */

// 引入第三方库
import type { FC } from 'react';
import { useIntl } from '@umijs/max';
import { DrawerForm } from '@ant-design/pro-components'; // 高级组件
import { Form, message } from 'antd'; // antd 组件库
import { omit } from 'lodash';

// 引入业务组件
import AddPlusPermission from '@/components/AddPlusPermission'; // 全局新建按钮权限
import FormTemplateItem from '../components/FormTemplateItem'; // 表单组件
import { createOrganization, updateOrganization } from '@/services/administrative/organization'; // 组织管理接口
import permissions from '@/utils/permission'
import type { FormTemplateProps } from '../utils/interface'; // 公共 interface

const FormTemplate: FC<FormTemplateProps> = ({
	treeData,
	reloadTable,
	formData,
	triggerDom,
	parent_id,
	userList,
}) => {
	const { formatMessage } = useIntl();
	// 初始化表单
	const [form] = Form.useForm<API.ORGANIZATION>();
	// DrawerForm 不同状态下 标题显示
	const formTitle = formData?.org_id
		? `${formatMessage({ id: 'menu.administrative.organization.edit' }) +
		formatMessage({ id: 'pages.administrative.organization.title' })
		}：${formData.org_name}`
		: formatMessage({ id: 'menu.administrative.organization.add' }) +
		formatMessage({ id: 'pages.administrative.organization.title' });
	// 提交表单
	const handlerSubmit = async (values: API.ORGANIZATION): Promise<boolean> => {
		// 提交数据
		let result = false;
		let params = { ...formData, ...values };
		if (parent_id) {
			params.parent_id = parent_id;
		}
		// 删除 children 属性
		params = omit(params, ['children']);
		await (params.org_id ? updateOrganization : createOrganization)(params).then((res) => {
			if (res.code === 200) {
				message.success(res.msg);
				reloadTable();
				// 重置表单
				form.resetFields();
				result = true;
			}
		});
		return result;
	};
	return (
		<DrawerForm<API.ORGANIZATION>
			title={formTitle}
			width={500}
			grid
			form={form}
			trigger={
				// 这里必须要用div包裹，不然不会触发trigger，具体原因不明
				<div>
					<AddPlusPermission
						triggerDom={triggerDom}
						permission={permissions.organization.add}
						id="menu.administrative.organization.add"
					/>
				</div>
			}
			autoFocusFirstInput
			drawerProps={{
				destroyOnClose: false,
				maskClosable: false,
				onClose: () => form.resetFields(),
			}}
			// 提交数据时，禁用取消按钮的超时时间（毫秒）。
			submitTimeout={2000}
			onFinish={async (values) => {
				// 提交数据
				const isSuccess = await handlerSubmit(values);
				// 返回true关闭弹框，否则不关闭
				return isSuccess;
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
