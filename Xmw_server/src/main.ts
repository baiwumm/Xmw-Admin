/*
 * @Description: 应用程序的入口文件，它使用核心函数 NestFactory 来创建 Nest 应用程序的实例。
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-12 17:06:37
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-15 20:27:23
 */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpReqTransformInterceptor } from '@/filter/http-req.interceptor'; // 全局响应拦截器
import App_configuration from './config/configuration'; // 全局配置

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局响应拦截器，格式化返回体
  app.useGlobalInterceptors(new HttpReqTransformInterceptor());
  // 开启一个全局验证管道
  app.useGlobalPipes(new ValidationPipe());
  // 全局添加接口前缀
  app.setGlobalPrefix('cyan');
  await app.listen(App_configuration().port);
}
bootstrap();
