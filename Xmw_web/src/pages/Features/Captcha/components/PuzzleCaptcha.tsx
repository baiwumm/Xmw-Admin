/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-14 17:57:23
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-15 17:54:19
 * @Description: 拼图验证码
 */
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Icon } from '@umijs/max';
import { useMount, useSetState } from 'ahooks';
import { Spin } from 'antd';
import { random, sample, sum } from 'lodash-es';
import React, { FC, type MouseEventHandler, ReactNode, RefObject, useImperativeHandle, useRef, useState } from 'react';

import { getRandomImg } from '@/utils';

export type PuzzleCaptchaRef = {
  reset: () => void;
}

type PuzzleCaptchaProp = {
  onRef?: RefObject<PuzzleCaptchaRef>;
  width?: number; // 宽度，默认320
  height?: number; // 高度，默认160
  slideHeight?: number; // 滑块高度，默认40
  gap?: number; // 拼图和滑块的间隔，默认15
  l?: number; // 滑块边长，默认42
  r?: number; // 滑块半径，默认9
  text?: string | ReactNode; // 滑块文本，默认 拖动滑块完成拼图
  successText?: string; // 验证通过文字
  failText?: string; // 验证失败文字
  refreshIcon?: `ri:${string}`; // 刷新按钮icon
  handlerIcon?: `ri:${string}`; // 滑块图标
  radius?: string; // 圆角
  imgs?: string[]; // 图片数组
  onDraw?: (l: number) => void; // 拖拽滑块时的回调, 参数为当前滑块拖拽的距离
  onSuccess?: VoidFunction; // 验证成功回调
  onFail?: VoidFunction; // 验证失败回调
  onRefresh?: VoidFunction; // 刷新时回调
}

const PuzzleCaptcha: FC<PuzzleCaptchaProp> = ({
  onRef,
  width = 320,
  height = 160,
  slideHeight = 40,
  gap = 15,
  l = 42,
  r = 9,
  radius = '4px',
  imgs = [],
  text = '拖动滑块完成拼图',
  successText = '验证通过',
  failText = '验证失败，请重试',
  refreshIcon = 'ri:reset-left-fill',
  handlerIcon = 'ri:arrow-right-double-line',
  onDraw,
  onSuccess,
  onFail,
  onRefresh,
}) => {
  const [isLoading, setLoading] = useState(false); // 是否加载中
  const [sliderLeft, setSliderLeft] = useState(0);
  const [originAxis, setOriginAxis] = useSetState({
    x: 0,
    y: 0,
  }); // 初始可视距离
  const [isMoving, setIsMoving] = useState(false); // 鼠标是否移动状态
  const [showTip, setShowTip] = useState(false); // 是否显示提示语
  const [isPassing, setIsPassing] = useState(false); // 是否验证成功
  const canvasRef = useRef<HTMLCanvasElement>(null); // 画布
  const puzzleRef = useRef<HTMLCanvasElement>(null); // 拼图
  const trailRef = useRef<number[]>([]);
  const xRef = useRef<number>(0);
  const yRef = useRef<number>(0);
  const PI = Math.PI;
  const L = l + r * 2 + 3; // 滑块实际边长

  // 跟随主题色变化
  const PrimaryColor = useEmotionCss(({ token }) => {
    return { color: token.colorPrimary, fontSize: 16 };
  });

  const drawPath = (
    ctx: any,
    x: number,
    y: number,
    operation: 'fill' | 'clip',
  ) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
    ctx.lineTo(x + l, y);
    ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
    ctx.lineTo(x + l, y + l);
    ctx.lineTo(x, y + l);
    ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
    ctx.lineTo(x, y);
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.stroke();
    ctx.globalCompositeOperation = 'destination-over';
    ctx[operation]();
  };

  // 获取图片地址
  const getRandomImgSrc = () => imgs.length ? sample(imgs) : getRandomImg();


  // 绘制图像
  const draw = (img: HTMLImageElement) => {
    const canvasCtx = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D;
    const puzzleCtx = puzzleRef.current?.getContext('2d') as CanvasRenderingContext2D;
    // 随机位置创建拼图形状
    xRef.current = random(L + 10, width - (L + 10));
    yRef.current = random(10 + r * 2, height - (L + 10));
    drawPath(canvasCtx, xRef.current, yRef.current, 'fill');
    drawPath(puzzleCtx, xRef.current, yRef.current, 'clip');

    // 确保图片不变形
    const canvasWidth = width;
    const canvasHeight = height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    // 计算宽高比
    const imageAspectRatio = imgWidth / imgHeight;
    const canvasAspectRatio = canvasWidth / canvasHeight;

    let sx = 0;
    let sy = 0;
    let sw = imgWidth;
    let sh = imgHeight;
    const dx = 0;
    const dy = 0;
    const dw = canvasWidth;
    const dh = canvasHeight;

    // 如果图片的宽高比大于画布的宽高比，则需要裁剪宽度
    if (imageAspectRatio > canvasAspectRatio) {
      sw = imgHeight * canvasAspectRatio;
      sx = (imgWidth - sw) / 2;
    } else {
      // 否则需要裁剪高度
      sh = imgWidth / canvasAspectRatio;
      sy = (imgHeight - sh) / 2;
    }

    // 使用计算后的尺寸和位置绘制图片
    canvasCtx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);;
    puzzleCtx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);;

    // 提取滑块并放到最左边
    const y1 = yRef.current - r * 2 - 1;
    const ImageData = puzzleCtx.getImageData(xRef.current - 3, y1, L, L);
    if (puzzleRef.current) {
      puzzleRef.current.width = L;
    }
    puzzleCtx.putImageData(ImageData, 0, y1);
  };

  // 初始化图像
  const initImg = () => {
    const img = new Image();
    img.src = getRandomImgSrc();
    setLoading(true);
    img.onload = () => {
      setLoading(false);
      draw(img);
    };
  };


  // 重置验证码
  const reset = () => {
    const canvasCtx = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D;
    const puzzleCtx = puzzleRef.current?.getContext('2d') as CanvasRenderingContext2D;
    // 重置样式
    setSliderLeft(0);
    setShowTip(false);
    setIsPassing(false);
    if (puzzleRef.current) {
      puzzleRef.current.width = width;
      puzzleRef.current.style.left = 0 + 'px';
    }
    // 清空画布
    canvasCtx.clearRect(0, 0, width, height);
    puzzleCtx.clearRect(0, 0, width, height);

    // 重新加载图片
    initImg();
  };

  // 刷新回调
  const handleRefresh = () => {
    reset();
    onRefresh?.();
  };

  const verify = () => {
    const arr = trailRef.current; // 拖动时y轴的移动距离
    const average = sum(arr) / arr.length;
    const deviations = arr.map((x) => x - average);
    const stddev = Math.sqrt(sum(deviations.map((x) => x * x)) / arr.length);
    const left = parseInt(puzzleRef.current.style.left);
    return {
      spliced: Math.abs(left - xRef.current) < 10,
      verified: stddev !== 0, // 简单验证拖动轨迹，为零时表示Y轴上下没有波动，可能非人为操作
    };
  };


  // 拖拽开始回调
  const handleDragStart: MouseEventHandler<HTMLDivElement> = (e) => {
    setOriginAxis({
      x: e.clientX,
      y: e.clientY,
    })
    setIsMoving(true)
  };


  // 拖拽移动回调
  const handleDragMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isMoving) return false;
    e.preventDefault();
    // 判断是否超出边界
    if (width - sliderLeft - slideHeight <= 0) {
      onFail?.();
      setShowTip(true);
      setIsMoving(false)
      setTimeout(reset, 1000);
      return false
    }
    const moveX = e.clientX - originAxis.x;
    const moveY = e.clientY - originAxis.y;
    if (moveX < 0 || moveX + 38 >= width) return false;
    setSliderLeft(moveX);
    const blockLeft = ((width - 40 - 20) / (width - 40)) * moveX;
    if (puzzleRef.current) {
      puzzleRef.current.style.left = blockLeft + 'px';
    }
    trailRef.current.push(moveY);
    onDraw?.(blockLeft);
  };

  // 拖拽结束回调
  const handleDragEnd: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isMoving) return false;
    setIsMoving(false)
    if (e.clientX === originAxis.x) return false;
    setShowTip(true)
    const { spliced, verified } = verify()
    if (spliced) {
      if (verified) {
        setIsPassing(true);
        onSuccess?.();
      } else {
        reset();
      }
    } else {
      onFail?.();
      setTimeout(reset, 1000);
    }
  };

  useMount(() => {
    reset();
  })

  // 用useImperativeHandle暴露一些外部ref能访问的属性
  useImperativeHandle(onRef, () => ({ reset }))

  return (
    <div
      className="puzzleCaptcha"
      style={{
        position: 'relative',
        width: width + 'px',
        margin: '0 auto',
      }}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
    >
      <Spin spinning={isLoading} tip='加载中'>
        <div style={{ position: 'relative', borderRadius: radius }}>
          <canvas ref={canvasRef} width={width} height={height} />
          <canvas
            ref={puzzleRef}
            width={width}
            height={height}
            style={{
              position: 'absolute',
              top: 0,
            }}
          />
          <div style={{
            position: 'absolute',
            opacity: showTip ? 1 : 0,
            bottom: 0,
            left: 0,
            background: isPassing ? '#76c61d' : '#ce594b',
            color: '#fff',
            width: '100%',
            textAlign: 'center',
            lineHeight: '24px',
            transition: '.3s all',
          }}>{isPassing ? successText : failText}</div>
        </div>
      </Spin>
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          pointerEvents: isPassing ? 'none' : 'auto',
          width,
          height: slideHeight,
          background: '#f7f9fa',
          lineHeight: `${slideHeight}px`,
          borderRadius: radius,
          marginTop: gap,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${sliderLeft}px`,
            height: slideHeight,
            background: '#d1e9fe',
          }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              width: slideHeight,
              height: slideHeight,
              left: `${sliderLeft}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#fff',
              cursor: 'grab',
              zIndex: 99,
            }}
            onMouseDown={handleDragStart}
          >
            <Icon
              icon={handlerIcon}
              className={PrimaryColor}
              style={{ fontSize: 21, userSelect: 'none' }} />
          </div>
        </div>
        <div style={{ opacity: .65, userSelect: 'none' }} >{text}</div>
      </div>
      {/* 刷新按钮 */}
      <div
        onClick={handleRefresh}
        style={{
          position: 'absolute',
          right: 5,
          top: 5,
          cursor: 'pointer',
        }}
      >
        <Icon icon={refreshIcon} style={{ color: '#fff', fontSize: 24 }} />
      </div>
    </div>
  );
};
export default PuzzleCaptcha;
