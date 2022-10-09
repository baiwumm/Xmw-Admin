// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportUser from '../../../app/controller/user';
import ExportAdministrativeJobsManagement from '../../../app/controller/administrative/jobsManagement';
import ExportAdministrativeOrganization from '../../../app/controller/administrative/organization';
import ExportSystemInternationalization from '../../../app/controller/system/internationalization';
import ExportSystemMenuManagement from '../../../app/controller/system/menuManagement';
import ExportSystemRoleManagement from '../../../app/controller/system/roleManagement';
import ExportSystemUserManagement from '../../../app/controller/system/userManagement';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    user: ExportUser;
    administrative: {
      jobsManagement: ExportAdministrativeJobsManagement;
      organization: ExportAdministrativeOrganization;
    }
    system: {
      internationalization: ExportSystemInternationalization;
      menuManagement: ExportSystemMenuManagement;
      roleManagement: ExportSystemRoleManagement;
      userManagement: ExportSystemUserManagement;
    }
  }
}
