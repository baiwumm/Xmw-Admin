/*
 * @Description: 全局上传图片组件
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-30 13:49:17
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-08-31 16:19:36
 */
import { PlusOutlined } from '@ant-design/icons';
import {
  ProFormUploadButton,
  ProFormUploadButtonProps,
  ProFormUploadDragger,
  ProFormUploadDraggerProps,
} from '@ant-design/pro-components';
import { useBoolean } from 'ahooks'
import { Space, Spin, Typography, Upload } from 'antd'
import type { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import ImgCrop, { ImgCropProps } from 'antd-img-crop';
import { get, isEmpty } from 'lodash-es'
import { FC, useEffect, useState } from 'react'

import type { AppLocalCacheModel } from '@/global/interface'
import { CACHE_KEY, isHttpLink } from '@/utils'

const { Text } = Typography;

type IProps = {
  value?: string;
  onChange?: (url?: string) => void;
  type?: 'upload' | 'dragger';
  imgCropProps?: ImgCropProps;
} & (ProFormUploadButtonProps | ProFormUploadDraggerProps)

const UploadImage: FC<IProps> = ({
  value,
  onChange,
  type = 'upload',
  fieldProps,
  imgCropProps = {
    rotationSlider: true,
    cropShape: 'round',
    showGrid: true,
  },
  ...uploadProps
}) => {
  // 获取 localstorage key
  const appCache: AppLocalCacheModel = JSON.parse(window.localStorage.getItem(CACHE_KEY) || '{}')
  // 上传图片loading
  const [uploadLoading, { setTrue: setUploadLoadingTrue, setFalse: setUploadLoadingFalse }] = useBoolean(false)
  // 文件列表
  const [fileList, setFileList] = useState<UploadFile[]>([])
  // 上传回调
  const onChangeUpload: UploadProps['onChange'] = ({ file, fileList }: UploadChangeParam<UploadFile>) => {
    // 移除图片清空值
    if (file.status === 'removed') {
      onChange?.(undefined);
    } else {
      // 上传中
      if (file.status === 'uploading') {
        setUploadLoadingTrue()
      }
      // 上传完成
      if (file.status === 'done') {
        // 获取当前上传图片路径
        const path: string = get(file, 'response.data.path')
        setUploadLoadingFalse();
        onChange?.(path);
      }
    }
    setFileList(fileList)
  };

  // 上传组件公共的 props
  const commonProps = {
    ...uploadProps,
    fieldProps: {
      ...fieldProps,
      // 上传地址
      action: '/api/upload/single-file',
      // 请求头添加token
      headers: { Authorization: `Bearer ${appCache.ACCESS_TOKEN}` },
      // 上传图片回调
      onChange: onChangeUpload,
      // 文件列表
      fileList,
    },
  }
  /**
   * @description: 限制用户上传的图片格式和大小
   * @param {RcFile} file
   * @author: 白雾茫茫丶
   */
  // const beforeUpload = (file: RcFile): boolean => {
  // 	// 限制图片类型
  // 	const isFileType = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
  // 	if (!isFileType) {
  // 		message.error(formatMessage({ id: `${formatPerfix}.file-type` }))
  // 	}
  // 	// 大小限制2MB
  // 	const isLt2M = file.size / 1024 / 1024 < 2;
  // 	if (!isLt2M) {
  // 		message.error(formatMessage({ id: `${formatPerfix}.file-siz-limit` }));
  // 	}

  // 	return isFileType && isLt2M;
  // }

  /**
   * @description: 上传用户头像
   * @author: 白雾茫茫丶
   */
  const renderUploadAvatar = () => (
    <Upload {...commonProps.fieldProps}>
      {
        !value && <Space direction="vertical">
          {
            uploadLoading ? <Spin /> : <>
              <PlusOutlined />
              <Text>上传头像</Text>
            </>
          }
        </Space>
      }
    </Upload>
  )
  // 渲染上传元素
  const renderUploadDom = () => {
    return (
      // 当外层包裹 Form.Item 的时候默认上传头像
      onChange && fieldProps?.listType === 'picture-circle' ?
        renderUploadAvatar() :
        type === 'upload' ?
          <ProFormUploadButton {...commonProps} /> :
          <ProFormUploadDragger {...commonProps} />
    )
  }

  // 文件列表回显
  useEffect(() => {
    if (value && isHttpLink(value)) {
      setFileList([{ url: value, uid: '-1', name: '' }])
    }
  }, [value])
  return (
    isEmpty(imgCropProps) ? renderUploadDom() :
      <ImgCrop {...imgCropProps}>
        {renderUploadDom()}
      </ImgCrop>
  )
}
export default UploadImage