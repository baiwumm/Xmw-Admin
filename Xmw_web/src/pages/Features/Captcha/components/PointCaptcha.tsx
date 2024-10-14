/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-11 16:00:36
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-14 17:08:08
 * @Description: 点选验证码
 */
import { Icon } from '@umijs/max';
import { useMount, useSetState } from 'ahooks';
import { Alert, Button, Space, Spin } from 'antd';
import { cloneDeep, difference, every, join, map, random, sample, shuffle } from 'lodash-es';
import { FC, type MouseEvent, RefObject, useImperativeHandle, useRef } from 'react';

import { generateRandomHanziArray, randomColor } from '@/utils';

export type PointCaptchaRef = {
  refresh: () => void;
}

// 坐标点
type Point = {
  x: number;
  y: number;
};

type CanvasPoints = Point & { char: string };

type State = {
  canvasPoints: CanvasPoints[];
  checkPoints: Point[];
  text: string;
  result: boolean;
  showTip: boolean;
  loading: boolean;
};

// 定义一个接口来描述 props 的类型
type PointCaptchaProps = {
  onRef?: RefObject<PointCaptchaRef>;
  width?: number; // 宽度
  height?: number; // 高度
  defaultNum?: number; // 默认的文字数量
  checkNum?: number; // 校对的文字数量
  imgs?: string[]; // 图片数组，如果不传，则随机背景色
  disturbLine?: number; // 干扰线数量，0为不绘制
  disturbPoint?: number; // 干扰点数量，0为不绘制
  fontSizeMin?: number; // 字体最小值
  fontSizeMax?: number; // 字体最大值
  range?: number; // 校验的容错范围，数值越大，越容易校验通过
  successText?: string; // 校验通过显示的文字
  errorText?: string; // 校验失败显示的文字
  callback?: (result: boolean) => void; // 校验结果
};

const PointCaptcha: FC<PointCaptchaProps> = ({
  onRef,
  width = 200,
  height = 300,
  defaultNum = 4,
  checkNum = 3,
  imgs = () => [],
  disturbLine = 5,
  disturbPoint = 10,
  fontSizeMin = 25,
  fontSizeMax = 35,
  range = 40,
  successText = '验证通过',
  errorText = '验证失败',
  callback,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 初始化数据
  const initState = (): State => ({
    canvasPoints: [], // 画布生成的坐标信息
    checkPoints: [], // 用户点击的坐标
    text: '刷新中...', // 按钮显示的文字
    result: false, // 校验结果
    showTip: false, // 是否显示结果提示
    loading: false, // 是否加载中
  });

  const [state, setState] = useSetState(initState());

  /** @description: 绘制干扰线 */
  const drawLine = (ctx: CanvasRenderingContext2D) => {
    // 绘制干扰线
    for (let i = 0; i < disturbLine; i += 1) {
      ctx.strokeStyle = randomColor(100, 200);
      ctx.beginPath();
      ctx.moveTo(random(0, width), random(0, height));
      ctx.lineTo(random(0, width), random(0, height));
      ctx.stroke();
    }
  };

  /** @description: 绘制干扰点 */
  const drawPoint = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < disturbPoint; i += 1) {
      ctx.fillStyle = randomColor();
      ctx.beginPath();
      ctx.arc(random(0, width), random(0, height), 1, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  // 判断点选结果
  const comparePoints = (canvasPoints: State['canvasPoints'], checkPoints: Point[]) => {
    function isWithinRange(point: Point, checkPoint: Point, rangeValue = range) {
      const dx = Math.abs(point.x - checkPoint.x);
      const dy = Math.abs(point.y - checkPoint.y);
      return dx <= rangeValue && dy <= rangeValue;
    }
    return every(canvasPoints, (point: Point, index: number) => isWithinRange(point, checkPoints[index]));
  };

  // 打乱数组，并删除最后一个元素
  const shuffleAndPopArray = (arr: State['canvasPoints']) => {
    // 使用 _.shuffle 方法打乱数组
    const shuffledArray = shuffle(arr);
    // 删除最后一个元素
    shuffledArray.pop();
    return shuffledArray;
  };

  // 绘制合成的图片
  const drawImg = (img?: HTMLImageElement) => {
    // 准备canvas环境
    const ctx = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D;

    if (img) {
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
      // 绘制图片
      // ctx.drawImage(img, 0, 0, width, height);
      // 使用计算后的尺寸和位置绘制图片
      ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
    } else {
      // 绘制背景
      ctx.fillStyle = randomColor();
      ctx.fillRect(0, 0, width, height);
    }

    // 是否绘制干扰线
    if (disturbLine) {
      drawLine(ctx);
    }

    // 是否绘制干扰点
    if (disturbPoint) {
      drawPoint(ctx);
    }

    const fontStr = generateRandomHanziArray(defaultNum); // 不重复的汉字

    // 需要绘制的文字
    const fontChars: string[] = [];
    const canvasPoints = []
    // 开始绘制文字
    for (let i = 1; i <= defaultNum; i += 1) {
      // 加入不重复的文字
      fontChars[i - 1] = sample(difference(fontStr, fontChars)) as string;

      ctx.font = `${random(fontSizeMin, fontSizeMax)}px SimHei`; // 随机生成字体大小
      ctx.fillStyle = randomColor();

      // 计算 x 坐标
      const margin = 20; // 容器边缘留白
      const textWidth = ctx.measureText(fontChars[i - 1]).width;
      const x = Math.floor(width / defaultNum) * i - textWidth - margin;
      const y = random(margin + textWidth, height - margin);

      ctx.fillText(fontChars[i - 1], x, y);
      canvasPoints[i - 1] = { char: fontChars[i - 1], x, y };
      setState({
        canvasPoints,
      })
    }
    const shuffleCanvasPoints = shuffleAndPopArray(canvasPoints);
    for (let i = 0; i < defaultNum - checkNum; i += 1) {
      setState({
        canvasPoints: shuffleCanvasPoints,
      })
    }

    // 设置提示语
    setState({
      text: `请顺序点击【${join(map(shuffleCanvasPoints, 'char'), ',')}】`,
    })

    return shuffleCanvasPoints;
  };

  // 刷新状态
  const refresh = () => {
    // 重置状态
    setState(initState())

    // 判断是否有传图片
    if (imgs.length) {
      const img = new Image();
      // 获取随机一张图片
      img.src = sample(imgs) as string;
      // 加载完成开始绘制
      setState({
        loading: true,
      })
      img.onload = () => {
        setState({
          canvasPoints: drawImg(img),
          loading: false,
        })
      };
    } else {
      setState({
        canvasPoints: drawImg(),
      })
    }
  }

  // 画布点选回调
  const canvasClick = (e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>) => {
    if (state.result) {
      return
    }
    const checkPoints = cloneDeep(state.checkPoints);
    // 判断用户点击的坐标是否大于校对的数量
    if (state.checkPoints.length < checkNum) {
      // 获取相对于 canvas 的坐标
      const rect = canvasRef.current?.getBoundingClientRect() as DOMRect;

      const x = e.clientX - rect.left - 16;
      const y = e.clientY - rect.top - 16;
      // 记录用户点击的坐标
      checkPoints.push({
        x, y,
      });
      setState({
        checkPoints,
      })
    }
    // 如果校对数量相同，则校验结果
    if (checkPoints.length === checkNum) {
      setTimeout(() => {
        // 校验结果
        const result = comparePoints(state.canvasPoints, checkPoints);
        if (!result) {
          // 验证失败
          setState({
            text: errorText,
            result: false,
            showTip: true,
          })
          setTimeout(() => {
            refresh();
          }, 400);
        } else {
          // 验证成功
          setState({
            text: successText,
            result: true,
            showTip: true,
          })
        }
        callback?.(result);
      }, 400);
    }
  };

  useMount(() => {
    refresh();
  })

  // 用useImperativeHandle暴露一些外部ref能访问的属性
  useImperativeHandle(onRef, () => ({ refresh }))
  return (
    <div style={{
      width,
      position: 'relative',
      margin: '0 auto',
    }}>
      <Space direction="vertical" size={20}>
        <Spin spinning={state.loading}>
          <div
            style={{
              width: width,
              height: height,
              backgroundSize: width + ' ' + height,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 4,
            }}
          >
            <canvas
              ref={canvasRef}
              width={width}
              height={height}
              onClick={canvasClick}
            />
            {map(state.checkPoints, (point: CanvasPoints, index: number) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  zIndex: 50,
                  top: `${point.y}px`,
                  left: `${point.x}px`,
                }}
              >
                <Button type="primary" shape="circle">{index + 1}</Button>
              </div>
            ))}
          </div>
        </Spin>
        {/* 画布下方提示 */}
        <Alert
          message={state.text}
          type={state.showTip ? (state.result ? 'success' : 'error') : 'info'}
          action={<div
            style={{
              zIndex: 10,
              cursor: 'pointer',
              fontSize: 20,
            }}
            onClick={refresh}
          >
            <Icon icon="ri:reset-left-fill" style={{ color: 'rgb(100 116 139)' }} />
          </div>}
        />
      </Space>
    </div>
  )
}
export default PointCaptcha;