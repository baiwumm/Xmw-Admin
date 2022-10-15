/*
 * @Description: 数据库配置
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-15 20:04:23
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-15 20:22:12
 */
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DATABASE_HOST, // 这部分会和从env中进行合并
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PWD,
  database: process.env.DATABASE_LIB,
  entities: [__dirname + '../**/*.entity{.ts,.js}'], // 扫描本项目中.entity.ts或者.entity.js的文件
  logging: true,
  synchronize: true,
  retryDelay: 500, //重试连接数据库间隔
  retryAttempts: 10, //重试连接数据库的次数
  autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
}));
