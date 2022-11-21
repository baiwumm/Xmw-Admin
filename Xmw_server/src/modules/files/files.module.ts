/*
 * @Description: Files Module
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-17 17:49:35
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-21 16:35:26
 */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { randomUUID } from 'crypto'; // 随机 uuid
import { diskStorage } from 'multer';
import { join } from 'path';
import { FilesController } from './files.controller'; // Files Controller
import { FilesService } from './files.service'; // Files Service
import * as moment from 'moment';

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
          // 默认文件夹 upload/YYYYMMDD
          destination: join(
            __dirname,
            '../../../',
            `/upload/${moment().format('YYYYMMDD')}`,
          ),
          filename: (req, file, cb) => {
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
export class FilesModule {}
