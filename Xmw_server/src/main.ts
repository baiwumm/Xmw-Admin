/*
 * @Description: 应用程序的入口文件，它使用核心函数 NestFactory 来创建 Nest 应用程序的实例。
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-12 17:06:37
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-15 12:29:44
 */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpReqTransformInterceptor } from '@/filter/http-req.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局响应拦截器，格式化返回体
  app.useGlobalInterceptors(new HttpReqTransformInterceptor());
  // 开启一个全局验证管道
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
