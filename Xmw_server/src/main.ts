/*
 * @Description: 应用程序的入口文件，它使用核心函数 NestFactory 来创建 Nest 应用程序的实例。
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-12 17:06:37
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-17 18:03:12
 */
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // swagger 接口文档
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filter/any-exception.filter'; // http 异常过滤器
import { HttpExceptionFilter } from './filter/http-exception.filter'; // 任意异常捕获
import { HttpReqTransformInterceptor } from '@/interceptor/http-req.interceptor'; // 全局响应拦截器
import { TransformInterceptor } from './interceptor/transform.interceptor'; // 全局拦截器，用来收集日志
import App_configuration from './config/configuration'; // 全局配置
import { logger } from './middleware/logger.middleware'; // 日志收集中间件
import { Logger } from '@/utils/log4js';
import { ResponseModel } from '@/global/interface'; // 返回体结构
import { ValidationPipe } from '@/pipe/validation.pipe'; // 参数校验

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //日志相关
  app.use(logger); // 所有请求都打印日志
  // 全局参数校验
  app.useGlobalPipes(new ValidationPipe());

  // 错误异常捕获 和 过滤处理
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionFilter()); // 全局统一异常返回体

  // 全局响应拦截器，格式化返回体
  app.useGlobalInterceptors(new HttpReqTransformInterceptor<ResponseModel>());
  app.useGlobalInterceptors(new TransformInterceptor()); // 全局拦截器，用来收集日志

  // 配置文件访问  文件夹为静态目录，以达到可直接访问下面文件的目的
  const rootDir = join(__dirname, '..');
  app.use('/static', express.static(join(rootDir, '/upload')));

  // 全局添加接口前缀
  app.setGlobalPrefix(process.env.REQUEST_URL_PREFIX);

  // 构建swagger文档
  const options = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_UI_TITLE)
    .addBearerAuth()
    .setDescription(process.env.SWAGGER_UI_DESC)
    .setVersion(process.env.SWAGGER_API_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(process.env.SWAGGER_SETUP_PATH, app, document);
  await app.listen(App_configuration().port, () => {
    Logger.info(
      `服务已经启动,接口请访问:http://www.localhost:${
        App_configuration().port
      }`,
    );
  });
}
bootstrap();
