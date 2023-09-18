/*
 * @Description: 国际化-表格列表
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-15 15:29:39
 */
// 引入第三方库
import { ClockCircleOutlined, FontSizeOutlined, PlusOutlined } from '@ant-design/icons' // antd 图标库
import { ActionType, ProColumns, ProTable, RequestData } from '@ant-design/pro-components' // antd 高级组件
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Access, useAccess, useIntl } from '@umijs/max'
import { useBoolean } from 'ahooks';
import { Button, message, Modal, Space, Tag } from 'antd' // antd 组件库
import dayjs from 'dayjs'
import { get } from 'lodash-es'
import { FC, useRef, useState } from 'react';

import DropdownMenu from '@/components/DropdownMenu' // 表格操作下拉菜单
import { delInternational, getInternationalList } from '@/services/system/internationalization' // 国际化接口
import { columnScrollX, formatPathName, formatPerfix } from '@/utils'
import { randomTagColor } from '@/utils/const'
import { INTERNATION, LANGS, OPERATION, REQUEST_CODE, ROUTES } from '@/utils/enums'
import permissions from '@/utils/permission'
import type { SearchParams } from '@/utils/types/system/internationalization'

import FormTemplate from './FormTemplate' // 表单组件

const TableTemplate: FC = () => {
	const { formatMessage } = useIntl();
	// 权限定义集合
	const access = useAccess();
	// 获取表格实例
	const tableRef = useRef<ActionType>();
	// 获取树形数据传递给modalForm
	const [treeData, setTreeData] = useState<API.INTERNATIONALIZATION[]>([])
	// 当前行数据
	const [currentRecord, setCurrentRecord] = useState<API.INTERNATIONALIZATION>()
	// 判断是否是添加子级
	const [parent_id, set_parent_id] = useState<string>('')
	// 是否显示抽屉表单
	const [openDrawer, { setTrue: setOpenDrawerTrue, setFalse: setOpenDrawerFalse }] = useBoolean(false)
	// 跟随主题色变化
	const PrimaryColor = useEmotionCss(({ token }) => {
		return { color: token.colorPrimary, fontSize: 16 };
	});
	// 手动触发刷新表格
	function reloadTable() {
		tableRef?.current?.reload()
	}
	/**
	 * @description: 删除国际化数据
	 * @param {string} id
	 * @author: 白雾茫茫丶
	 */
	const handlerDelete = (id: string): void => {
		Modal.confirm({
			title: formatMessage({ id: INTERNATION.DELETE_TITLE }),
			content: formatMessage({ id: INTERNATION.DELETE_CONTENT }),
			onOk: async () => {
				await delInternational(id).then((res) => {
					if (res.code === REQUEST_CODE.SUCCESS) {
						message.success(res.msg)
						// 刷新表格
						reloadTable()
					}
				})
			},
		})
	}

	/**
	* @description: proTable columns 配置项
	* @author: 白雾茫茫丶
	*/
	const columns: ProColumns<API.INTERNATIONALIZATION>[] = [
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.INTERNATIONALIZATION)}.name` }),
			dataIndex: 'name',
			ellipsis: true,
			width: 140,
			align: 'center',
			render: (text) => <Space><Tag icon={<FontSizeOutlined className={PrimaryColor} />} >{text}</Tag></Space>,
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.INTERNATIONALIZATION)}.${LANGS.CN}` }),
			dataIndex: LANGS.CN,
			ellipsis: true,
			width: 120,
			align: 'center',
			hideInSearch: true,
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.INTERNATIONALIZATION)}.${LANGS.US}` }),
			dataIndex: LANGS.US,
			ellipsis: true,
			width: 120,
			align: 'center',
			hideInSearch: true,
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.INTERNATIONALIZATION)}.${LANGS.JP}` }),
			dataIndex: LANGS.JP,
			ellipsis: true,
			width: 120,
			align: 'center',
			hideInSearch: true,
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.INTERNATIONALIZATION)}.${LANGS.TW}` }),
			dataIndex: LANGS.TW,
			ellipsis: true,
			width: 120,
			align: 'center',
			hideInSearch: true,
		},
		{
			title: formatMessage({ id: INTERNATION.SORT }),
			dataIndex: 'sort',
			ellipsis: true,
			hideInSearch: true,
			sorter: true,
			width: 100,
			align: 'center',
			render: (text) => <Tag color={randomTagColor()}>{text}</Tag>,
		},
		{
			title: formatMessage({ id: INTERNATION.CREATED_TIME }),
			dataIndex: 'created_time',
			valueType: 'dateTime',
			sorter: true,
			hideInSearch: true,
			width: 160,
			align: 'center',
			render: (text) => (
				<Space size="small">
					<ClockCircleOutlined /><span>{text}</span>
				</Space>
			),
		},
		{
			title: formatMessage({ id: INTERNATION.CREATED_TIME }),
			dataIndex: 'created_time',
			valueType: 'dateRange',
			hideInTable: true,
			search: {
				transform: (value) => {
					return {
						start_time: dayjs(value[0]._d).format('YYYY-MM-DD 00:00:00'),
						end_time: dayjs(value[1]._d).format('YYYY-MM-DD 23:59:59'),
					};
				},
			},
		},
		{
			title: formatMessage({ id: INTERNATION.OPERATION }),
			valueType: 'option',
			width: 80,
			align: 'center',
			key: 'option',
			fixed: 'right',
			render: (_, record) => [
				<DropdownMenu
					formatPerfix={formatPathName(ROUTES.INTERNATIONALIZATION)}
					addChildCallback={() => {
						setCurrentRecord(undefined);
						set_parent_id(record.id);
						setOpenDrawerTrue()
					}
					}
					editCallback={() => {
						set_parent_id('');
						setCurrentRecord(record);
						setOpenDrawerTrue()
					}}
					deleteCallback={() => handlerDelete(record.id)}
					key="dropdownMenu"
				/>,
			],
		},
	]

	return (
		<>
			<ProTable<API.INTERNATIONALIZATION, SearchParams>
				actionRef={tableRef}
				columns={columns}
				request={async (params: SearchParams): Promise<RequestData<API.INTERNATIONALIZATION>> => {
					// 这里需要返回一个 Promise,在返回之前你可以进行数据转化
					// 如果需要转化参数可以在这里进行修改
					const response = await getInternationalList(params).then((res) => {
						const data = get(res, 'data', [])
						setTreeData(data)
						return {
							data,
							// success 请返回 true，不然 table 会停止解析数据，即使有数据
							success: res.code === REQUEST_CODE.SUCCESS,
						}
					})
					return Promise.resolve(response)
				}
				}
				rowKey="id"
				pagination={false}
				// 工具栏
				toolBarRender={() => [
					<Access
						accessible={access.operationPermission(
							get(permissions, `${formatPathName(ROUTES.INTERNATIONALIZATION)}.${OPERATION.ADD}`, ''))}
						fallback={null}
						key="plus">
						<Button
							type="primary"
							onClick={() => {
								set_parent_id('');
								setCurrentRecord(undefined);
								setOpenDrawerTrue()
							}}>
							<PlusOutlined />
							{formatMessage({
								id: `${formatPerfix(ROUTES.INTERNATIONALIZATION, true)}.${OPERATION.ADD}`,
							})}
						</Button>
					</Access>,
				]}
				scroll={{ x: columnScrollX(columns) }}
			/>
			{/* 抽屉表单 */}
			<FormTemplate
				treeData={treeData}
				reloadTable={reloadTable}
				parent_id={parent_id}
				formData={currentRecord}
				open={openDrawer}
				setOpenDrawerFalse={setOpenDrawerFalse}
			/>
		</>
	)
}
export default TableTemplate