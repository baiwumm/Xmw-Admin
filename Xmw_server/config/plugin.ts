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
  }
};

export default plugin;
