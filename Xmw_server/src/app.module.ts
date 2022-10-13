/*
 * @Description: 应用程序的根模块(Module)
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-12 17:06:37
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-13 16:57:58
 */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  XmwUsers,
  XmwRole,
  XmwPermission,
  XmwOrganization,
  XmwMenu,
  XmwJobs,
  XmwInternationalization,
} from './models';
import { UserModule } from './logical/user/user.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql', // 数据库类型，sequelize支持  Postgres, MySQL, MariaDB, SQLite 以及 Microsoft SQL Server. 且对数据库版本有要求。可移步官网查看
      host: '127.0.0.1', // 主机ip
      port: 3306, // 数据库端口 mysql默认在3306端口
      username: 'root', // 数据库用户名
      password: '123456', // 数据库密码
      database: 'react_umi_xmw', // 具体数据库
      timezone: '+08:00', // 配置数据库时间为东八区北京时间
      define: {
        timestamps: false, // 不需要sequelize自动添加时间戳
        freezeTableName: true, // 使用原始的表名称，不需要sequelize对表名称做额外处理
      },
      logging: true, // 打印日志
      // 时间格式化
      dialectOptions: {
        dateStrings: true,
        typeCast: true,
      },
      // 我们需要通过将其插入到`forRoot()`方法选项的`models`数组中来让`Sequelize`知道它的存在。
      models: [
        XmwUsers,
        XmwRole,
        XmwPermission,
        XmwOrganization,
        XmwMenu,
        XmwJobs,
        XmwInternationalization,
      ],
    }),
    UserModule,
  ],
})
export class AppModule {}
