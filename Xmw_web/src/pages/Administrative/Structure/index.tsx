/*
 * @Description: 组织架构
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-24 11:16:36
 * @LastEditors: Cyan
 * @LastEditTime: 2023-07-10 14:54:44
 */
import { NodeData, OrganizationGraph } from '@ant-design/charts';
import { PageContainer } from '@ant-design/pro-components' // antd 高级组件
import { useRequest } from 'ahooks'
import { Card } from 'antd'
import type { FC } from 'react';

import { getOrganizationList } from '@/services/administrative/organization' // 组织管理接口
import { formatResult } from '@/utils'

const Structure: FC = () => {
	/**
	 * @description: 递归遍历树结构
	 * @param {*} tree
	 * @author: Cyan
	 */
	function loopTree<T>(tree: (NodeData<{ name?: string }> & T &
	{ [key: string]: string })[], idField: string, nameField: string) {
		tree.forEach((node) => {
			node.id = node[idField]
			node.value = {}
			node.value.name = node[nameField]
			if (node.children) {
				loopTree(node.children, idField, nameField)
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
			loopTree<API.ORGANIZATION>(treeData, 'org_id', 'org_name')
			return treeData
		});

	const data = {
		id: '1',
		value: {
			name: 'Xmw Admin',
		},
		children: orgList,
	}
	return (
		<PageContainer header={{ title: null }}>
			<Card loading={loading}>
				<OrganizationGraph data={data} behaviors={['drag-canvas', 'zoom-canvas', 'drag-node']} />
			</Card>
		</PageContainer>
	)
}

export default Structure