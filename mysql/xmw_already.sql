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

 Date: 29/10/2024 09:29:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for xmw_already
-- ----------------------------
DROP TABLE IF EXISTS `xmw_already`;
CREATE TABLE `xmw_already`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '主键id',
  `announcement_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '活动公告 id',
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '用户 id',
  `created_time` datetime NOT NULL,
  `updated_time` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `announcement_id`(`announcement_id` ASC) USING BTREE,
  CONSTRAINT `xmw_already_ibfk_1` FOREIGN KEY (`announcement_id`) REFERENCES `xmw_announcement` (`announcement_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xmw_already
-- ----------------------------
INSERT INTO `xmw_already` VALUES ('14ce0d12-c9b3-48a2-b32b-0872f8292038', '43c45cab-7449-4a52-9204-b828f067e0f9', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2023-10-12 15:44:04', '2023-10-12 15:44:04');
INSERT INTO `xmw_already` VALUES ('46adde20-078c-49d1-926e-c7862237df87', '91f0d138-651a-44d1-bf8d-9200bb8429cd', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2023-10-23 14:23:23', '2023-10-23 14:23:23');
INSERT INTO `xmw_already` VALUES ('4d470a37-268c-42f9-8243-51c4e4733b78', '91f0d138-651a-44d1-bf8d-9200bb8429cd', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2023-10-12 15:44:31', '2023-10-12 15:44:31');
INSERT INTO `xmw_already` VALUES ('c7a74b96-b657-4bde-afde-4131b3ee4a21', '43c45cab-7449-4a52-9204-b828f067e0f9', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2023-10-12 15:44:08', '2023-10-12 15:44:08');
INSERT INTO `xmw_already` VALUES ('eac5a4ee-6e1d-43f9-91db-b6f99a331bdc', 'd13745ca-368f-4c04-9047-4641032a2294', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2024-10-24 10:19:23', '2024-10-24 10:19:23');
INSERT INTO `xmw_already` VALUES ('fc510457-07fa-4a42-b777-5a1924b2d67e', '91f0d138-651a-44d1-bf8d-9200bb8429cd', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2023-10-12 15:43:55', '2023-10-12 15:43:55');

SET FOREIGN_KEY_CHECKS = 1;
