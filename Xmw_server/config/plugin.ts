import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
};
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

export default plugin;
