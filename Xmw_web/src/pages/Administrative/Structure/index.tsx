/*
 * @Description: 组织架构
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-24 11:16:36
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-03 13:52:45
 */
import { useRequest } from 'ahooks'
import { Card } from 'antd'
import type { FC } from 'react';
import { useIntl } from '@umijs/max'
import { PageContainer } from '@ant-design/pro-components' // antd 高级组件
import { getOrganizationList } from '@/services/administrative/organization' // 组织管理接口
import { formatResult } from '@/utils'
import { OrganizationGraph } from '@ant-design/charts';

const Structure: FC = () => {
	const { formatMessage } = useIntl();

	/**
	 * @description: 递归遍历树结构
	 * @param {*} tree
	 * @param {*} idField
	 * @param {*} valueField
	 * @return {*}
	 * @author: Cyan
	 */
	function loopTree(tree) {
		tree.forEach((node) => {
			node.id = node.org_id
			node.value = {}
			node.value.name = node.org_name
			if (node.children) {
				loopTree(node.children)
			}
		})
	}

	/**
	 * @description: 获取组织管理列表
	 * @return {*}
	 * @author: Cyan
	 */
	const { data: orgList, loading } = useRequest<API.ORGANIZATION[], unknown[]>(
		async () => {
			const treeData = formatResult(await getOrganizationList())
			loopTree(treeData)
			return treeData
		});

	const data = {
		id: '1',
		value: {
			name: 'Xmw Admin'
		},
		children: orgList
	}
	return (
		<PageContainer title={formatMessage({ id: 'pages.administrative.structure' })}>
			<Card loading={loading}>
				<OrganizationGraph data={data} behaviors={['drag-canvas', 'zoom-canvas', 'drag-node']} />
			</Card>
		</PageContainer>
	)
}

export default Structure