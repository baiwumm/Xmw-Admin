import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // 引入egg-sequelize包
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  //引入egg-cors包
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  //引入egg-jwt包
  jwt: {
    enable: true,
    package: 'egg-jwt',
  }
};

export default plugin;
