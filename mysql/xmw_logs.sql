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

 Date: 29/10/2024 09:29:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for xmw_logs
-- ----------------------------
DROP TABLE IF EXISTS `xmw_logs`;
CREATE TABLE `xmw_logs`  (
  `log_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '日志id',
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '用户id',
  `ip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'ip',
  `os` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '操作系统',
  `params` json NOT NULL COMMENT '请求参数',
  `method` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '请求方式',
  `api_url` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '请求地址',
  `created_time` datetime NOT NULL,
  `updated_time` datetime NOT NULL,
  `browser` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '浏览器',
  `province` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '所在省份',
  `city` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '所在城市',
  `adcode` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '城市编码',
  PRIMARY KEY (`log_id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `xmw_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `xmw_user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xmw_logs
-- ----------------------------
INSERT INTO `xmw_logs` VALUES ('41ee07fd-c79b-4554-b30f-fcebf5caefc9', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '113.78.43.87', 'Windows 10', '{\"type\": \"account\", \"password\": \"IqDDrMKzGqHgIOW7ya8cMQ==\", \"user_name\": \"admin\", \"verifyCode\": \"7\"}', 'POST', '/auth/login', '2024-10-29 09:14:32', '2024-10-29 09:14:32', 'Chrome', '广东省', '东莞市', '441900');
INSERT INTO `xmw_logs` VALUES ('5cb66689-2808-41ee-b2c2-3cc849dfa15b', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '14.154.234.29', 'Windows 10', '{\"type\": \"account\", \"password\": \"IqDDrMKzGqHgIOW7ya8cMQ==\", \"user_name\": \"admin\", \"verifyCode\": \"8\"}', 'POST', '/auth/login', '2024-10-28 19:04:15', '2024-10-28 19:04:15', 'Edge', '广东省', '深圳市', '440300');
INSERT INTO `xmw_logs` VALUES ('6160ad6d-bc77-418d-a210-52eaf1c7ae8f', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '14.154.234.29', 'Windows 10', '{\"type\": \"account\", \"password\": \"IqDDrMKzGqHgIOW7ya8cMQ==\", \"user_name\": \"admin\", \"verifyCode\": \"8\"}', 'POST', '/auth/login', '2024-10-28 19:07:03', '2024-10-28 19:07:03', 'Edge', '广东省', '深圳市', '440300');
INSERT INTO `xmw_logs` VALUES ('72873219-5e5c-4941-9e99-86a5cfcfb7e0', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '113.78.43.87', 'Windows 10', '{\"type\": \"account\", \"password\": \"IqDDrMKzGqHgIOW7ya8cMQ==\", \"user_name\": \"admin\", \"verifyCode\": \"8\"}', 'POST', '/auth/login', '2024-10-29 09:13:40', '2024-10-29 09:13:40', 'Chrome', '广东省', '东莞市', '441900');
INSERT INTO `xmw_logs` VALUES ('c3e64e8c-907a-42be-bd7a-ff6aa4eff7e3', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '14.154.234.29', 'Windows 10', '{\"type\": \"account\", \"password\": \"IqDDrMKzGqHgIOW7ya8cMQ==\", \"user_name\": \"admin\", \"verifyCode\": \"7\"}', 'POST', '/auth/login', '2024-10-28 19:03:19', '2024-10-28 19:03:19', 'Edge', '广东省', '深圳市', '440300');
INSERT INTO `xmw_logs` VALUES ('ca7ff85b-5bba-4688-bc40-29457ec14a7d', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '113.78.43.87', 'Windows 10', '{\"type\": \"account\", \"password\": \"IqDDrMKzGqHgIOW7ya8cMQ==\", \"user_name\": \"admin\", \"verifyCode\": \"12\"}', 'POST', '/auth/login', '2024-10-29 08:46:18', '2024-10-29 08:46:18', 'Chrome', '广东省', '东莞市', '441900');

SET FOREIGN_KEY_CHECKS = 1;
