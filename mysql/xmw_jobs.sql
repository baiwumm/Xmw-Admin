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

 Date: 29/10/2024 09:29:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for xmw_jobs
-- ----------------------------
DROP TABLE IF EXISTS `xmw_jobs`;
CREATE TABLE `xmw_jobs`  (
  `jobs_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '岗位id',
  `jobs_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '岗位名称',
  `org_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组织id',
  `parent_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '父级id',
  `describe` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '岗位描述',
  `sort` int NOT NULL COMMENT '排序',
  `leader` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '岗位负责人',
  `founder` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '创建人',
  `created_time` datetime NOT NULL,
  `updated_time` datetime NOT NULL,
  PRIMARY KEY (`jobs_id`) USING BTREE,
  INDEX `org_id`(`org_id` ASC) USING BTREE,
  CONSTRAINT `xmw_jobs_ibfk_1` FOREIGN KEY (`org_id`) REFERENCES `xmw_organization` (`org_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xmw_jobs
-- ----------------------------
INSERT INTO `xmw_jobs` VALUES ('046aeaa4-f707-4981-8a30-6e4a8488eb52', '研发工程师', '79581210-60b7-4c66-b6ae-14b013c3661e', NULL, '研发工程师', 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2022-09-23 15:43:47', '2022-12-01 17:19:24');
INSERT INTO `xmw_jobs` VALUES ('1c5f752a-3482-4849-aff0-a6742c96bead', '运维工程师', '79a4a0d6-776a-4d82-a884-57c2b59e7e94', NULL, '运维工程师', 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2022-11-09 13:56:20', '2022-12-01 17:19:24');
INSERT INTO `xmw_jobs` VALUES ('236ac4ed-6b07-4172-bb05-9986cf976045', '中级设计师', 'bb074cdc-4aa2-42e4-a200-64bf83ed4ed5', 'ab7aabc3-7053-47bf-a6cf-75983c3b108b', '中级', 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2022-09-23 15:42:51', '2022-12-01 17:19:24');
INSERT INTO `xmw_jobs` VALUES ('4b90999b-2158-423a-8de5-1bf5b4e54ac7', '创始人', '79581210-60b7-4c66-b6ae-14b013c3661e', NULL, '阿里巴巴的创始人', 1, 'dac1e100-a6ad-48c4-9963-b3be37c6443c', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2023-09-12 13:59:59', '2023-09-12 15:01:12');
INSERT INTO `xmw_jobs` VALUES ('6c93e5f3-f4e9-43be-9b00-9ba69677a2c2', '前端开发', 'f107862c-30bf-45cb-9957-5b5429e0ff20', '046aeaa4-f707-4981-8a30-6e4a8488eb52', '前端开发', 2, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2022-09-23 15:44:02', '2022-12-01 17:19:24');
INSERT INTO `xmw_jobs` VALUES ('71c3f4a3-ceb1-4644-b2c1-d1f872259cc3', '初级设计师', 'f107862c-30bf-45cb-9957-5b5429e0ff20', 'ab7aabc3-7053-47bf-a6cf-75983c3b108b', '初级', 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2022-09-23 15:42:33', '2022-12-01 17:19:24');
INSERT INTO `xmw_jobs` VALUES ('947ecd59-230f-420e-a4f9-fc561b9a5fa4', '产品经理', '9e0d462d-5254-41ba-b8f3-982a7cf588f0', NULL, '负责提高产品的用户体验', 1, '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2022-12-01 18:11:51', '2023-01-10 17:26:27');
INSERT INTO `xmw_jobs` VALUES ('ab7aabc3-7053-47bf-a6cf-75983c3b108b', 'UI 设计师', '79581210-60b7-4c66-b6ae-14b013c3661e', NULL, '“UI”的本义是用户界面，是英文User和interface的缩写。UI设计师简称UID（User Interface Designer），指从事对软件的人机交互、操作逻辑、界面美观的整体设计工作的人。', 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2022-09-23 15:42:06', '2022-12-01 17:19:24');
INSERT INTO `xmw_jobs` VALUES ('bf6f329f-e5f0-471d-abb9-7e8a019a78a1', '技术总监', '3238736e-6e53-48c1-b2dd-fb0684357266', NULL, '技术总监', 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2023-09-12 13:43:33', '2023-09-12 13:43:33');
INSERT INTO `xmw_jobs` VALUES ('bfc580bd-bd03-46e4-92e6-71c804a1a237', '高级设计师', '79581210-60b7-4c66-b6ae-14b013c3661e', 'ab7aabc3-7053-47bf-a6cf-75983c3b108b', '高级', 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2022-09-23 15:43:32', '2022-12-01 17:19:24');
INSERT INTO `xmw_jobs` VALUES ('c8d1ad72-aba5-48f8-bc8b-7a7ddf5fc2a8', '副总监', '416d7277-5d55-4778-a535-57a67b290c16', 'bf6f329f-e5f0-471d-abb9-7e8a019a78a1', '副总监', 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2023-09-12 13:44:08', '2023-09-12 13:44:08');
INSERT INTO `xmw_jobs` VALUES ('eab6c26a-4b2a-4aba-b95f-7f431600a03d', 'java 开发', 'f107862c-30bf-45cb-9957-5b5429e0ff20', '046aeaa4-f707-4981-8a30-6e4a8488eb52', 'java 开发', 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2022-09-23 15:44:14', '2022-12-01 17:19:24');

SET FOREIGN_KEY_CHECKS = 1;
