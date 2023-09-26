/*
 * @Description: 组织架构
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-24 11:16:36
 * @LastEditors: Cyan
 * @LastEditTime: 2023-07-10 14:54:44
 */
import { NodeData, OrganizationGraph } from '@ant-design/charts';
import { PageContainer } from '@ant-design/pro-components'
import { useRequest } from 'ahooks'
import { Card } from 'antd'
import { get } from 'lodash-es'
import type { FC } from 'react';

import { getOrganizationList } from '@/services/administrative/organization' // 组织管理接口

const Structure: FC = () => {
	/**
	 * @description: 递归遍历树结构
	 * @param {*} tree
	 * @Author: 白雾茫茫丶
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
	 * @Author: 白雾茫茫丶
	 */
	const { data: orgList, loading } = useRequest<API.ORGANIZATION[], unknown[]>(
		async () => {
			const treeData = get(await getOrganizationList(), 'data', [])
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