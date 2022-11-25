/*
 * @Description: Files Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-17 17:49:53
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-21 16:54:31
 */
import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseModel } from '@/global/interface'; // TS类型注解
import * as OSS from 'ali-oss'; // oss sdk
import { normalize } from 'path';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto'; // 随机 uuid
import * as moment from 'moment'; // 时间插件 moment
import App_configuration from '@/config/configuration'; // 全局配置

@Controller('upload')
export class FilesController {
  ossClient: OSS;
  constructor(private readonly httpService: HttpService) {
    // 阿里云 bucket配置
    this.ossClient = new OSS(App_configuration().oss);
  }

  /**
   * @description: 上传单个文件
   * @return {*}
   * @author: Cyan
   */
  @UseInterceptors(FileInterceptor('file'))
  @Post('single-file')
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): ResponseModel<Express.Multer.File> {
    return { data: file };
  }

  /**
   * @description: 阿里云 oss 上传
   * @return {*}
   * @author: Cyan
   */
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
  ): Promise<ResponseModel<Express.Multer.File>> {
    // 上传的时候我们运行你上传到内存中 然后发送给第三方但是这样做不好，
    // 如果存储文件太多或者并非量 你的机器会撑不住，因此我们建议的做法是先存到某
    // 临时目录，然后调用第三方去upload 最后由定时job删除这个up目录就好了
    // 主要还是文件的上传和下载 上传比较简单
    const result = await this.ossClient.put(
      `/upload/${moment().format('YYYYMMDD')}/${file.filename}`,
      normalize(file.path),
    );
    return { data: result };
  }
}