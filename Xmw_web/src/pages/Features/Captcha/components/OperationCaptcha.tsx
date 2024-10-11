/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-10 17:55:30
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-11 15:24:47
 * @Description: 运算验证码
 */
import { useMount } from 'ahooks';
import { add, multiply, random, subtract } from 'lodash-es'
import { FC, RefObject, useImperativeHandle, useState } from 'react';

import { randomColor } from '@/utils';

export type OperationCaptchaRef = {
  result: number;
}

type OperationCaptchaProps = {
  onRef?: RefObject<OperationCaptchaRef>;
  figure?: number; // 运算验证码的位数,默认是100以内的数字，即两位数。如果是要设置三位数，则设置figure:1000。
  arith?: 0 | 1 | 2 | 3; // 算法选择，支持加、减、乘。设置为1至3分别代表加减乘，0为随机切换。
  width?: number; // 容器宽度
  height?: number; // 容器高度
  disturbLine?: number; // 干扰线数量，0为不绘制
  disturbPoint?: number; // 干扰点数量，0为不绘制
  reset?: () => void; // 重置验证码回调
}

const OperationCaptcha: FC<OperationCaptchaProps> = ({
  onRef,
  figure = 100,
  arith = 0,
  width = 320,
  height = 60,
  disturbLine = 4,
  disturbPoint = 30,
  reset,
}) => {
  const [result, setResult] = useState(0);
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
  const drawDot = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < disturbPoint; i += 1) {
      ctx.fillStyle = randomColor();
      ctx.beginPath();
      ctx.arc(random(0, width), random(0, height), 1, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  // 绘制图形码
  const drawCanvas = () => {
    const canvas = document.getElementById('operation-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.fillStyle = randomColor(180, 240);
    ctx.fillRect(0, 0, width, height);

    // 绘制干扰线
    drawLine(ctx);
    // 绘制干扰点
    drawDot(ctx);

    // 算法验证码
    let num1 = Math.floor(Math.random() * figure);
    let num2 = Math.floor(Math.random() * figure);

    let codeShow = '';
    // 算法运算符
    const tmparith = arith === 0 ? Math.floor(Math.random() * 3) : arith;

    switch (tmparith) {
      case 1:
        setResult(add(num1, num2));
        codeShow = `${num1} + ${num2} = ?`;
        break;
      case 2:
        if (num1 < num2) {
          const tmpnum = num1;
          num1 = num2;
          num2 = tmpnum;
        }
        setResult(subtract(num1, num2));
        codeShow = `${num1} - ${num2} = ?`;
        break;
      default:
        setResult(multiply(num1, num2));
        codeShow = `${num1} × ${num2} = ?`;
        break;
    }

    for (let i = 0; i < codeShow.length; i += 1) {
      // 随机生成字体颜色
      ctx.fillStyle = randomColor(50, 160);
      // 随机生成字体大小(0.5 - 0.75)高的范围
      ctx.font = `${random((height * 2) / 4, (height * 3) / 4)}px SimHei`;
      // 字体对齐位置
      ctx.textBaseline = 'top';
      const x = i * ((width - 10) / codeShow.length);
      const y = random(5, height / 4);
      ctx.fillText(codeShow[i], x + 5, y);
    }

    reset?.();
  };

  useMount(() => {
    drawCanvas();
  });

  // 用useImperativeHandle暴露一些外部ref能访问的属性
  useImperativeHandle(onRef, () => ({ result }))
  return (
    <canvas id="operation-canvas" width={width} height={height} onClick={drawCanvas} style={{ cursor: 'pointer' }} />
  )
}
export default OperationCaptcha;