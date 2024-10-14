/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-11 10:58:33
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-14 17:37:39
 * @Description: 滑块验证码
 */
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Icon } from '@umijs/max';
import { useMount } from 'ahooks';
import dayjs from 'dayjs';
import { divide, round, subtract } from 'lodash-es';
import { FC, type MouseEventHandler, RefObject, useImperativeHandle, useRef, useState } from 'react';

import styles from './darg.module.less'

export type DragCaptchaRef = {
  reset: () => void;
}

type DragCaptchaProps = {
  onRef?: RefObject<DragCaptchaRef>;
  width?: number; // 宽度
  height?: number; // 高度
  text?: string; // 验证码文本
  successText?: string; // 验证通过文字
  background?: string; // 背景色
  progressBarBg?: string; // 滑块背景色
  completedBg?: string; // 验证成功背景色
  circle?: boolean; // 是否为圆形
  radius?: string; // 圆角
  handlerIcon?: `ri:${string}`; // 滑块图标
  successIcon?: `ri:${string}`; // 验证通过图标
  handlerBg?: string; // 滑块背景色
  textSize?: string; // 文字大小
  textColor?: string; // 文字颜色
  handlerMove?: () => void; // 拖拽开始回调
  passfail?: () => void; // 拖拽失败回调
  passSuccess?: (seconds: number) => void; // 拖拽成功回调
}

const DragCaptcha: FC<DragCaptchaProps> = ({
  onRef,
  width = 250,
  height = 40,
  text = '请按住滑块拖动',
  successText = '验证通过',
  background = '#eee',
  progressBarBg = '#76c61d',
  completedBg = '#76c61d',
  circle = false,
  radius = '4px',
  handlerIcon = 'ri:arrow-right-double-line',
  successIcon = 'ri:checkbox-circle-line',
  handlerBg = '#fff',
  textSize = '14px',
  textColor = '#333',
  handlerMove,
  passfail,
  passSuccess,
}) => {
  const [isMoving, setIsmoving] = useState(false); // 是否处于拖动状态
  const [mouseX, setMouseX] = useState(0); // 鼠标当前位置
  const [isOk, setIsOk] = useState(false); // 是否验证成功
  const [startTime, setStartTime] = useState(0); // 开始时间
  const [isPassing, setIsPassing] = useState(false);

  const dragCaptchaRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const handlerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  // 跟随主题色变化
  const PrimaryColor = useEmotionCss(({ token }) => {
    return { color: token.colorPrimary, fontSize: 16 };
  });

  // 拖拽开始回调
  const dragStart: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isPassing) {
      // 记录开始时间
      setStartTime(dayjs().valueOf());
      setIsmoving(true)
      setMouseX(e.pageX);
    }
    handlerMove?.();
  };

  // 验证通过回调
  const passVerify = () => {
    setIsPassing(true);
    setIsmoving(false);
    if (dragCaptchaRef.current) {
      dragCaptchaRef.current.style.setProperty('--textColor', '#fff');
    }
    passSuccess?.(round(divide(subtract(dayjs().valueOf(), startTime), 1000), 2));
  };

  // 拖拽移动回调
  const dragMoving: MouseEventHandler<HTMLDivElement> = (e) => {
    if (isMoving && !isPassing) {
      const diffX = e.pageX - mouseX;
      if (diffX > 0 && diffX <= width - height) {
        if (handlerRef.current) {
          handlerRef.current.style.left = `${diffX}px`;
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${diffX + height / 2}px`;
        }
      } else if (diffX > width - height) {
        if (handlerRef.current) {
          handlerRef.current.style.left = `${width - height}px`;
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${width - height / 2}px`;
        }
      }
    }
  };
  // 拖拽结束回调
  const dragFinish: MouseEventHandler<HTMLDivElement> = (e) => {
    if (isMoving && !isPassing) {
      const diffX = e.pageX - mouseX;
      if (diffX < width - height) {
        setIsOk(true);
        setTimeout(() => {
          if (handlerRef.current) {
            handlerRef.current.style.left = '0';
          }
          if (progressBarRef.current) {
            progressBarRef.current.style.width = '0';
          }
          setIsOk(false);
        }, 500);
        passfail?.();
      } else {
        if (handlerRef.current) {
          handlerRef.current.style.left = `${width - height}px`;
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${width - height / 2}px`;
        }
        passVerify();
      }
      setIsmoving(false)
    }
  };

  // 重置状态
  const reset = () => {
    setIsmoving(false);
    setMouseX(0);
    setIsPassing(false);
    setIsOk(false);
    if (handlerRef.current) {
      handlerRef.current.style.left = '0';
    }
    if (progressBarRef.current) {
      progressBarRef.current.style.width = '0';
    }
    if (dragCaptchaRef.current) {
      dragCaptchaRef.current.style.setProperty('--textColor', textColor);
    }
    if (messageRef.current) {
      messageRef.current.style.color = background;
    }
  };

  useMount(() => {
    if (dragCaptchaRef.current) {
      dragCaptchaRef.current.style.setProperty('--textColor', textColor);
      dragCaptchaRef.current.style.setProperty('--width', `${Math.floor(width / 2)}px`);
      dragCaptchaRef.current.style.setProperty('--pwidth', `${-Math.floor(width / 2)}px`);
    }
  });

  // 用useImperativeHandle暴露一些外部ref能访问的属性
  useImperativeHandle(onRef, () => ({ reset }))
  return (
    <div
      className={styles['drag-captcha']}
      ref={dragCaptchaRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        lineHeight: `${height}px`,
        background: background,
        borderRadius: circle ? `${height / 2}px` : radius,
      }}
      onMouseMove={dragMoving}
      onMouseUp={dragFinish}
      onMouseLeave={dragFinish}
    >
      <div
        ref={progressBarRef}
        className={styles['dv_progress_bar']}
        style={{
          background: progressBarBg,
          height: `${height}px`,
          borderRadius: circle ? `${height / 2}px 0 0 ${height / 2}px` : radius,
          backgroundColor: completedBg,
          width: isOk ? 0 : undefined,
          transition: isOk ? 'width 0.5s' : undefined,
        }}
      ></div>
      <div ref={messageRef} className={styles['dv_text']} style={{
        height: `${height}px`,
        width: `${width}px`,
        fontSize: textSize,
      }}>
        <div
          className={styles['dv_text_box']}
          style={{ color: isPassing ? '#fff' : textColor }}
        >
          <Icon
            icon={isPassing ? 'ri:lock-unlock-line' : 'ri:lock-line'}
          />
          {isPassing ? successText : text}
        </div>
      </div>

      <div
        ref={handlerRef}
        className={styles['dv_handler']}
        style={{
          left: isOk ? 0 : undefined,
          width: `${height}px`,
          height: `${height}px`,
          background: handlerBg,
          transition: isOk ? 'left 0.5s' : undefined,
        }}
        onMouseDown={dragStart}
      >
        <Icon
          icon={isPassing ? successIcon : handlerIcon}
          className={PrimaryColor}
          style={{ fontSize: 21, color: isPassing ? completedBg : undefined }}
        />
      </div>
    </div>
  )
}
export default DragCaptcha;
