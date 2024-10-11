/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-10 16:35:52
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-11 15:19:30
 * @Description: 图形验证码
 */
import { useMount } from 'ahooks';
import { join, random, times } from 'lodash-es'
import { FC, RefObject, useEffect, useImperativeHandle, useState } from 'react';

import { codeChars, randomColor } from '@/utils';

export type GraphicCaptchaRef = {
  identifyCode: string;
}

type GraphicCaptchaProps = {
  onRef?: RefObject<GraphicCaptchaRef>;
  fontSizeMin?: number; // 字体最小值
  fontSizeMax?: number; // 字体最大值
  backgroundColorMin?: number; // 验证码图片背景色最小值
  backgroundColorMax?: number; // 验证码图片背景色最大值
  contentWidth?: number; // 容器宽度
  contentHeight?: number; // 容器高度
  disturbLine?: number; // 干扰线数量，0为不绘制
  disturbPoint?: number; // 干扰点数量，0为不绘制
  reset?: () => void; // 重置验证码回调
}

const GraphicCaptcha: FC<GraphicCaptchaProps> = ({
  onRef,
  fontSizeMin = 25,
  fontSizeMax = 35,
  backgroundColorMin = 200,
  backgroundColorMax = 229,
  contentWidth = 116,
  contentHeight = 38,
  disturbLine = 4,
  disturbPoint = 30,
  reset,
}) => {
  const [identifyCode, setIdentifyCode] = useState(''); // 图形验证码的值

  // 重置验证码
  const resetIdentifyCode = () => setIdentifyCode(join(
    times(4, () => codeChars[random(0, codeChars.length)]),
    '',
  ));

  /** @description: 绘制文字 */
  const drawText = (ctx: CanvasRenderingContext2D, txt: string, i: number) => {
    ctx.fillStyle = randomColor(); // 随机生成字体颜色
    ctx.font = `${random(fontSizeMin, fontSizeMax)}px SimHei`; // 随机生成字体大小
    const x = (i + 1) * (contentWidth / (identifyCode.length + 1));
    const y = random(fontSizeMax, contentHeight - 5);
    const deg = random(-30, 30);
    // 修改坐标原点和旋转角度
    ctx.translate(x, y);
    ctx.rotate((deg * Math.PI) / 180);
    ctx.fillText(txt, 0, 0);
    // 恢复坐标原点和旋转角度
    ctx.rotate((-deg * Math.PI) / 180);
    ctx.translate(-x, -y);
  };

  /** @description: 绘制干扰线 */
  const drawLine = (ctx: CanvasRenderingContext2D) => {
    // 绘制干扰线
    for (let i = 0; i < disturbLine; i += 1) {
      ctx.strokeStyle = randomColor(100, 200);
      ctx.beginPath();
      ctx.moveTo(random(0, contentWidth), random(0, contentHeight));
      ctx.lineTo(random(0, contentWidth), random(0, contentHeight));
      ctx.stroke();
    }
  };

  /** @description: 绘制干扰点 */
  const drawDot = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < disturbPoint; i += 1) {
      ctx.fillStyle = randomColor();
      ctx.beginPath();
      ctx.arc(random(0, contentWidth), random(0, contentHeight), 1, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  /** @description: 绘制画布 */
  const drawCanvas = () => {
    const canvas = document.getElementById('graphic-captcha') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.textBaseline = 'bottom';
    // 绘制背景
    ctx.fillStyle = randomColor(backgroundColorMin, backgroundColorMax);
    ctx.fillRect(0, 0, contentWidth, contentHeight);
    // 绘制文字
    for (let i = 0; i < identifyCode.length; i += 1) {
      drawText(ctx, identifyCode[i], i);
    }
    drawLine(ctx);
    drawDot(ctx);
    reset?.();
  };

  useMount(() => {
    resetIdentifyCode()
  })

  useEffect(() => {
    drawCanvas();
  }, [identifyCode])

  // 用useImperativeHandle暴露一些外部ref能访问的属性
  useImperativeHandle(onRef, () => ({ identifyCode }))
  return (
    <canvas
      id="graphic-captcha"
      width={contentWidth}
      height={contentHeight}
      onClick={resetIdentifyCode}
      style={{ cursor: 'pointer' }}
    />
  )
}
export default GraphicCaptcha;