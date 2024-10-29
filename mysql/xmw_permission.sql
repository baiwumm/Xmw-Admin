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

 Date: 29/10/2024 09:30:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for xmw_permission
-- ----------------------------
DROP TABLE IF EXISTS `xmw_permission`;
CREATE TABLE `xmw_permission`  (
  `permission_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '权限id',
  `role_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '角色id',
  `menu_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '菜单id',
  `created_time` datetime NOT NULL,
  `updated_time` datetime NOT NULL,
  PRIMARY KEY (`permission_id`) USING BTREE,
  INDEX `role_id`(`role_id` ASC) USING BTREE,
  CONSTRAINT `xmw_permission_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `xmw_role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xmw_permission
-- ----------------------------
INSERT INTO `xmw_permission` VALUES ('01b92a5b-8a7a-415d-9abe-56ee363aca9b', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', '062fada5-41b0-4a90-8632-49ef932ed354', '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_permission` VALUES ('03838371-7d74-473f-9259-fb7cb585fae1', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', '5bb63c89-e82a-4431-b80b-5c4e332a312e', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('072a34c1-d6ce-451d-959c-d4e30d466555', '31938054-db3e-434f-a98e-7edc89c9c42f', '12373f1b-ae2a-48e7-ac06-ad4f15bb4975', '2023-09-12 13:56:58', '2023-09-12 13:56:58');
INSERT INTO `xmw_permission` VALUES ('0d71fe40-0434-4891-8d37-f9686300ee78', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '746f442f-8a13-4022-a2dc-741c716e8485', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('10a5e909-a83b-4d95-af86-ecd10eddd5fe', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', 'dd8304e6-09e5-4fa8-8e56-bbefd4e69c0c', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('13c52f7c-358c-40f8-9d6c-c5cdead4e1d6', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'a5ab3924-f60a-4b20-8ff4-fb6333e1100a', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('13f1ff0b-090b-40c7-a2bd-a54e5f00abba', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', 'adbc5cd2-b238-45b5-91a5-48324e8ae96b', '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_permission` VALUES ('189a0426-837b-4b22-9523-682594912355', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'b074dbaa-03d5-4897-8d05-99f72969efd7', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('2263893e-67e5-4619-a24b-91f3a1c25aaa', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '4e70171f-a946-47e8-a471-d8cabd04c264', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('22e0c252-a36e-4bd2-9805-f5d1d880c7fc', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', '7d221117-ec0b-407c-b0e3-af6372ac46cc', '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_permission` VALUES ('249d1d24-a192-4ecf-b621-6e926501987b', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'bf2dc72c-c524-4be3-a1cf-1da2bd853444', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('29ef1734-cef8-4933-bfce-f24dca2c78cc', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'dd8304e6-09e5-4fa8-8e56-bbefd4e69c0c', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('2b7dfd95-571c-4c07-a4bb-934fa03b388c', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '5bb63c89-e82a-4431-b80b-5c4e332a312e', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('2d582e2f-7362-448a-a9af-08a2fe827936', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '235a3648-bc49-4400-8403-f752a1bdcb02', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('3a734294-62d9-4f44-a6cd-d2ba13f8edbc', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '12373f1b-ae2a-48e7-ac06-ad4f15bb4975', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('3ac94d4a-8424-47c6-807a-57e3cd66026a', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '062fada5-41b0-4a90-8632-49ef932ed354', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('3b823f69-4793-4df6-89a1-90d001175574', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'd518e1bd-7440-4e15-b509-23353aec3205', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('3c07be64-d856-4200-aff8-364e22ba4b0f', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'e1376489-4693-4b2f-92b7-890d0bf0ff21', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('3e2347cd-89e7-4ce0-9aeb-d0b1bff5e308', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'f9f168a1-a31a-4105-b80d-9c38dcf0bd59', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('3e6553bc-b086-4b16-be9e-206fcc91943a', 'c37e0d9c-536a-4a6f-b5d1-989d3d65240a', '81d6e4a1-68e5-4b4e-bf3b-851a7adc2e03', '2024-10-28 16:32:44', '2024-10-28 16:32:44');
INSERT INTO `xmw_permission` VALUES ('3ea9a526-0e4d-435f-afab-0e6315f52e6d', '31938054-db3e-434f-a98e-7edc89c9c42f', '5bb63c89-e82a-4431-b80b-5c4e332a312e', '2023-09-12 13:56:58', '2023-09-12 13:56:58');
INSERT INTO `xmw_permission` VALUES ('4453230b-a526-47d1-ab28-583c03007582', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', 'e6edc216-38b7-49cd-b097-6e996a7d8316', '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_permission` VALUES ('45609f98-b2c2-4e67-a52c-dfb5145b35df', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'd6cdf288-0d59-4da8-a270-a5a49006154b', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('474d78fe-8692-4b76-baa9-b36d98620ff3', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', '00d37222-d6b6-43ab-a459-b15610fdcbf3', '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_permission` VALUES ('47b869b4-430b-4d96-82dc-73e317fd7eb4', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '98425773-0c6f-45d0-8c6e-093b73e2b870', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('49fad682-cd65-41b6-a9e1-d82a7bf6c07d', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '4f3bd03a-4896-465e-a2a2-ad060dbe8dde', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('4c0c84c7-9808-42d1-a65e-a9aed16a8463', 'c37e0d9c-536a-4a6f-b5d1-989d3d65240a', '2e1d74aa-2356-4b26-8488-7c337ae306cc', '2024-10-28 16:32:44', '2024-10-28 16:32:44');
INSERT INTO `xmw_permission` VALUES ('4c39f7f7-8d48-4326-ad95-2fd7a7b880e1', 'c37e0d9c-536a-4a6f-b5d1-989d3d65240a', '2710e59a-0b37-4ea7-b6aa-73ffe2298391', '2024-10-28 16:32:44', '2024-10-28 16:32:44');
INSERT INTO `xmw_permission` VALUES ('4ddc52da-c080-4dc7-b1d4-2af8388b607f', 'c37e0d9c-536a-4a6f-b5d1-989d3d65240a', '1360556e-3106-48aa-a030-90edfd7073ea', '2024-10-28 16:32:44', '2024-10-28 16:32:44');
INSERT INTO `xmw_permission` VALUES ('54cb0702-a0fe-4bf8-8e6c-c70bc93fcd40', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', 'ce451a62-2ac4-44de-8202-cd8b0a702840', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('59db39d8-56b7-4ea5-83dc-2e01d64ef4f0', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'ebb8abd4-3231-4e5b-a007-0f9103bf66e7', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('5ba22a5b-cf8c-45be-b37a-40afb46cfad1', 'c37e0d9c-536a-4a6f-b5d1-989d3d65240a', 'dd8304e6-09e5-4fa8-8e56-bbefd4e69c0c', '2024-10-28 16:32:44', '2024-10-28 16:32:44');
INSERT INTO `xmw_permission` VALUES ('5e754a18-4b55-4b8d-b743-63d17902a6ad', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'b1945758-403e-4d90-a096-312b2b424ff3', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('614734e6-1674-4018-9cca-d91f3f34ff76', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', '17911862-bce9-4264-b541-7ee1d2c7ec13', '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_permission` VALUES ('63c71d7e-385a-4ece-93dc-70260dba6295', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '38788fd7-fcc2-4d0d-85ec-016bf5a90520', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('643d4f09-5b8f-4380-a9b9-db5b14337ef0', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '255bcf4c-cfbd-4253-9c2d-0b03805e3ff0', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('69e47c46-c4f9-4dd1-966e-7d8f9079c9c8', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '4c499ae2-55a1-4aee-a8ff-dadb3e8e7f83', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('6cf37a1d-7788-4e66-b3ef-2e7875d54102', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', '2e1d74aa-2356-4b26-8488-7c337ae306cc', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('6e389de0-0984-4b9f-96c3-fad004dff4ae', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', '59a27556-69e9-4ecf-879f-fdd943fd190c', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('7208db6a-d208-4d5f-bcf6-70a4a9df5794', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', 'c1a6ef88-72b0-4ddd-8179-85f7f9dc9294', '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_permission` VALUES ('72aafe35-d60f-4a7c-bfea-ad9ee27335f0', 'c37e0d9c-536a-4a6f-b5d1-989d3d65240a', 'b5c00c90-c7dc-4c9a-aa10-85e8c1959f8a', '2024-10-28 16:32:44', '2024-10-28 16:32:44');
INSERT INTO `xmw_permission` VALUES ('7436ec97-3b36-4190-83da-fa79968cb243', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '24f41a30-3134-47f7-ad96-4f93cbd988a2', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('77e01e19-99a6-4e41-aa03-a7b05afc6e91', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '3787908c-3fcc-415f-83a9-a9f3701269ef', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('794bc62c-78e0-480f-8556-1c52531d7a57', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', 'b1945758-403e-4d90-a096-312b2b424ff3', '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_permission` VALUES ('7b205faf-f8e9-4c3d-bf65-f4227c8648bb', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'ce451a62-2ac4-44de-8202-cd8b0a702840', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('7b9ee4db-1e12-4afd-91fc-efe8129f5b51', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '51aed341-5686-4d5d-a7e5-5495348d9213', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('7bdbd3a4-623d-4ed2-ab77-cc75fca97268', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '93de2d1b-334a-459b-ba0f-4efa69d87708', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('7cec91c9-3461-48c3-9b50-0dcb223dab9e', 'c37e0d9c-536a-4a6f-b5d1-989d3d65240a', 'd518e1bd-7440-4e15-b509-23353aec3205', '2024-10-28 16:32:44', '2024-10-28 16:32:44');
INSERT INTO `xmw_permission` VALUES ('7fe5e628-01fc-4076-ab66-595d331e2d54', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'a04bed62-8993-4b6d-88b2-8e63804ac544', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('807e5a90-a1ca-490e-b635-e17c71600f51', 'c37e0d9c-536a-4a6f-b5d1-989d3d65240a', '96c2072e-54bd-4d49-a335-ec8a4b3efa7d', '2024-10-28 16:32:44', '2024-10-28 16:32:44');
INSERT INTO `xmw_permission` VALUES ('81d79669-324d-4ac9-8b10-ecf66f4ba0a6', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', '6628e05a-876b-4fa1-80df-95f8becf5f7a', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('82f719a0-b761-47f6-83b5-d34fbfd42df7', 'c37e0d9c-536a-4a6f-b5d1-989d3d65240a', '6628e05a-876b-4fa1-80df-95f8becf5f7a', '2024-10-28 16:32:44', '2024-10-28 16:32:44');
INSERT INTO `xmw_permission` VALUES ('842871cc-c8e5-40ee-9f6a-6de322daaa77', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '89d96f17-336c-492b-bda2-c5a00069236f', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('89f7f229-2835-4734-ad0b-fdc621ef9c95', 'c37e0d9c-536a-4a6f-b5d1-989d3d65240a', '3787908c-3fcc-415f-83a9-a9f3701269ef', '2024-10-28 16:32:44', '2024-10-28 16:32:44');
INSERT INTO `xmw_permission` VALUES ('8a9ec42f-f900-4521-9b7f-255cda068fc8', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'f1eb0226-8ed7-4f80-ab42-08c27ed3f176', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('8b764589-5fd0-4db9-838b-3e3e85bea565', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', '22b1d1f4-2543-4fa9-8d45-c04d9d239c04', '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_permission` VALUES ('8c7dfb12-ab70-428a-b6ed-0ebdfefff6a3', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', '4e70171f-a946-47e8-a471-d8cabd04c264', '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_permission` VALUES ('8ccf0b6a-8fd3-45f5-bad4-1814e34248ed', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', 'ebb8abd4-3231-4e5b-a007-0f9103bf66e7', '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_permission` VALUES ('8d271ab1-163d-4cfd-8164-3d8146c3c82f', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '00d37222-d6b6-43ab-a459-b15610fdcbf3', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('8d9ece07-3dce-43f3-8926-309f450289e5', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '2e1d74aa-2356-4b26-8488-7c337ae306cc', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('90848bc0-09e5-420a-819a-4e9e4ce2dfef', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '7688d4a8-7214-446e-96d7-b65088af0dbb', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('929ecac0-09be-4fb1-aef5-7b8885dc0cd6', 'c37e0d9c-536a-4a6f-b5d1-989d3d65240a', '981f9c37-8775-458a-983f-23e775eae472', '2024-10-28 16:32:44', '2024-10-28 16:32:44');
INSERT INTO `xmw_permission` VALUES ('9359f68e-9e58-4440-affc-394821cf067e', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '1acff778-5508-4724-b3a6-44b26396fd9e', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('985d6583-0e6c-4f6d-8d72-ac55eaaaaf27', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '22b1d1f4-2543-4fa9-8d45-c04d9d239c04', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('a10f941c-d961-434b-b20a-be2c7bf47aa3', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'b5c00c90-c7dc-4c9a-aa10-85e8c1959f8a', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('a1d77da9-d40b-430e-b552-dac5c4871822', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '562d45f9-e8ca-4ca4-8862-b9a44a3443cd', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('a83cd672-aaca-468b-ac45-435f89342d0d', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', '3787908c-3fcc-415f-83a9-a9f3701269ef', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('aee899ba-d205-4a23-afb3-1d0dad34a5cf', '31938054-db3e-434f-a98e-7edc89c9c42f', '9c140f1c-50eb-48c2-a7b5-58e9bbf16e18', '2023-09-12 13:56:58', '2023-09-12 13:56:58');
INSERT INTO `xmw_permission` VALUES ('b0a04275-2fd2-4803-b995-ea5a9f46eda0', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', 'd518e1bd-7440-4e15-b509-23353aec3205', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('b11d7f17-3a1a-4e8a-94e1-5857bf0c1382', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '17911862-bce9-4264-b541-7ee1d2c7ec13', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('b1216a1f-074a-476e-a5f8-ef626b08028d', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '0de24fb7-dc55-4d75-83f6-9b655734f1e0', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('b21ac8ea-65e8-4742-a309-98c438e297a3', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', '7688d4a8-7214-446e-96d7-b65088af0dbb', '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_permission` VALUES ('b38f65c1-6ea4-4a47-8622-a727d9ba0f4b', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '1360556e-3106-48aa-a030-90edfd7073ea', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('b5607d41-45f1-41c1-8a18-2d967648f84f', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '84baadf6-e32c-4b90-8537-353dc9b25adc', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('b880185f-5a13-49e8-bb8c-ac03a072731a', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'adbc5cd2-b238-45b5-91a5-48324e8ae96b', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('b908d168-2456-462f-9357-5935f35eee8a', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'c1a6ef88-72b0-4ddd-8179-85f7f9dc9294', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('bc6cce47-27b7-4c9b-adf6-6eb54038f0d0', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'e6edc216-38b7-49cd-b097-6e996a7d8316', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('bea2030a-9e8b-409a-b5c2-c41164d0941a', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', '562d45f9-e8ca-4ca4-8862-b9a44a3443cd', '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_permission` VALUES ('bfc4858f-eec7-4797-aeaf-7de7b65c00f7', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', '84baadf6-e32c-4b90-8537-353dc9b25adc', '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_permission` VALUES ('c194d7ed-0a16-44c8-9ab9-1fbaafd14dca', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '59a27556-69e9-4ecf-879f-fdd943fd190c', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('c590b0f7-b08d-476c-bfa5-321d4b69e3f0', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', '12373f1b-ae2a-48e7-ac06-ad4f15bb4975', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('c7684404-289a-4da1-9ee2-daf36cbf5fab', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '2710e59a-0b37-4ea7-b6aa-73ffe2298391', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('c939c74d-fb5e-4196-83b3-802c460f0590', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '8a7a9690-2b7f-4fa1-9cc5-e8b8d41b86d3', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('cdd067b7-6788-44f5-b32e-54af66efc36f', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'f6ccb7eb-20a1-4d6f-bb7a-a38a6f2512dd', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('ce40b05e-4ab6-43b1-b00b-a01fb13dc05c', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '526577a4-4944-4835-9245-ce218a2ef28d', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('ceb22b1f-b85c-4b51-89c9-723238f0451e', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', 'd6cdf288-0d59-4da8-a270-a5a49006154b', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('cf0c9ce7-8c23-4c12-8fe7-bb33fb9a670c', 'c37e0d9c-536a-4a6f-b5d1-989d3d65240a', 'd6cdf288-0d59-4da8-a270-a5a49006154b', '2024-10-28 16:32:44', '2024-10-28 16:32:44');
INSERT INTO `xmw_permission` VALUES ('d002fa92-d156-411d-8446-912f86719589', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'b1ebea57-41ce-4487-a4d9-a1f38004a53a', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('d3d4c6c6-eb1b-4f9d-acff-7285e1e140ca', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '7d221117-ec0b-407c-b0e3-af6372ac46cc', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('d3fd86c3-9e44-41ae-bc09-4ec3e52922d2', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', '81d6e4a1-68e5-4b4e-bf3b-851a7adc2e03', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('d41014f4-b706-4eec-bae5-1326584b9340', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', 'f1eb0226-8ed7-4f80-ab42-08c27ed3f176', '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_permission` VALUES ('d81759c8-64fd-4c6a-8295-2226cc9cff22', 'c37e0d9c-536a-4a6f-b5d1-989d3d65240a', '59a27556-69e9-4ecf-879f-fdd943fd190c', '2024-10-28 16:32:44', '2024-10-28 16:32:44');
INSERT INTO `xmw_permission` VALUES ('dd46ecca-5449-41f9-86f5-af7e74427b80', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '96c2072e-54bd-4d49-a335-ec8a4b3efa7d', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('df5d9cb4-17c5-4f20-b4d2-152ddead2f95', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', '981f9c37-8775-458a-983f-23e775eae472', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('e1e818f3-8048-4b8f-b66a-4fcbf21b55fc', 'c37e0d9c-536a-4a6f-b5d1-989d3d65240a', 'bf2dc72c-c524-4be3-a1cf-1da2bd853444', '2024-10-28 16:32:44', '2024-10-28 16:32:44');
INSERT INTO `xmw_permission` VALUES ('e689375b-0d92-4b62-8599-ddcc0152a659', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', '38788fd7-fcc2-4d0d-85ec-016bf5a90520', '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_permission` VALUES ('e689b26d-4ab2-4c2f-869a-00ff9b00bc73', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'b6b55595-9929-4036-bcd3-b6016a642f25', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('e91c6cdd-6b61-4e93-b9cb-71de25eaef3a', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '81abb19d-51f6-4256-a3d3-ed13a8cbd259', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('eaed62d8-806d-446a-ad02-eae6bc005e1c', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', 'b6b55595-9929-4036-bcd3-b6016a642f25', '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_permission` VALUES ('eaf98ba1-d98c-4c9b-8d1d-8c472d3f3427', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '1cc8e15c-e60b-410c-bb0f-846c01611416', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('eb25c7a7-16a1-4693-965f-da4d63b98ad7', 'c37e0d9c-536a-4a6f-b5d1-989d3d65240a', 'ce451a62-2ac4-44de-8202-cd8b0a702840', '2024-10-28 16:32:44', '2024-10-28 16:32:44');
INSERT INTO `xmw_permission` VALUES ('ee84a29a-4daf-44ff-b335-718c5a245a43', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '6628e05a-876b-4fa1-80df-95f8becf5f7a', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('ef5a9d1c-f271-4cc6-bfc2-df9956f5620b', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '81d6e4a1-68e5-4b4e-bf3b-851a7adc2e03', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('f002b367-2da7-4a6a-8589-e9853e99ab35', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '9c140f1c-50eb-48c2-a7b5-58e9bbf16e18', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('faa32c58-4b85-4a09-9516-d5c51e918c28', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '81c3b5d3-6715-49d2-a7b1-b4e3ba6b3732', '2024-10-28 17:03:39', '2024-10-28 17:03:39');
INSERT INTO `xmw_permission` VALUES ('fe4bfce0-7402-44a7-a6af-75859ba59372', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', '1360556e-3106-48aa-a030-90edfd7073ea', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('ff580a09-5501-46eb-891d-9d2b15d6a572', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', '1acff778-5508-4724-b3a6-44b26396fd9e', '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_permission` VALUES ('ff67e171-b370-4511-8b41-70958c6c5afe', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', 'f9f168a1-a31a-4105-b80d-9c38dcf0bd59', '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_permission` VALUES ('ffe6ee03-f37d-4779-80d2-8969b12f889f', '309c8d5a-b802-48bf-a15f-e5ba3e2c1e30', '81c3b5d3-6715-49d2-a7b1-b4e3ba6b3732', '2023-09-12 13:56:10', '2023-09-12 13:56:10');
INSERT INTO `xmw_permission` VALUES ('fff49631-e69c-4779-afdf-49e704f41bea', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '981f9c37-8775-458a-983f-23e775eae472', '2024-10-28 17:03:39', '2024-10-28 17:03:39');

SET FOREIGN_KEY_CHECKS = 1;
