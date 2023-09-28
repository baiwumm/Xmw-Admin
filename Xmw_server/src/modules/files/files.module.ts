/*
 * @Description: Files Module
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-11-17 17:49:35
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 15:54:55
 */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { randomUUID } from 'crypto'; // 随机 uuid
import * as moment from 'moment'; // 时间插件 moment
import { diskStorage } from 'multer';

import { checkDirAndCreate } from '@/utils';

import { FilesController } from './files.controller'; // Files Controller
import { FilesService } from './files.service'; // Files Service

// 定义文件上传格式
const image = ['gif', 'png', 'jpg', 'jpeg', 'bmp', 'webp'];
const video = ['mp4', 'webm'];
const audio = ['mp3', 'wav', 'ogg'];

@Module({
  imports: [
    // 当然了你可以使用 config可以sync的方法去配置它
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        storage: diskStorage({
          // 配置文件上传后的文件夹路径
          destination: (_, file, cb) => {
            // 根据上传的文件类型将图片视频音频和其他类型文件分别存到对应英文文件夹
            const mimeType = file.mimetype.split('/')[1];
            let temp = 'other';
            image.filter((item) => item === mimeType).length > 0
              ? (temp = 'image')
              : '';
            video.filter((item) => item === mimeType).length > 0
              ? (temp = 'video')
              : '';
            audio.filter((item) => item === mimeType).length > 0
              ? (temp = 'audio')
              : '';
            const filePath = `upload/${temp}/${moment().format('YYYY-MM-DD')}`;
            checkDirAndCreate(filePath); // 判断文件夹是否存在，不存在则自动生成
            return cb(null, `./${filePath}`);
          },
          filename: (_, file, cb) => {
            // 使用随机 uuid 生成文件名
            const filename = `${randomUUID()}.${file.mimetype.split('/')[1]}`;
            return cb(null, filename);
          },
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule { }
