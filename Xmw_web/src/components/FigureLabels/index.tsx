/*
 * @Description: 人物标签
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-09 10:38:10
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-10 11:32:30
 */
import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useBoolean } from 'ahooks';
import type { InputRef } from 'antd';
import { Input, Tag, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

type IProps = {
    value?: string[]
    onChange?: (value: string[]) => void;
}

const FigureLabels: FC<IProps> = ({ value, onChange }) => {
    // 自定义默认标签
    const [tags, setTags] = useState<string[]>([]);
    // 控制 input 框显隐
    const [inputVisible, { setTrue: setInputVisibleTrue, setFalse: setInputVisibleFalse }] = useBoolean(false);
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
            setTags(value)
        }
    }, [value])

    // 表单收集字段
    const triggerChange = (changedValue: string[]) => {
        onChange?.([...changedValue]);
    };

    // 移除标签
    const handleClose = (removedTag: string) => {
        const newTags = tags.filter(tag => tag !== removedTag);
        setTags(newTags);
        triggerChange(newTags)
    };

    // 回车或 input 失去焦点的时候触发
    const handleInputConfirm = () => {
        // 已存在的 tag 则不执行新增
        if (inputValue && !tags.includes(inputValue)) {
            setTags([...tags, inputValue]);
            triggerChange([...tags, inputValue])
        }
        setInputVisibleFalse();
        setInputValue('');
    };

    // 编辑状态下，回车或 input 失去焦点的时候触发
    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        setTags(newTags);
        triggerChange(newTags)
        setEditInputIndex(-1);
        setInputValue('');
    };

    // 多彩 tags
    const randomColor = () => {
        const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
        return colors[Math.floor(Math.random() * colors.length)]
    }

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
                            onChange={e => setEditInputValue(e.target.value)}
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
                        onDoubleClick={e => {
                            setEditInputIndex(index);
                            setEditInputValue(tag);
                            e.preventDefault();
                        }}
                        color={randomColor()}
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
            {
                inputVisible ? <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                    maxLength={10}
                    showCount
                    style={{ width: '120px' }}
                /> : (
                    tags.length <= 15 ? <Tag onClick={() => { setInputVisibleTrue(); setEditInputIndex(-1) }}><PlusOutlined /> New Tag</Tag> : null
                )
            }
        </>
    );
}

export default FigureLabels