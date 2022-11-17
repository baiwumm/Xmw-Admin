import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { join } from 'path';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

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
          destination: join(__dirname, '../../../', '/upload'),
          filename: (req, file, cb) => {
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
