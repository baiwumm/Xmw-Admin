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

 Date: 29/10/2024 09:30:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for xmw_role
-- ----------------------------
DROP TABLE IF EXISTS `xmw_role`;
CREATE TABLE `xmw_role`  (
  `role_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '角色id',
  `role_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色名称',
  `role_code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色编码',
  `describe` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色描述',
  `founder` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '创建人',
  `sort` int NOT NULL COMMENT '排序',
  `status` int NOT NULL COMMENT '角色状态（0:禁用，1：正常）',
  `created_time` datetime NOT NULL,
  `updated_time` datetime NOT NULL,
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xmw_role
-- ----------------------------
INSERT INTO `xmw_role` VALUES ('309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', '系统设置(业务员)', 'System', '拥有系统设置菜单的权限', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_role` VALUES ('31938054-db3e-434f-a98e-7edc89c9c42f', '指示面板(业务员)', 'Dashborad', '拥有指示面板菜单的权限', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2023-09-12 13:56:58', '2023-09-12 13:56:58');
INSERT INTO `xmw_role` VALUES ('c37e0d9c-536a-4a6f-b5d1-989d3d65240a', '智能行政(业务员)', 'Administrative', '拥有智能行政菜单的权限', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2023-09-12 13:55:06', '2024-10-28 16:32:44');
INSERT INTO `xmw_role` VALUES ('c49aeeca-bc95-444e-a437-a2d36e79def4', '超级管理员', 'Super Admin', '拥有系统全部权限。', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 99, 1, '2022-11-08 10:54:45', '2024-10-28 17:03:39');
INSERT INTO `xmw_role` VALUES ('d1ed7af5-b776-4cb9-a441-4967ad815f4b', '普通管理员', 'Ordinary Admin', '拥有系统部分权限', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 88, 1, '2022-11-08 10:56:38', '2023-09-07 10:18:24');

SET FOREIGN_KEY_CHECKS = 1;
