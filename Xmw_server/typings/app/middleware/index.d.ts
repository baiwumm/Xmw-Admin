// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportParams from '../../../app/middleware/params';

declare module 'egg' {
  interface IMiddleware {
    params: typeof ExportParams;
  }
}
