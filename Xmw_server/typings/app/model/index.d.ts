// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportXmwInternationalization from '../../../app/model/xmw_internationalization';
import ExportXmwJobs from '../../../app/model/xmw_jobs';
import ExportXmwOrganization from '../../../app/model/xmw_organization';
import ExportXmwUsers from '../../../app/model/xmw_users';

declare module 'egg' {
  interface IModel {
    XmwInternationalization: ReturnType<typeof ExportXmwInternationalization>;
    XmwJobs: ReturnType<typeof ExportXmwJobs>;
    XmwOrganization: ReturnType<typeof ExportXmwOrganization>;
    XmwUsers: ReturnType<typeof ExportXmwUsers>;
  }
}
