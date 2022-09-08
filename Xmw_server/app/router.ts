import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/system/getUserList', controller.system.userManagement.getUserList);
};
