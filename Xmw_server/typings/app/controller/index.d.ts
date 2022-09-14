// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportAdministrativeOrganization from '../../../app/controller/administrative/organization';
import ExportSystemUserManagement from '../../../app/controller/system/userManagement';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    administrative: {
      organization: ExportAdministrativeOrganization;
    }
    system: {
      userManagement: ExportSystemUserManagement;
    }
  }
}
