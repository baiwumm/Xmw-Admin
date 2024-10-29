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

 Date: 29/10/2024 09:29:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for xmw_organization
-- ----------------------------
DROP TABLE IF EXISTS `xmw_organization`;
CREATE TABLE `xmw_organization`  (
  `org_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组织id',
  `org_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组织名称',
  `parent_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '父级id',
  `org_code` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组织编码',
  `org_type` enum('group','company','unit','department') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组织类型（group:集团,company:公司,unit:单位,department:部门）',
  `org_logo` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '组织logo',
  `leader` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '组织负责人',
  `founder` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '创建人',
  `status` int NOT NULL DEFAULT 1 COMMENT '组织状态（0:禁用，1：正常）',
  `sort` int NOT NULL COMMENT '排序',
  `describe` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组织描述',
  `created_time` datetime NOT NULL,
  `updated_time` datetime NOT NULL,
  PRIMARY KEY (`org_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xmw_organization
-- ----------------------------
INSERT INTO `xmw_organization` VALUES ('2c4855da-2e4b-4367-a6c6-f9d8a0bf1b0c', '文心一言', '7115340c-ff89-44d1-853d-90673055a24c', 'Yiyan', 'company', 'https://react.baiwumm.com/static/image/2023-09-12/ae0d2b81-19e8-4903-8a3a-b9bcd1e8cfc6.png', '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '文心一言（英文名：ERNIE Bot）是百度全新一代知识增强大语言模型，文心大模型家族的新成员，能够与人对话互动，回答问题，协助创作，高效便捷地帮助人们获取信息、知识和灵感。文心一言是知识增强的大语言模型，基于飞桨深度学习平台和文心知识增强大模型，持续从海量数据和大规模知识中融合学习具备知识增强、检索增强和对话增强的技术特色', '2023-09-12 13:35:46', '2023-09-12 13:35:46');
INSERT INTO `xmw_organization` VALUES ('3238736e-6e53-48c1-b2dd-fb0684357266', '字节跳动', NULL, 'Bytedance', 'group', 'https://react.baiwumm.com/static/image/2023-09-12/c8a1c7cf-1372-4e9e-9953-b49dcc243d9e.png', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '北京抖音信息服务有限公司，成立于2012年3月9日，2021年全年的营业收入约为580亿美元， [89] 地址位于北京市海淀区北三环西路甲23号院1号楼2层222 [103] 。公司以建设“全球创作与交流平台”为愿景 [1] 。字节跳动的全球化布局始于2015年 [2] ，“技术出海”是字节跳动全球化发展的核心战略 [3] ，其旗下产品有今日头条、西瓜视频、抖音、头条百科、皮皮虾、懂车帝、悟空问答', '2023-09-12 13:37:39', '2023-09-12 13:37:39');
INSERT INTO `xmw_organization` VALUES ('416d7277-5d55-4778-a535-57a67b290c16', '抖音', '3238736e-6e53-48c1-b2dd-fb0684357266', 'TikTok', 'company', 'https://react.baiwumm.com/static/image/2023-09-12/0fda6f98-4b84-4eea-890c-d790c47fe42c.png', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '抖音，是由字节跳动孵化的一款音乐创意短视频社交软件。', '2023-09-12 13:39:25', '2023-09-12 13:39:25');
INSERT INTO `xmw_organization` VALUES ('46bc733f-5b5a-4878-982c-30eafea92c93', '高德地图', '79581210-60b7-4c66-b6ae-14b013c3661e', 'GaoDe', 'company', 'https://react.baiwumm.com/static/image/2023-09-12/fd771d04-2663-4475-a223-92a626b767a1.png', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '高德地图是中国领先的数字地图内容、导航和位置服务解决方案提供商。是国内十大移动应用之一。 [100] 拥有导航电子地图甲级测绘资质和互联网地图服务甲级测绘资质，其优质的电子地图数据库成为公司的核心竞争力。', '2023-09-12 11:26:09', '2023-09-12 11:26:09');
INSERT INTO `xmw_organization` VALUES ('7115340c-ff89-44d1-853d-90673055a24c', '百度控股', NULL, 'Baidu', 'group', 'https://react.baiwumm.com/static/image/2023-08-31/d0455f0b-a8bd-4836-90df-9d3b4fe1061c.png', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '百度（Baidu）是拥有强大互联网基础的领先AI公司。百度愿景是：成为最懂用户，并能帮助人们成长的全球顶级高科技公司。', '2022-12-12 11:11:34', '2023-08-31 16:59:41');
INSERT INTO `xmw_organization` VALUES ('739d9e0c-b570-4bfc-a75b-67c4be1b1af7', '招商银行', NULL, 'CMB', 'group', 'https://react.baiwumm.com/static/image/2023-08-31/2c0bdf2c-5182-41f2-9b31-8dbfc74530f9.png', '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 98, '招商银行（China Merchants Bank）1987年成立于深圳蛇口，2022年总资产10.14万亿元，是中国境内第一家完全由企业法人持股的股份制商业银行，也是国家从体制外推动银行业改革的第一家试点银行', '2022-12-01 18:21:22', '2023-09-19 17:45:05');
INSERT INTO `xmw_organization` VALUES ('79581210-60b7-4c66-b6ae-14b013c3661e', '阿里巴巴', NULL, 'Alibaba', 'company', 'https://react.baiwumm.com/static/image/2023-08-31/1fc6645f-6dd8-4789-8d43-518a15a20b70.png', 'dac1e100-a6ad-48c4-9963-b3be37c6443c', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 88, '阿里巴巴集团控股有限公司（简称：阿里巴巴集团）是马云带领下的18位创始人于1999年在浙江省杭州市创立的公司。', '2022-09-15 15:35:08', '2023-09-12 14:19:12');
INSERT INTO `xmw_organization` VALUES ('79a4a0d6-776a-4d82-a884-57c2b59e7e94', '飞猪', '79581210-60b7-4c66-b6ae-14b013c3661e', 'Feizhu', 'company', 'https://react.baiwumm.com/static/image/2023-08-31/4d52f891-3182-4194-9b61-c982acf31fd5.png', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '全称飞猪旅行，是阿里巴巴集团旗下的综合性旅游服务平台 [2]  [4]  ，旨在让天下没有难做的旅行生意 [3]  。飞猪旅行平台上提供国内外交通、酒店住宿、景区门票、目的地游玩等产品及旅游周边服务。', '2022-11-09 13:53:21', '2023-08-31 16:58:00');
INSERT INTO `xmw_organization` VALUES ('867bb4e9-fe0c-4232-8f45-14cdf2078008', '国际化业务部', '416d7277-5d55-4778-a535-57a67b290c16', 'Gjh', 'department', '', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '负责抖音产品的国际化宣传', '2023-09-12 13:42:28', '2023-09-12 13:42:28');
INSERT INTO `xmw_organization` VALUES ('9e0d462d-5254-41ba-b8f3-982a7cf588f0', '腾讯控股', NULL, 'Tencent', 'group', 'https://react.baiwumm.com/static/image/2023-08-31/88f5eeb8-fa3d-4add-8435-1ff4e737db39.png', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '深圳市腾讯计算机系统有限公司成立于1998年11月，由马化腾、张志东、许晨晔、陈一丹、曾李青五位创始人共同创立。', '2022-10-21 09:49:43', '2023-08-31 17:00:35');
INSERT INTO `xmw_organization` VALUES ('bb074cdc-4aa2-42e4-a200-64bf83ed4ed5', '天猫商城', '79581210-60b7-4c66-b6ae-14b013c3661e', 'Tmall', 'unit', 'https://react.baiwumm.com/static/image/2023-08-31/011f1933-cb5a-4031-8556-bc70a527b965.png', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 2, '“天猫”（英文：Tmall，亦称淘宝商城、天猫商城）原名淘宝商城，是一个综合性购物网站。', '2022-09-15 15:36:46', '2023-08-31 16:57:27');
INSERT INTO `xmw_organization` VALUES ('c1921e5b-8a12-4ad0-88bd-c21355765596', '微信', '9e0d462d-5254-41ba-b8f3-982a7cf588f0', 'WeChat', 'company', 'https://react.baiwumm.com/static/image/2023-08-31/b7f8d9f8-15ec-4fe4-b2f9-e54d6ddf67fd.png', 'a7e1d550-c351-4d19-8873-268912f73584', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '微信（WeChat）是腾讯公司于2011年1月21日推出的一个为智能终端提供即时通讯服务的免费应用程序 [1]  ，由张小龙所带领的腾讯广州研发中心产品团队打造 [2]  。', '2022-12-28 13:52:52', '2023-08-31 17:03:37');
INSERT INTO `xmw_organization` VALUES ('cb71893e-94dc-4899-90ab-286d96c3ca84', 'QQ', '9e0d462d-5254-41ba-b8f3-982a7cf588f0', 'QQ', 'unit', 'https://react.baiwumm.com/static/image/2023-08-31/07d2a99c-b294-4512-9066-4a1efe7e839b.png', '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, 'QQ，是腾讯QQ的简称，是腾讯公司推出的一款基于互联网的即时通信软件', '2022-12-28 13:51:38', '2023-08-31 17:01:50');
INSERT INTO `xmw_organization` VALUES ('e93e3fb9-ae34-4c5f-ae7b-ffc9985c4a04', '数字化研发', '416d7277-5d55-4778-a535-57a67b290c16', 'Digital', 'department', '', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '负责抖音产品的研发', '2023-09-12 13:41:10', '2023-09-12 13:41:10');
INSERT INTO `xmw_organization` VALUES ('f107862c-30bf-45cb-9957-5b5429e0ff20', '淘宝', '79581210-60b7-4c66-b6ae-14b013c3661e', 'Taobao', 'company', 'https://react.baiwumm.com/static/image/2023-08-31/13c38782-05eb-475d-b385-205250555dc5.png', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '淘宝网是亚太地区较大的网络零售、商圈，由阿里巴巴集团在2003年5月创立。', '2022-09-15 15:39:08', '2023-08-31 16:58:28');

SET FOREIGN_KEY_CHECKS = 1;
