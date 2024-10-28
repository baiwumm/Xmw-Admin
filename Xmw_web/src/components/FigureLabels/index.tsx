/*
 * @Description: 人物标签
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-09 10:38:10
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-28 17:16:36
 */
import { Icon, useModel } from '@umijs/max';
import { useBoolean, useRequest } from 'ahooks';
import { App, Input, InputRef, Space, Tag, Tooltip } from 'antd';
import { FC, useEffect, useRef, useState } from 'react';

import { updateUser } from '@/services/system/user-management'; // 用户管理接口
import { isSuccess, randomTagColor } from '@/utils';
import type { InitialStateTypes } from '@/utils/types';

type IProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
  canCallback?: boolean;
};

const FigureLabels: FC<IProps> = ({ value, onChange, canCallback }) => {
  // 获取全局状态
  const { initialState, setInitialState } = useModel('@@initialState');
  // hooks 调用
  const { message } = App.useApp();
  // 自定义默认标签
  const [tags, setTags] = useState<string[]>([]);
  // 控制 input 框显隐
  const [inputVisible, { setTrue: setInputVisibleTrue, setFalse: setInputVisibleFalse }] =
    useBoolean(false);
  // 获取 input 的 value
  const [inputValue, setInputValue] = useState('');
  // 获取编辑状态下 input 的索引
  const [editInputIndex, setEditInputIndex] = useState(-1);
  // 获取编辑状态下 input 的 value
  const [editInputValue, setEditInputValue] = useState('');
  // 绑定 input 的 ref
  const inputRef = useRef<InputRef>(null);
  // 绑定编辑状态下 input 的 ref
  const editInputRef = useRef<InputRef>(null);

  // 表单收集字段
  const triggerChange = (changedValue: string[]) => {
    onChange?.([...changedValue]);
  };

  /**
   * @description: 更新用户信息
   * @author: 白雾茫茫丶
   */
  const { run: runUpdateUser } = useRequest(updateUser, {
    manual: true,
    onSuccess: async ({ code, msg }, params) => {
      if (isSuccess(code)) {
        const newTags = params[0]?.tags as string[];
        message.success(msg);
        setTags(newTags);
        triggerChange(newTags);
        // 更新全局状态
        if (params[0]?.tags && initialState?.CurrentUser?.user_id) {
          setInitialState((s: InitialStateTypes) => ({
            ...s,
            CurrentUser: { ...initialState?.CurrentUser, tags: newTags },
          }));
        }
      }
    },
  });

  // 当显示 input 框的时候，聚焦
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  // 当显示编辑 input 框的时候，聚焦
  useEffect(() => {
    if (editInputIndex !== -1) {
      editInputRef.current?.focus();
    }
  }, [editInputIndex]);

  // 拿到表单数据回显
  useEffect(() => {
    if (value) {
      setTags(value);
    }
  }, [value]);

  // 移除标签
  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    // 判断是否需要更新用户信息
    if (canCallback) {
      const user_id = initialState?.CurrentUser?.user_id;
      if (user_id) {
        runUpdateUser({ tags: newTags, user_id });
      }
    } else {
      setTags(newTags);
      triggerChange(newTags);
    }
  };

  // 回车或 input 失去焦点的时候触发
  const handleInputConfirm = () => {
    // 已存在的 tag 则不执行新增
    if (inputValue && !tags.includes(inputValue)) {
      // 判断是否需要更新用户信息
      if (canCallback) {
        const user_id = initialState?.CurrentUser?.user_id;
        if (user_id) {
          runUpdateUser({ tags: [...tags, inputValue], user_id });
        }
      } else {
        setTags([...tags, inputValue]);
        triggerChange([...tags, inputValue]);
      }
    }
    setInputVisibleFalse();
    setInputValue('');
  };

  // 编辑状态下，回车或 input 失去焦点的时候触发
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    triggerChange(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };

  return (
    <>
      {/* 遍历显示 tags */}
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              size="small"
              value={editInputValue}
              onChange={(e) => setEditInputValue(e.target.value)}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
              maxLength={10}
              showCount
              style={{ width: '120px' }}
            />
          );
        }

        const isLongTag = tag.length > 6;

        const tagElem = (
          <Tag
            key={tag}
            closable={true}
            onClose={() => handleClose(tag)}
            onDoubleClick={(e) => {
              setEditInputIndex(index);
              setEditInputValue(tag);
              e.preventDefault();
            }}
            color={randomTagColor()}
            style={{ marginTop: 5 }}
          >
            {isLongTag ? `${tag.slice(0, 6)}...` : tag}
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {/* 控制新增标签和 input 的显示 */}
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
          maxLength={10}
          showCount
          style={{ width: 120, marginTop: 5 }}
        />
      ) : tags.length <= 15 ? (
        <Tag
          onClick={() => {
            setInputVisibleTrue();
            setEditInputIndex(-1);
          }}
          style={{ marginTop: 5 }}
        >
          <Space size={2}>
            <Icon icon="ri:add-large-line" />
            <span>New Tag</span>
          </Space>
        </Tag>
      ) : null}
    </>
  );
};

export default FigureLabels;
