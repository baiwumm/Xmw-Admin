/*
 * @Description: 应用程序的入口文件，它使用核心函数 NestFactory 来创建 Nest 应用程序的实例。
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-12 17:06:37
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-14 11:21:23
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpReqTransformInterceptor } from '@/filter/http-req.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局响应拦截器，格式化返回体
  app.useGlobalInterceptors(new HttpReqTransformInterceptor<any>());
  await app.listen(3000);
}
bootstrap();
