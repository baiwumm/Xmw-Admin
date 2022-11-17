import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as OSS from 'ali-oss';
import { diskStorage } from 'multer';
import { join, normalize } from 'path';
import { randomUUID } from 'crypto';

@Controller('files')
export class FilesController {
  oss: OSS;
  constructor(private readonly httpService: HttpService) {
    this.oss = new OSS({
      region: 'oss-cn-beijing', //下面的值需要你自己去获取
      accessKeyId: '',
      accessKeySecret: '',
      bucket: '',
    });
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  uploadFile(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    return {
      file: file.filename,
      path: file.path,
      size: file.size, // 路径请结合前面的main多静态目录来实现
    };
  }

  @UseInterceptors(FilesInterceptor('files'))
  @Post('uploads')
  uploadFiles(
    @Body() body: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return files.map((item) => ({
      name: item.fieldname,
      path: item.path,
      size: item.size,
    }));
  }

  @Post('upload-oss')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '../../../', '/upload-oos'),
        filename: (req, file, cb) => {
          const filename = `${randomUUID()}.${file.mimetype.split('/')[1]}`;
          return cb(null, filename);
        },
      }),
    }),
  )
  async oos(@UploadedFile() file: Express.Multer.File) {
    // 上传的时候我们运行你上传到内存中 然后发送给第三方但是这样做不好，
    // 如果存储文件太多或者并非量 你的机器会撑不住，因此我们建议的做法是先存到某
    // 临时目录，然后调用第三方去upload 最后由定时job删除这个up目录就好了
    // 主要还是文件的上传和下载 上传比较简单
    const value = await this.oss.put(file.filename, normalize(file.path));
    return value;
  }

  // 启用oss 下载需要做临时验证
  @Get('upload-oss/:file')
  async getOSSFile(@Param() params: { file: string }) {
    // 上传的时候我们运行你上传到内存中 然后发送给第三方但是这样做不好，
    // 如果存储文件太多或者并非量 你的机器会撑不住，因此我们建议的做法是先存到某
    // 临时目录，然后调用第三方去upload 最后由定时job删除这个up目录就好了
    // 主要还是文件的上传和下载 上传比较简单
    const value = this.oss.signatureUrl(params.file, {
      expires: 3600,
    });

    return {
      url: value,
    };
  }

  // 开放接口
  @Get('httpUser')
  async getIpAddress() {
    const value = await this.httpService
      .get('https://api.gmit.vip/Api/UserInfo?format=json')
      .toPromise();
    return { ...value.data };
  }
}
