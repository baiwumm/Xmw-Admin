// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportXmwUsers from '../../../app/model/xmw_users';

declare module 'egg' {
  interface IModel {
    XmwUsers: ReturnType<typeof ExportXmwUsers>;
  }
}
