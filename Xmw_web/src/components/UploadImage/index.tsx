/*
 * @Description: 全局上传图片组件
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-30 13:49:17
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-09 17:56:56
 */
import {
  ProFormUploadButton,
  ProFormUploadButtonProps,
  ProFormUploadDragger,
  ProFormUploadDraggerProps,
} from '@ant-design/pro-components';
import { Icon, useIntl } from '@umijs/max';
import { useBoolean } from 'ahooks';
import { App, Space, Spin, Typography, Upload } from 'antd';
import type { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import ImgCrop, { ImgCropProps } from 'antd-img-crop';
import { get, isEmpty } from 'lodash-es';
import { FC, useEffect, useState } from 'react';

import { formatPerfix, getLocalStorageItem, isHttpLink } from '@/utils';
import { INTERNATION, LOCAL_STORAGE, ROUTES } from '@/utils/enums';

const { Text } = Typography;

type UploadImageProps = {
  value?: string;
  onChange?: (url?: string) => void;
  type?: 'upload' | 'dragger';
  maxSize?: number;
  imgCropProps?: ImgCropProps;
} & (ProFormUploadButtonProps | ProFormUploadDraggerProps);

const UploadImage: FC<UploadImageProps> = ({
  value,
  onChange,
  type = 'upload',
  maxSize = 5, // 图片大小，默认5m
  fieldProps,
  imgCropProps = {
    rotationSlider: true,
    cropShape: 'round',
    showGrid: true,
  },
  ...uploadProps
}) => {
  // 多语言函数
  const { formatMessage } = useIntl();
  // hooks 调用
  const { message } = App.useApp();
  // 获取 Token
  const ACCESS_TOKEN = getLocalStorageItem<string>(LOCAL_STORAGE.ACCESS_TOKEN);
  // 上传图片loading
  const [uploadLoading, { setTrue: setUploadLoadingTrue, setFalse: setUploadLoadingFalse }] =
    useBoolean(false);
  // 文件列表
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // 上传回调
  const onChangeUpload: UploadProps['onChange'] = ({
    file,
    fileList,
  }: UploadChangeParam<UploadFile>) => {
    // 移除图片清空值
    if (file.status === 'removed') {
      onChange?.(undefined);
    } else {
      // 上传中
      if (file.status === 'uploading') {
        setUploadLoadingTrue();
      }
      // 上传完成
      if (file.status === 'done') {
        // 获取当前上传图片路径
        const path: string = get(file, 'response.data.path');
        setUploadLoadingFalse();
        onChange?.(path);
      }
    }
    setFileList(fileList);
  };

  /**
   * @description: 限制用户上传的图片格式和大小
   * @param {RcFile} file
   * @author: 白雾茫茫丶
   */
  const beforeUpload = (file: RcFile) => {
    // 获取限制的图片类型，默认全部
    const accept = get(fieldProps, 'accept');
    // 判断类型是否正确
    const isFileType = !accept || accept.includes(file.type);
    // 图片大小限制
    const isLtSize = file.size / 1024 / 1024 < maxSize;
    if (!isFileType) {
      message.error(formatMessage({ id: `${INTERNATION.UPLOADIMAGE}.accept` }, { type: accept }));
      return Upload.LIST_IGNORE;
    }
    if (!isLtSize) {
      message.error(formatMessage({ id: `${INTERNATION.UPLOADIMAGE}.maxSize` }, { size: maxSize }));
      return Upload.LIST_IGNORE;
    }

    return isFileType && isLtSize;
  };

  // 上传组件公共的 props
  const commonProps = {
    ...uploadProps,
    fieldProps: {
      ...fieldProps,
      // 上传地址
      action: '/api/upload/single-file',
      // 请求头添加token
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      // 上传前校验
      beforeUpload,
      // 上传图片回调
      onChange: onChangeUpload,
      // 文件列表
      fileList,
    },
  };

  /**
   * @description: 上传用户头像
   * @author: 白雾茫茫丶
   */
  const renderUploadAvatar = () => (
    <Upload {...commonProps.fieldProps}>
      {!value && (
        <Space direction="vertical">
          {uploadLoading ? (
            <Spin />
          ) : (
            <>
              <Icon icon="ri:add-large-line" style={{ display: 'inline-block' }} />
              <Text>
                {formatMessage({
                  id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.steps-form.set-avatar`,
                })}
              </Text>
            </>
          )}
        </Space>
      )}
    </Upload>
  );
  // 渲染上传元素
  const renderUploadDom = () => {
    return (
      // 当外层包裹 Form.Item 的时候默认上传头像
      onChange && fieldProps?.listType === 'picture-circle' ? (
        renderUploadAvatar()
      ) : type === 'upload' ? (
        <ProFormUploadButton {...commonProps} />
      ) : (
        <ProFormUploadDragger {...commonProps} />
      )
    );
  };

  // 文件列表回显
  useEffect(() => {
    if (value && isHttpLink(value)) {
      setFileList([{ url: value, uid: '-1', name: '' }]);
    }
    if (!value) {
      setFileList([]);
    }
  }, [value]);
  return isEmpty(imgCropProps) ? (
    renderUploadDom()
  ) : (
    <ImgCrop {...imgCropProps}>{renderUploadDom()}</ImgCrop>
  );
};
export default UploadImage;
