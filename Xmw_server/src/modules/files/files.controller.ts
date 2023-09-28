/*
 * @Description: Files Controller
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-11-17 17:49:53
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 15:55:03
 */
import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiTags,
} from '@nestjs/swagger'; // swagger 接口文档
import * as OSS from 'ali-oss'; // oss sdk
import { randomUUID } from 'crypto'; // 随机 uuid
import * as moment from 'moment'; // 时间插件 moment
import { diskStorage } from 'multer';
import { normalize } from 'path';

import App_configuration from '@/config/configuration'; // 全局配置
import { responseMessage } from '@/utils';
import type { Response } from '@/utils/types';

import { UploadFileDto } from './dto';

@ApiTags('文件上传')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('upload')
export class FilesController {
  ossClient: OSS;
  constructor() {
    // 阿里云 bucket配置
    this.ossClient = new OSS(App_configuration().oss);
  }

  /**
   * @description: 上传单个文件
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @Post('single-file')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '单个文件上传',
    type: UploadFileDto,
  })
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Response<Express.Multer.File> {
    file.path = `http://${process.env.APP_HOST}:${process.env.APP_PROT
      }/static${file.path.replace(/\\/g, '/').replace(/upload/g, '')}`;
    return responseMessage(file);
  }

  /**
   * @description: 阿里云 oss 上传
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('single-file-oss')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        filename: (req, file, cb) => {
          const filename = `${randomUUID()}.${file.mimetype.split('/')[1]}`;
          return cb(null, filename);
        },
      }),
    }),
  )
  async oos(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Response<Express.Multer.File>> {
    // 上传的时候我们运行你上传到内存中 然后发送给第三方但是这样做不好，
    // 如果存储文件太多或者并非量 你的机器会撑不住，因此我们建议的做法是先存到某
    // 临时目录，然后调用第三方去upload 最后由定时job删除这个up目录就好了
    // 主要还是文件的上传和下载 上传比较简单
    const result = await this.ossClient.put(
      `/upload/${moment().format('YYYYMMDD')}/${file.filename}`,
      normalize(file.path),
    );
    return responseMessage(result);
  }
}
