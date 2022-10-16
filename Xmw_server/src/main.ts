/*
 * @Description: 应用程序的入口文件，它使用核心函数 NestFactory 来创建 Nest 应用程序的实例。
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-12 17:06:37
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-16 22:49:15
 */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // swagger 接口文档
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filter/any-exception.filter'; // http 异常过滤器
import { HttpExceptionFilter } from './filter/http-exception.filter'; // 任意异常捕获
import { HttpReqTransformInterceptor } from '@/interceptor/http-req.interceptor'; // 全局响应拦截器
import { TransformInterceptor } from './interceptor/transform.interceptor'; // 全局拦截器，用来收集日志
import App_configuration from './config/configuration'; // 全局配置
import { logger } from './middleware/logger.middleware'; // 日志收集中间件

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //日志相关
  app.use(logger); // 所有请求都打印日志
  // 错误异常捕获 和 过滤处理
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionFilter()); // 全局统一异常返回体
  // 全局响应拦截器，格式化返回体
  app.useGlobalInterceptors(new HttpReqTransformInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor()); // 全局拦截器，用来收集日志
  // 开启一个全局验证管道
  app.useGlobalPipes(new ValidationPipe());
  // 全局添加接口前缀
  app.setGlobalPrefix(process.env.REQUEST_URL_PREFIX);
  // 构建swagger文档
  const options = new DocumentBuilder()
    .setTitle('react_umi_xmw 接口文档')
    .addBearerAuth()
    .setDescription('一个完善的HttpNodejs服务')
    .setVersion('1.0')
    .addTag('Http')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger-doc', app, document);
  await app.listen(App_configuration().port);
}
bootstrap();
