/*
 Navicat Premium Dump SQL

 Source Server         : 腾讯云 - Mysql
 Source Server Type    : MySQL
 Source Server Version : 80200 (8.2.0)
 Source Host           : 43.139.247.208:3306
 Source Schema         : xmw_admin

 Target Server Type    : MySQL
 Target Server Version : 80200 (8.2.0)
 File Encoding         : 65001

 Date: 29/10/2024 09:30:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for xmw_user
-- ----------------------------
DROP TABLE IF EXISTS `xmw_user`;
CREATE TABLE `xmw_user`  (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '用户id',
  `user_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名称',
  `work_no` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户工号',
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码(加密)',
  `cn_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '中文名',
  `en_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '英文名',
  `age` int NOT NULL COMMENT '年龄',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '电子邮箱',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '电话号码',
  `avatar_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户头像',
  `sex` enum('0','1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户性别(0:女,1:男,2:隐私)',
  `sort` int NOT NULL COMMENT '排序',
  `status` int NOT NULL DEFAULT 1 COMMENT '用户状态（0:禁用，1：正常）',
  `token` blob NULL COMMENT 'token',
  `motto` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '座右铭',
  `tags` json NULL COMMENT '人物标签',
  `city` json NULL COMMENT '所属城市',
  `address` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '详细地址',
  `jobs_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '岗位id',
  `org_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '组织id',
  `role_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '角色id',
  `founder` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '创建人',
  `login_num` int NOT NULL DEFAULT 0 COMMENT '登录次数',
  `login_last_ip` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '最后一次登录ip',
  `login_last_time` datetime NULL DEFAULT NULL COMMENT '最后一次登录时间',
  `created_time` datetime NOT NULL,
  `updated_time` datetime NOT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  INDEX `founder`(`founder` ASC) USING BTREE,
  INDEX `role_id`(`role_id` ASC) USING BTREE,
  CONSTRAINT `xmw_user_ibfk_8` FOREIGN KEY (`founder`) REFERENCES `xmw_user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `xmw_user_ibfk_9` FOREIGN KEY (`role_id`) REFERENCES `xmw_role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xmw_user
-- ----------------------------
INSERT INTO `xmw_user` VALUES ('0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 'meixi', 'MX001', 'IqDDrMKzGqHgIOW7ya8cMQ==', '梅西', 'MX', 35, NULL, '18888888887', 'https://react.baiwumm.com/static/image/2022-11-29/1155a249-437a-47b3-bec8-abea2a1c01c3.jpeg', '2', 1, 1, '', NULL, '[\"足球巨星\"]', '[\"44\", \"4403\", \"440304\"]', '111', 'eab6c26a-4b2a-4aba-b95f-7f431600a03d', '7115340c-ff89-44d1-853d-90673055a24c', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 36, '::ffff:127.0.0.1', '2023-01-12 18:21:09', '2022-11-25 11:01:52', '2023-01-12 18:22:07');
INSERT INTO `xmw_user` VALUES ('603fcbfb-f2c6-4e60-9c62-6f0d6a233fa8', 'mahuateng', '10001', 'IqDDrMKzGqHgIOW7ya8cMQ==', '马化腾', 'Pony', 53, NULL, '19999999998', 'https://react.baiwumm.com/static/image/2023-09-12/6d68dbbd-ca12-4e6f-82a4-c9d4b2218343.jpeg', '1', 1, 1, NULL, '会员需要充钱', '[\"腾讯创始人\"]', '[\"44\", \"4403\", \"440305\"]', '腾讯滨海大厦', '4b90999b-2158-423a-8de5-1bf5b4e54ac7', '9e0d462d-5254-41ba-b8f3-982a7cf588f0', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 0, NULL, NULL, '2023-09-12 15:04:43', '2023-09-12 15:04:43');
INSERT INTO `xmw_user` VALUES ('7887f679-32f0-47e2-8137-9d966281aa48', 'wangsicong', '003', 'IqDDrMKzGqHgIOW7ya8cMQ==', '小王', NULL, 36, NULL, '19999999996', 'https://react.baiwumm.com/static/image/2023-09-12/69e1f60c-572e-4ae4-a787-7ebec62f2c79.jpeg', '1', 1, 1, 0x65794A68624763694F694A49557A49314E694973496E523563434936496B705856434A392E65794A316332567958323568625755694F694A335957356E63326C6A6232356E4969776964584E6C636C39705A434936496A63344F44646D4E6A63354C544D795A6A41744E44646C4D6930344D544D334C546C6B4F5459324D6A6778595745304F434973496D6C68644349364D5459354E6A59324F544D784E33302E77486676562D6E4A374C394351384B6A562D463064676E586C3461676137444246636B72446B70444A586F, NULL, NULL, '[\"31\", \"3101\", \"310101\"]', '万达', 'bf6f329f-e5f0-471d-abb9-7e8a019a78a1', '79581210-60b7-4c66-b6ae-14b013c3661e', 'c37e0d9c-536a-4a6f-b5d1-989d3d65240a', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 7, '::ffff:127.0.0.1', '2023-10-07 17:01:57', '2023-09-12 15:14:31', '2023-10-07 17:01:57');
INSERT INTO `xmw_user` VALUES ('a7e1d550-c351-4d19-8873-268912f73584', 'lizhien', 'LZE001', '+eUwGEfC9+bY+NgU22Ol4g==', '李知恩', 'IU', 18, NULL, '18888888888', 'https://react.baiwumm.com/static/image/2023-03-20/c7650a50-8fff-45c6-ae61-47d81395b16a.jpeg', '0', 1, 1, '', '韩国女歌手', '[\"可爱\", \"漂亮\"]', '[\"13\", \"1303\", \"130304\"]', '珠穆朗玛峰', '236ac4ed-6b07-4172-bb05-9986cf976045', '79a4a0d6-776a-4d82-a884-57c2b59e7e94', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 2, '::ffff:127.0.0.1', '2023-10-07 10:38:38', '2022-11-25 10:59:35', '2023-10-07 10:38:49');
INSERT INTO `xmw_user` VALUES ('af968b95-5f2e-4f87-8002-e6ac23b72a23', 'youyuxi', '002', 'IqDDrMKzGqHgIOW7ya8cMQ==', '尤雨溪', 'Evan You', 30, NULL, '19999999997', 'https://react.baiwumm.com/static/image/2023-09-12/0d23830c-df17-47f8-9a34-6e641adc89f3.jpeg', '1', 1, 1, '', NULL, '[\"Vue\", \"Vite\"]', '[\"12\", \"1201\", \"120101\"]', 'Vue大厦', 'c8d1ad72-aba5-48f8-bc8b-7a7ddf5fc2a8', '416d7277-5d55-4778-a535-57a67b290c16', 'c37e0d9c-536a-4a6f-b5d1-989d3d65240a', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '::ffff:127.0.0.1', '2023-09-12 15:16:24', '2023-09-12 15:12:17', '2023-09-12 15:19:30');
INSERT INTO `xmw_user` VALUES ('bf75a509-f90e-4a29-8bf7-470b581550f6', 'admin', 'XMW001', 'IqDDrMKzGqHgIOW7ya8cMQ==', '谢明伟', 'Baiwu', 18, 'baiwumm@foxmail.com', '15920157932', 'https://react.baiwumm.com/static/image/2023-09-12/abf837e0-d149-48f0-8d0a-c078d74adfff.jpg', '1', 99, 1, 0x65794A68624763694F694A49557A49314E694973496E523563434936496B705856434A392E65794A316332567958323568625755694F694A685A47317062694973496E567A5A584A66615751694F694A695A6A6331595455774F53316D4F54426C4C5452684D6A6B744F474A6D4E7930304E7A42694E5467784E5455775A6A59694C434A70595851694F6A45334D7A41784E6A51304E7A4A392E42534F435869333547634C5553534C317A6B644F7146446C6165784F546A745932576338522D496C786649, '我曾踏足山巅 也曾跌落低谷 二者都使我受益良多', '[\"高富帅\", \"有钱人\", \"阳光少年\", \"真的很棒\", \"哈哈哈\", \"今年发财\"]', '[\"44\", \"4403\", \"440304\"]', '沙头街道', '6c93e5f3-f4e9-43be-9b00-9ba69677a2c2', '79581210-60b7-4c66-b6ae-14b013c3661e', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 587, '113.78.43.87', '2024-10-29 09:14:32', '2022-11-30 09:42:15', '2024-10-29 09:14:32');
INSERT INTO `xmw_user` VALUES ('dac1e100-a6ad-48c4-9963-b3be37c6443c', 'mayun', '001', 'IqDDrMKzGqHgIOW7ya8cMQ==', '马云', 'Jack Ma', 60, NULL, '19999999999', 'https://react.baiwumm.com/static/image/2023-09-12/a929863a-9bcd-4ce0-a378-c7744174cda7.jpeg', '1', 1, 1, 0x65794A68624763694F694A49557A49314E694973496E523563434936496B705856434A392E65794A316332567958323568625755694F694A7459586C3162694973496E567A5A584A66615751694F694A6B59574D785A5445774D4331684E6D466B4C545134597A51744F546B324D7931694D324A6C4D7A646A4E6A51304D324D694C434A70595851694F6A45324F5463314D6A49304E4468392E614565594479334648626D546970777852546B747935797262462D4D6A2D69354670474F755F5F50336649, '让天下没有难做的生意', '[\"创始人\"]', '[\"33\", \"3301\", \"330110\"]', '阿里巴巴园区', '4b90999b-2158-423a-8de5-1bf5b4e54ac7', '79581210-60b7-4c66-b6ae-14b013c3661e', 'c37e0d9c-536a-4a6f-b5d1-989d3d65240a', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 18, '::ffff:127.0.0.1', '2023-10-17 14:00:48', '2023-09-12 14:08:11', '2023-10-17 14:00:48');

SET FOREIGN_KEY_CHECKS = 1;
