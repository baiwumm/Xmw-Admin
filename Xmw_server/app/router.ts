/*
 * @Description: 全局路由配置
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 16:07:35
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-18 12:03:08
 */
import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/system/getUserList', controller.system.userManagement.getUserList); // 获取用户管理列表
  // 智能行政-组织管理
  router.get('/administrative/getOrganizationList', controller.administrative.organization.getOrganizationList); // 获取组织管理列表
  router.post('/administrative/saveOrganization', controller.administrative.organization.saveOrganization); // 更新组织管理列表
  router.post('/administrative/delOrganization', controller.administrative.organization.delOrganization); // 删除组织管理列表
  // 系统设置-国际化
  router.get('/system/getInternationalList', controller.system.internationalization.getInternationalList); // 获取国际化列表
  router.get('/system/getAllLocalesLang', controller.system.internationalization.getAllLocalesLang); // 获取国际化多语言层级对象
  router.post('/system/saveInternational', controller.system.internationalization.saveInternational); // 保存国际化数据
  router.post('/system/delInternational', controller.system.internationalization.delInternational); // 删除国际化列表
};
