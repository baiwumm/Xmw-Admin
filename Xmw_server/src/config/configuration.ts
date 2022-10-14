import { registerAs } from '@nestjs/config';

// 默认会合并 根目录下的.env文件 process.env 不会覆盖
export default registerAs('app_global', () => ({
  port: process.env.APP_PROT,
  upload_prefix: process.env.UPLOAD_URL_PRE,
  upload_url_dir: process.env.UPLOAD_URL_DIR,
}));
