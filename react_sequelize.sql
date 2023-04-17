/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : localhost:3306
 Source Schema         : react_sequelize

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 13/04/2023 20:44:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for xmw_international
-- ----------------------------
DROP TABLE IF EXISTS `xmw_international`;
CREATE TABLE `xmw_international`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '国际化id',
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '国际化字段',
  `parent_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '父级id',
  `zh-CN` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '中文',
  `en-US` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '英文',
  `ja-JP` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '日文',
  `zh-TW` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '繁体中文',
  `founder` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '创建人',
  `sort` int NOT NULL COMMENT '排序',
  `created_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xmw_international
-- ----------------------------
INSERT INTO `xmw_international` VALUES ('00728462-5781-4f7b-ba64-812a4e9d2d59', 'created_time', '234ca5d3-d0e3-4525-9d39-e500745ba791', '创建时间', 'Creation time', '作成時間', '創建時間', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 14:09:26', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('013dbf13-9683-42ef-a791-929d2e69e698', 'rules', 'be72ba21-a54c-4799-babc-cc25728275e4', '电子邮箱地址格式不正确！', 'Email address format is incorrect!', 'eメールアドレスの書式が正しくありません!', '電子郵箱地址格式不正確！', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 16:13:07', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('039b756e-6597-4cf9-ba86-08e11a4d5a90', 'tip', '6fad92cf-d40f-4e80-8ba6-29ec6c37725a', '已绑定邮箱', 'Bound Mailbox', 'メールボックスに結びつけました', '已綁定郵箱', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-13 18:25:12', '2023-01-13 18:25:12');
INSERT INTO `xmw_international` VALUES ('08748ffe-5d33-4406-b786-cf61e3205a90', 'delete', '51738317-f9fc-48e2-9ace-b418fdacf8e3', '删除', 'Delete', '削除', '刪除', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-30 17:07:53', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('0876e3f8-7ec7-4d8e-ab84-49de4b779c71', 'title', '1261dcbe-628a-430b-ab40-89c55015fabb', '上传头像', 'Upload Avatar', 'アバターをアップロードする', '上傳頭像', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-11-23 16:03:38', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('08f11a22-9510-4d95-ba18-e0fa4a15b675', 'warm-tips', '9d9e17ad-e767-4d9a-9102-1866c2590f74', '温馨提示', 'Warm Tips', '暖かい ヒントです', '溫馨提示', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-12-09 18:09:33', '2022-12-09 18:09:33');
INSERT INTO `xmw_international` VALUES ('08f997a9-39cb-4d35-bb73-8556a911e12f', 'work-bench', 'ed2bf05a-70a1-419a-adf3-b747d449f75a', '工作台', 'Work Bench', '作業台', '工作臺', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:58:16', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('0960fd86-7e79-496b-83aa-c4159e516d8c', 'administrative', 'e8922ec5-d0d2-4911-a146-80c2efdd38b5', '智能行政', 'Intelligent Administrative', 'スマート行政', '智能行政', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 9, '2022-09-17 11:48:26', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('0a797791-c47f-487b-86b4-d1aa7792f92e', 'title', '5ea52517-8c5e-419d-b59b-a923eb68f50e', '用户', 'User', 'ユーザー', '用戶', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 14:27:55', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('0a8078ee-a632-4dd8-a943-624541391743', 'certification-realName', 'e8ca71aa-4c2b-42c2-ac80-63677e1d80d7', '实名认证', 'Real-name authentication', '実名認証です', '實名認證', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-03-20 17:12:55', '2023-03-20 17:12:55');
INSERT INTO `xmw_international` VALUES ('0adff35e-9313-4119-a4f6-80dc8cda5558', 'success', '44fe6614-f996-4c29-b06b-b41ca15a67f2', '登录成功！', 'Login successful!', 'ログイン成功!', '登錄成功！', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:55:12', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('0bc45d3c-6418-409b-9579-a1a531abaac7', 'component', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '组件路径', 'Component', 'コンポーネントパス', '組件路徑', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 14:43:27', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('0c01ef7d-2f6f-440a-b642-62564d41f473', 'components', NULL, NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-21 14:51:49', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('0c075bb7-805c-47aa-9eff-03a49267a00a', 'security-phone', 'e8ca71aa-4c2b-42c2-ac80-63677e1d80d7', '密保手机', 'Security Phone', '携帯電話です', '密保手機', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-13 18:22:18', '2023-01-13 18:22:18');
INSERT INTO `xmw_international` VALUES ('0ca938ac-db88-4b99-8863-5bb3ae8a094c', 'personal-information', '22a98b3b-704e-4de2-8c90-34c2a1387f68', '个人信息', 'Personal Information', '個人情報です', '個人信息', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 88, '2023-01-12 15:26:10', '2023-01-12 15:34:57');
INSERT INTO `xmw_international` VALUES ('0e4408f9-ac17-43de-a44a-309caed9d07b', 'subtitle', '44fe6614-f996-4c29-b06b-b41ca15a67f2', '技术栈：React + TS + umi4 + antd-pro', 'Technology stack: React + TS + UMI4 + ANTD-Pro', '技術スタック:React + TS + umi4 + antd-pro', '技術棧：React + TS + umi4 + antd-pro', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:53:16', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('0ed7bafd-c469-4792-9698-05e03152ad9d', 'delete', '9d8cdcd5-2151-43fe-8230-3ae610a9b3e3', '删除', 'Delete', '削除', '刪除', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 88, '2022-09-30 10:42:00', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('0f5ebfbf-bd14-4b5c-9bf5-67929e36f653', 'LockScreen', '52a9e710-b55c-4ee2-9e51-45bdc91ab118', '锁定屏幕', 'Lock screen', 'ロック画面です', '鎖定屏幕', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-09 14:24:05', '2023-01-09 14:24:05');
INSERT INTO `xmw_international` VALUES ('10cdbdc3-8286-49ad-907a-211120f62bc9', 'org_code', '50d475a0-e2b8-4997-8426-a1e067b1db11', '组织编码', 'Organization code', '組織コード', '組織編碼', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 17:45:17', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('1261dcbe-628a-430b-ab40-89c55015fabb', 'UploadAvatar', '0c01ef7d-2f6f-440a-b642-62564d41f473', NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-11-23 16:02:33', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('13dca233-90c4-4526-b3c0-c40ddb10670f', 'role_code', 'bf652ff9-7210-4fda-9ece-4c7fa3e5ae87', '角色编码', 'Role Code', 'キャラクターコード', '角色編碼', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-30 17:17:03', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('140ad3b4-2d3b-49e9-8f38-1e9eaee2186a', 'original-password', '8c5b3043-89c4-4266-b262-9002ad757b4b', '原密码', 'Original Password', '元のパスワードです', '原密碼', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-12 16:35:53', '2023-01-12 16:35:53');
INSERT INTO `xmw_international` VALUES ('1472daef-ee78-4da9-8b15-27d56cf6d12d', 'modify', 'cb2edc15-2e6d-4de6-ab92-14cfc727569e', '修改', 'Modify', '修正', '修改', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-13 18:26:13', '2023-01-13 18:26:13');
INSERT INTO `xmw_international` VALUES ('1645fb99-80fa-45e5-a075-8296479afb6b', 'edit', 'c4d9c21d-f619-48eb-8ceb-537cb064247e', '编辑', 'Edit', '編集', '編輯', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 77, '2022-09-30 10:18:25', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('16722f3f-35da-4cae-b1b9-738acbcf97cc', 'title', '22b09a10-3417-4d53-9aed-b0f43927bb41', '您确认要删除这条数据吗？', 'Are you sure you want to delete this data?', 'このデータを削除することをご確認いただけますか?', '您確認要刪除這條數據嗎？', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 13:41:15', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('16ebb546-7843-465e-ab0f-214bf24d0f79', 'add', '505ca506-6cdc-4c88-b24b-479d6456bbde', '新建', 'New', '新築', '新建', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 14:05:31', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('1d0c376a-0d14-4699-ae9f-712696e977b1', 'tabs', NULL, NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-03-16 15:58:15', '2023-03-16 15:58:15');
INSERT INTO `xmw_international` VALUES ('1d171e79-2dde-4496-990b-819681aa5510', 'title', '2c90eea9-f0c8-48bb-a331-a9526c59f6a6', '岗位', 'Jobs', '雇用', '崗位', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-23 14:12:19', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('1d98fffe-d1df-4f7f-95be-c544a655fe11', 'fixSiderbar', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '固定菜单', 'Fixed menu', '定番メニュー', '固定菜單', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 18:20:25', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('1d9ddc96-9292-4f08-a359-0c1384ff5802', 'menu-management', '251711b4-6fd3-4090-8a58-9cb67616e508', '菜单管理', 'Menu Maganement', 'メニュー管理', '菜單管理', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 09:57:06', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('1f533660-151d-4646-8f04-63a6539ed094', 'phone', '5ea52517-8c5e-419d-b59b-a923eb68f50e', '手机号码', 'Mobile Phone', '携帯電話の番号', '手機號碼', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 16:10:08', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('1f8cd9bc-681e-4d8d-a98d-3835f85abcac', 'tooltip', 'daa7e0f8-f7dc-4a14-beae-227108a57041', '权限标识是唯一的，用于做路由的权限管理', 'The permission identifier is unique and is used for routing permission management', 'ルーティングの権限管理をするための権限識別子は一意である', '權限標識是唯一的，用於做路由的權限管理', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 16:07:22', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('1fa8602e-09d1-4324-bfd4-ee45edadce5c', 'validator', 'bdcbe983-b255-4a6d-bf83-e5030a31a89f', '组织名称的长度在2-36个字符', 'The organization name can be 2-36 characters in length', '組織名の長さは2 ~ 36文字', '組織名稱的長度在2-36個字符', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-21 09:55:44', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('20403df0-d670-4c4b-a7ea-0e2ae3d43dd3', 'hideInMenu', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '隐藏菜单', 'Hidden Menu', '隠しメニュー', '隱藏菜單', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 18:13:09', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('218b6d3c-38df-4b88-b8dc-d544454297a1', 'personal-center', 'fd9a9de8-6044-42fc-a128-eba14bea123d', '个人中心', 'Personal Center', '個人センターです', '個人中心', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-12 16:26:46', '2023-01-12 16:26:46');
INSERT INTO `xmw_international` VALUES ('22a98b3b-704e-4de2-8c90-34c2a1387f68', 'personal-center', 'e8922ec5-d0d2-4911-a146-80c2efdd38b5', '个人中心', 'Personal Center', '個人センターです', '個人中心', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 8, '2023-01-12 15:25:20', '2023-01-12 15:25:28');
INSERT INTO `xmw_international` VALUES ('22b09a10-3417-4d53-9aed-b0f43927bb41', 'delete', '6d809d46-3509-4438-8a66-6d5baf0812af', NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 13:40:26', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('22e08449-2621-4ed4-8b74-81402a93b86d', 'tooltip', '7dcad954-f775-4b52-abd7-23bd840139bb', '请填写 IconFont 阿里图标矢量库的名称', 'Please fill in the name of IconFont Ali icon vector library', 'IconFontアリアイコンベクターライブラリの名前を記入してください', '請填寫 IconFont 阿裏圖標矢量庫的名稱', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 14:49:32', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('234ca5d3-d0e3-4525-9d39-e500745ba791', 'table', '9d9e17ad-e767-4d9a-9102-1866c2590f74', NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 13:47:18', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('23938b40-c7e0-4052-9dfa-1c8bdae91be5', 'placeholder', 'cf1e2401-7736-493e-9a6a-1b531740add5', '请输入用户密码', 'Please enter the user password', 'パスワードの入力をお願いします', '請輸入用戶密碼', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-09 14:14:47', '2023-01-09 14:14:47');
INSERT INTO `xmw_international` VALUES ('24a818d2-2706-4339-aab8-827cb96e7319', 'title', 'bf652ff9-7210-4fda-9ece-4c7fa3e5ae87', '角色', 'Role', '役', '角色', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-30 17:15:53', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('251711b4-6fd3-4090-8a58-9cb67616e508', 'system', 'fd9a9de8-6044-42fc-a128-eba14bea123d', NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:58:59', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('264f7bf8-c189-445d-aa08-bf8f52e23b7c', 'jobs_name', '2c90eea9-f0c8-48bb-a331-a9526c59f6a6', '岗位名称', 'Jobs Name', '持ち場の名称', '崗位名稱', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-23 14:06:28', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('2abb3cf1-a8a5-4979-bc8f-0d6ca312e362', 'delete', '505ca506-6cdc-4c88-b24b-479d6456bbde', '删除', 'Delete', '削除', '刪除', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 14:05:00', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('2c90eea9-f0c8-48bb-a331-a9526c59f6a6', 'jobs-management', 'aa2710b2-9faf-4369-aee3-ca7700d84e99', '岗位管理', 'Post Management', '持ち場管理', '崗位管理', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-23 13:46:17', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('2d6b3ac4-0252-49a3-964b-e1f83e2783af', 'title', '5245540c-dfe2-4375-9964-96864b07b6e7', '语言', 'language', '言語', '語言', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 14:17:38', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('3037d66a-efff-41e0-9bb4-0985b354c821', 'path', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '路由地址', 'Route Path', '経路アドレス', '路由地址', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 14:40:04', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('32b547e4-e6a1-49bb-b801-cd377185ab43', 'menu-management', '48ea12ef-201f-4738-8af8-066533179393', '菜单管理', 'Menu Management', 'メニュー管理', '菜單管理', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 88, '2022-09-27 09:56:31', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('32c9f1bb-422e-4943-a21b-0f71e7298a3a', 'hideInBreadcrumb', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '在面包屑中隐藏', 'Hide in the bread crumbs', 'パン屑の中に隠す', '在面包屑中隱藏', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 18:14:06', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('3356ff8b-2c7e-4122-82e0-5cae53d24057', 'content', 'bf2ca4d5-cde9-46d4-930e-12a5aa95a1b6', '操作内容', 'Operation content', '作業内容です', '操作內容', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-03-20 15:44:54', '2023-03-20 15:44:54');
INSERT INTO `xmw_international` VALUES ('33f25830-6bdb-4a22-839a-15562e446c3f', 'form', '9d9e17ad-e767-4d9a-9102-1866c2590f74', NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 14:19:18', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('34eca912-63b1-42ed-ba49-7e5d9a285aad', 'cn_name', '5ea52517-8c5e-419d-b59b-a923eb68f50e', '中文名', 'Cn Name', '日文名', '中文名', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 14:14:32', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('369bc722-201a-4379-b651-610f75719068', 'rules', '1f533660-151d-4646-8f04-63a6539ed094', '手机号码格式不正确！', 'The format of mobile phone number is incorrect!', '携帯の番号のフォーマットが正しくありません!', '手機號碼格式不正確！', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 16:20:02', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('3875430f-9d36-4a24-a7a7-663b32c9a752', 'menuHeaderRender', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '显示菜单顶栏', 'Display the top bar of the menu', 'メニュートップを表示する', '顯示菜單頂欄', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 18:17:35', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('3b260bca-826a-4667-b1da-90bb185b8a61', 'add', 'fdaf8a23-8777-46ff-9142-f30eb3e4d8ee', '新建', 'New', '新築', '新建', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-30 10:45:02', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('3c57950e-15d6-4c2b-ae37-07dfdc63c33b', 'access-system', '0f5ebfbf-bd14-4b5c-9bf5-67929e36f653', '进入系统', 'Access System', 'システムに入ります', '進入系統', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-11 18:08:11', '2023-01-11 18:08:11');
INSERT INTO `xmw_international` VALUES ('3d280731-629d-449f-ba6c-ecd6f8a1617c', 'personal-setting', '22a98b3b-704e-4de2-8c90-34c2a1387f68', '个人设置', 'Personal Setting', '個人設定です', '個人設置', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-12 15:26:51', '2023-01-12 15:26:51');
INSERT INTO `xmw_international` VALUES ('3d3e87e0-1072-45e6-bec2-b1080e4646d8', 'add', '32b547e4-e6a1-49bb-b801-cd377185ab43', '新建', 'New', '新築', '新建', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 14:00:09', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('3dc50878-9ba6-4b6d-aead-e8ef330a6d80', 'menuRender', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '显示菜单', 'According to the menu', 'メニューを表示する', '顯示菜單', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 18:16:45', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('3f56a8e8-4bc1-4e88-9fdf-4466446be2d8', 'confirm-password', '5ea52517-8c5e-419d-b59b-a923eb68f50e', '确认密码', 'Confirm Password', 'パスワードを確認する', '確認密碼', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 18:17:40', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('41113d3c-53e7-4411-98bb-754e1fd8116c', 'password', '0f5ebfbf-bd14-4b5c-9bf5-67929e36f653', '锁屏密码', 'Screen lock password', 'スクリーンロックのパスワードです', '鎖屏密碼', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-11 11:23:19', '2023-01-11 11:23:19');
INSERT INTO `xmw_international` VALUES ('41f82142-6334-4bc3-8287-606041455ade', 'headerTheme', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '顶部菜单主题', 'Top menu Theme', 'トップメニューテーマ', '頂部菜單主題', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 18:32:54', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('44182887-f08b-45b3-9291-5dfd4506a804', 'work-bench', 'ceca59e9-005c-42da-83e3-415fac994fac', '工作台', 'Work Bench', '作業台', '工作臺', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:44:57', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('44d78ea8-4ab3-4073-b2c3-628b011b7f40', 'user-information', '5769baab-d018-4c98-8d60-05a98f46fb15', '用户信息', 'User Information', 'ユーザー情報', '用戶信息', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 16:35:46', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('44fe6614-f996-4c29-b06b-b41ca15a67f2', 'login', 'fd9a9de8-6044-42fc-a128-eba14bea123d', NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:52:49', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('4738239a-ddd2-41d8-8a94-88060de98a7b', 'account-password', 'e8ca71aa-4c2b-42c2-ac80-63677e1d80d7', '账户密码', 'Account Password', '口座番号です', '賬戶密碼', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-13 18:19:46', '2023-01-13 18:19:46');
INSERT INTO `xmw_international` VALUES ('47d4736b-ae0d-46dc-bdb5-41d1a4d71b8b', 'name', '5245540c-dfe2-4375-9964-96864b07b6e7', '国际化字段', 'Internationalization field', '国際化フィールド', '國際化字段', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 14:04:24', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('47d58197-23db-4141-bebc-9bb4eff41032', 'right', 'f6c475f1-fb20-4be9-a54d-b865644b087d', '关闭右侧', 'Close the Right', '右側を閉じる', '關閉右側', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-21 14:56:51', '2023-03-16 16:00:14');
INSERT INTO `xmw_international` VALUES ('47eba309-b9b8-4943-9e6c-cf2296e41214', 'add', '9d8cdcd5-2151-43fe-8230-3ae610a9b3e3', '新建', 'New', '新築', '新建', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 99, '2022-09-30 10:41:29', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('48ea12ef-201f-4738-8af8-066533179393', 'system', 'e8922ec5-d0d2-4911-a146-80c2efdd38b5', '系统设置', 'System Settings', 'システム設定', '系統設置', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:49:51', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('49297e11-6817-4dab-bc40-5d6deb5f60ba', 'validator', 'bbeca07e-bef0-41e4-8700-116099451757', '角色名称的长度在2-36个字符', 'The character name can be 2-36 characters long', '役名の長さは2 ~ 36文字', '角色名稱的長度在2-36個字符', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-11-03 10:07:42', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('4ba5a363-c16e-4f8e-abbd-8d653066aa0d', 'structure', '0960fd86-7e79-496b-83aa-c4159e516d8c', '组织架构', 'Organizational Structure', '組織構造', '組織架構', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-26 09:23:00', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('4cdb34d3-25dc-4fe1-abee-862989ad6c57', 'role_id', '5ea52517-8c5e-419d-b59b-a923eb68f50e', '所属角色', 'Subordinate Role', '所属するキャラクター', '所屬角色', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 16:00:05', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('4e17740d-5947-47cf-971c-fcadecbec940', 'edit', '32b547e4-e6a1-49bb-b801-cd377185ab43', '编辑', 'Edit', '編集', '編輯', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 13:49:26', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('4e81caa4-2285-4aca-9e75-4e37cf8dbffa', 'redirect', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '重定向', 'Redirect', 'リダイレクト', '重定向', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 14:44:36', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('4f8bb98f-1ea9-4dde-946b-f2897db47a6c', 'account', '5aaeba0a-4891-4bf5-9b09-cffbd8b36a86', '账号密码登录', 'Account Password Login', 'アカウントのパスワード登録', '賬號密碼登錄', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-11 17:42:15', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('4faea96a-a6ed-4509-90b4-f398e25f0ee0', 'logout', 'fd9a9de8-6044-42fc-a128-eba14bea123d', NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-12-09 18:11:06', '2022-12-09 18:11:06');
INSERT INTO `xmw_international` VALUES ('505ca506-6cdc-4c88-b24b-479d6456bbde', 'user-management', '48ea12ef-201f-4738-8af8-066533179393', '用户管理', 'User Management', 'ユーザー管理', '用戶管理', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 99, '2022-09-17 11:50:13', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('5073be03-8237-4fbb-9517-a10a05e6abc0', 'delete', '32b547e4-e6a1-49bb-b801-cd377185ab43', '删除', 'Delete', '削除', '刪除', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 13:50:05', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('50d475a0-e2b8-4997-8426-a1e067b1db11', 'organization', 'aa2710b2-9faf-4369-aee3-ca7700d84e99', '组织管理', 'Organization Management', '組織マネジメント', '組織管理', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:58:50', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('51738317-f9fc-48e2-9ace-b418fdacf8e3', 'role-management', '48ea12ef-201f-4738-8af8-066533179393', '角色管理', 'Role Management', '役割管理', '角色管理', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 66, '2022-09-30 17:00:09', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('5245540c-dfe2-4375-9964-96864b07b6e7', 'internationalization', '251711b4-6fd3-4090-8a58-9cb67616e508', '国际化', 'Internationalization', '国際化', '國際化', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:59:39', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('52a9e710-b55c-4ee2-9e51-45bdc91ab118', 'RightContent', '0c01ef7d-2f6f-440a-b642-62564d41f473', NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-03 16:14:20', '2023-01-03 16:14:20');
INSERT INTO `xmw_international` VALUES ('545b1f16-6cff-47da-a8a9-c6cf99af37ca', 'placeholder', '5f4057a8-db52-42c4-a4ca-5ca7761169e8', '密码:', 'Password:', '\'パスワード: ', '密碼:', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:57:18', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('557122ed-0417-45df-8ee7-db7bc446934e', 'work_no', '5ea52517-8c5e-419d-b59b-a923eb68f50e', '工号', 'Work No', '工号', '工號', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 14:15:53', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('5769baab-d018-4c98-8d60-05a98f46fb15', 'steps-form', '5ea52517-8c5e-419d-b59b-a923eb68f50e', NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 16:34:50', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('57bae84c-e7e0-484d-b3c1-83f12d281cd7', 'seleted', '87050d72-b32a-414f-97c9-a139c8dd308d', '请选择', 'Please Selected', '選んでください', '請選擇', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 17:53:53', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('57c8e251-49fb-4b9b-8444-587e779312d7', 'first-login', '0adff35e-9313-4119-a4f6-80dc8cda5558', '这是您第一次登录系统！', 'This is your first login to the system!', 'システムへのログインは初めてです!', '這是您第一次登錄系統！', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-12-13 14:59:50', '2022-12-13 14:59:50');
INSERT INTO `xmw_international` VALUES ('5964805c-222d-4412-8abc-c8ce93e7e97c', 'StrengthMeter', '0c01ef7d-2f6f-440a-b642-62564d41f473', NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-12 18:10:17', '2023-01-12 18:10:17');
INSERT INTO `xmw_international` VALUES ('5967f54b-a258-4d88-a73b-5f142f16c306', 'user_name', '4f8bb98f-1ea9-4dde-946b-f2897db47a6c', NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:55:24', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('5991245d-21ae-40c4-993f-73fa75600b8f', 'tip', '4738239a-ddd2-41d8-8a94-88060de98a7b', '当前密码强度', 'Current password strength', '現在の暗号強度です', '當前密碼強度', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-13 18:21:07', '2023-01-13 18:21:07');
INSERT INTO `xmw_international` VALUES ('59f454ea-e263-4870-8a9a-6a393eda0346', 'tooltip', 'c6271c0e-277f-4f81-b177-1c62ecc3d493', '请选择国际化绑定的字段', 'Select fields for internationalized binding', '国際化バインディングのフィールドを選んでください', '請選擇國際化綁定的字段', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 11:13:46', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('5a165777-4a9b-4e49-8a77-6f4e26ed1b7f', 'menu_permission', 'bf652ff9-7210-4fda-9ece-4c7fa3e5ae87', '菜单权限', 'Menu Permissions', 'メニュー権限', '菜單權限', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-30 17:58:41', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('5aaeba0a-4891-4bf5-9b09-cffbd8b36a86', 'type', '44fe6614-f996-4c29-b06b-b41ca15a67f2', NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-11 17:41:21', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('5b1bfcc3-20ca-4704-9eb1-6548ff5f2d4b', 'zh-CN', '5245540c-dfe2-4375-9964-96864b07b6e7', '中文', 'Chinese', '中文', '中文', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 14:06:17', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('5bc83778-e508-4cfd-858d-5c360b94f3fb', 'FullScreen', '52a9e710-b55c-4ee2-9e51-45bdc91ab118', '全屏', 'FullScreen', '全般', '全屏', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-03 16:15:17', '2023-01-03 16:15:17');
INSERT INTO `xmw_international` VALUES ('5dfc65e3-e9e1-4b93-a989-2076c6986ccf', 'structure', 'aa2710b2-9faf-4369-aee3-ca7700d84e99', '组织架构', 'Organizational Structure', '組織構造', '組織架構', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-26 09:22:12', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('5ea52517-8c5e-419d-b59b-a923eb68f50e', 'user-management', '251711b4-6fd3-4090-8a58-9cb67616e508', '用户管理', 'User Management', 'ユーザー管理', '用戶管理', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:59:20', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('5f4057a8-db52-42c4-a4ca-5ca7761169e8', 'password', '4f8bb98f-1ea9-4dde-946b-f2897db47a6c', NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:56:52', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('5f5f29f7-b79e-4937-adec-3906bf1e27c8', 'left', 'f6c475f1-fb20-4be9-a54d-b865644b087d', '关闭左侧', 'Close the Left', '左側を閉じる', '關閉左側', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-21 14:55:41', '2023-03-16 16:00:26');
INSERT INTO `xmw_international` VALUES ('6086994a-f9e4-47a2-87d9-7ce96de0fd8b', 'path', 'bf2ca4d5-cde9-46d4-930e-12a5aa95a1b6', '路由', 'Path', '共有', '路由', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-03-20 15:46:39', '2023-03-20 15:46:39');
INSERT INTO `xmw_international` VALUES ('60ba1100-72a4-4484-bd7f-e273f826408f', 'others', 'f6c475f1-fb20-4be9-a54d-b865644b087d', '关闭其它', 'Close the Other', 'その他を閉じる', '關閉其它', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-21 14:54:57', '2023-03-16 16:00:42');
INSERT INTO `xmw_international` VALUES ('6195d09a-12a6-4d35-8586-f54298228619', 'failure', '44fe6614-f996-4c29-b06b-b41ca15a67f2', '登录失败，请重试！', 'Login failed, please try again!', 'ログインに失敗したら、もう一度試してください!', '登錄失敗，請重試！', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:54:48', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('6262ffe4-2964-405c-a43a-caab05f1a989', 'weak', '5964805c-222d-4412-8abc-c8ce93e7e97c', '弱', 'weak', '弱い', '弱', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-12 18:11:26', '2023-01-12 18:11:26');
INSERT INTO `xmw_international` VALUES ('630b29a5-77d0-4c50-867c-226227ce6fd5', 'add-child', 'fdaf8a23-8777-46ff-9142-f30eb3e4d8ee', '添加子级', 'Add Child', 'サブレベルを追加する', '添加子级', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-30 10:43:35', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('641f3543-8091-4202-9978-2423a66cb6c9', 'personal-setting', '218b6d3c-38df-4b88-b8dc-d544454297a1', '个人设置', 'Personal Setting', '個人設定です', '個人設置', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-12 16:33:05', '2023-01-12 16:33:05');
INSERT INTO `xmw_international` VALUES ('6529451e-64d0-4f65-b80b-d806722daf75', 'leader', '33f25830-6bdb-4a22-839a-15562e446c3f', '负责人', 'Leader', '責任者', '負責人', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-12-01 17:02:46', '2022-12-01 17:02:46');
INSERT INTO `xmw_international` VALUES ('67761aaf-1f58-4afa-97be-613221d397f2', 'add-child', 'c4d9c21d-f619-48eb-8ceb-537cb064247e', '添加子级', 'Add Child', 'サブレベルを追加する', '添加子级', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 66, '2022-09-30 10:19:01', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('68e87020-2ff1-484e-a2d8-23e6b7f58b4c', 'basic-setting', '641f3543-8091-4202-9978-2423a66cb6c9', '基本设置', 'Basic Setting', '基本設定です', '基本設置', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-12 18:17:06', '2023-01-12 18:17:06');
INSERT INTO `xmw_international` VALUES ('69499142-5a66-4923-b1df-2397ad516149', 'sex', '5ea52517-8c5e-419d-b59b-a923eb68f50e', '性别', 'Sex', '性别', '性別', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 17:35:18', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('69601e1c-5c18-4121-b30e-9ee7f903fb8d', 'tooltip', '8eec5109-65ca-45ca-a247-3ff9a61667d0', '导航菜单的位置,side 为正常模式，top菜单显示在顶部，mix 两种兼有', 'The location of the navigation menu,side is the normal mode, the top menu is displayed on the top, and MIX has both', 'ナビゲーションメニューの位置は、sideがノーマルモード、topメニューが上部に表示され、mixの2種類を兼ねている', '導航菜單的位置,side 為正常模式，top菜單顯示在頂部，mix 兩種兼有', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 18:25:50', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('6b14f19e-3728-4abf-abd6-56b0a1df9d39', 'tip', '8c5b3043-89c4-4266-b262-9002ad757b4b', '修改密码后，你将退出当前页面重新登录', 'After changing the password, you will exit the current page and log in again', 'パスワードを変更すると、ログアウトしてログインし直します。', '修改密碼後，你將退出當前頁面重新登錄', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-12 17:03:29', '2023-01-12 17:03:29');
INSERT INTO `xmw_international` VALUES ('6bfdeee5-3b40-4eb8-9b6e-43fabfc2458e', 'obtain', 'b4886664-cdd0-4108-ac7f-e0758cb14db2', '获取', 'Obtain', '取得', '獲取', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-11 17:52:51', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('6ce14350-b984-4405-ab87-ec0826948203', 'user_name', '5ea52517-8c5e-419d-b59b-a923eb68f50e', '用户名', 'User Name', 'ユーザー名', '用戶名', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 14:11:13', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('6d2c19d9-5e21-41fa-99af-e35d1f7d1d0b', 'describe', '234ca5d3-d0e3-4525-9d39-e500745ba791', '描述', 'describe', '描写', '描述', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-23 14:15:59', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('6d809d46-3509-4438-8a66-6d5baf0812af', 'message', '9d9e17ad-e767-4d9a-9102-1866c2590f74', NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 13:50:54', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('6fad92cf-d40f-4e80-8ba6-29ec6c37725a', 'secure-mailbox', 'e8ca71aa-4c2b-42c2-ac80-63677e1d80d7', '安全邮箱', 'Secure Mailbox', '安全メールボックスです', '安全郵箱', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-13 18:24:13', '2023-01-13 18:24:13');
INSERT INTO `xmw_international` VALUES ('70e7e9a0-159c-497d-8e68-a5308b84b675', 'target', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '窗口打开方式', 'Window opening mode', 'ウィンドウの開き方', '窗口打開方式', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 16:02:28', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('7287f78c-fb97-4026-ab11-35aab662705d', 'personal-information', '5769baab-d018-4c98-8d60-05a98f46fb15', '个人信息', 'Personal Information', '個人情報', '個人信息', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 17:11:54', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('74312053-cc00-4b2b-b9ce-052088fb4d70', 'method', 'bf2ca4d5-cde9-46d4-930e-12a5aa95a1b6', '请求方式', 'Request method', '請求方法です', '請求方式', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-03-20 15:48:39', '2023-03-20 15:48:39');
INSERT INTO `xmw_international` VALUES ('7472080e-dcda-45ab-b351-29ea7385a822', 'user_agent', 'bf2ca4d5-cde9-46d4-930e-12a5aa95a1b6', '代理', 'Agent', '代理', '代理', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-03-20 15:50:08', '2023-03-20 15:50:08');
INSERT INTO `xmw_international` VALUES ('7584d757-277a-4ed8-a797-1c21a03207b0', 'error', 'cf1e2401-7736-493e-9a6a-1b531740add5', '密码不正确，请重新输入!', 'Password is incorrect, please re-enter!', 'パスワードが正しくありません。入力し直してください。', '密碼不正確，請重新輸入!', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-09 14:18:11', '2023-01-09 14:18:11');
INSERT INTO `xmw_international` VALUES ('76b6beea-a909-47f6-a14e-416dc11a1e08', 'fixedHeader', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '固定顶栏', 'Fixed the top bar', 'トップバーを固定する', '固定頂欄', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 18:19:37', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('7868fd04-78bc-4b5c-8254-f7f9b085915b', 'general', '5964805c-222d-4412-8abc-c8ce93e7e97c', '一般', 'General', '一般', '一般', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-12 18:12:09', '2023-01-12 18:12:09');
INSERT INTO `xmw_international` VALUES ('7addc4ef-6734-4677-b303-c752912caac2', 'tags', '5ea52517-8c5e-419d-b59b-a923eb68f50e', '人物标签', 'Figure Labels', '人物タグ', '人物標簽', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-09 10:41:19', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('7dcad954-f775-4b52-abd7-23bd840139bb', 'icon', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '图标', 'Icon', 'アイコン', '圖標', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 14:47:39', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('7e0760bf-e3a8-4514-897c-39b1b59780b6', 'certified', '0a8078ee-a632-4dd8-a943-624541391743', '已认证', 'Certified', '認証済みです', '已認證', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-03-20 17:19:05', '2023-03-20 17:19:05');
INSERT INTO `xmw_international` VALUES ('804f0013-7f7d-4d60-9d93-e192f8e40230', 'very-weak', '5964805c-222d-4412-8abc-c8ce93e7e97c', '非常弱', 'Very Weak', 'とても弱いです', '非常弱', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-12 18:11:02', '2023-01-12 18:11:02');
INSERT INTO `xmw_international` VALUES ('80bc7545-1e34-4a39-a37a-b07ca74943b5', 'add-child', '32b547e4-e6a1-49bb-b801-cd377185ab43', '添加子级', 'Add  Child', 'サブレベルを追加する', '添加子級', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 13:48:51', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('825f6b36-1a0e-4270-a18a-b6e1133ee180', 'Logout', '52a9e710-b55c-4ee2-9e51-45bdc91ab118', '退出登录', 'Log out', 'ログアウトします', '退出登錄', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-09 14:24:36', '2023-01-09 14:24:36');
INSERT INTO `xmw_international` VALUES ('8268f13f-53ac-457b-b9a6-695d65d366a9', 'validator', '264f7bf8-c189-445d-aa08-bf8f52e23b7c', '岗位名称的长度在2-36个字符', 'The job title should be 2 to 36 characters long', '部署名の長さは2 ~ 36文字', '崗位名稱的長度在2-36個字符', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-11-08 11:20:37', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('83d21706-8614-42f8-a491-ef9ba04c3913', 'hideChildrenInMenu', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '隐藏子路由', 'Hide subroutes', '子路を隠す', '隱藏子路由', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 18:12:06', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('83e02616-bb7a-4c02-97d4-bade828025f4', 'delete', 'c4d9c21d-f619-48eb-8ceb-537cb064247e', '删除', 'Delete', '削除', '刪除', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 88, '2022-09-30 10:17:44', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('85501869-1929-406b-9084-e9cd709d21cc', 'add', 'c4d9c21d-f619-48eb-8ceb-537cb064247e', '新建', 'New', '新築', '新建', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 99, '2022-09-30 10:16:21', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('859f2240-7e17-4ad1-8c8a-124a9567c805', 'file-type', '1261dcbe-628a-430b-ab40-89c55015fabb', '只能上传 JPG/PNG/GIF 文件！', 'Only JPG/PNG/GIF files can be uploaded!', 'JPG/PNG/GIFファイルしかアップロードできない!', '只能上傳 JPG/PNG/GIF 文件！', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-11-23 16:10:10', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('85eb76fb-5f11-45cb-85b5-ef8afa2ccf15', 'add-child', '9d8cdcd5-2151-43fe-8230-3ae610a9b3e3', '添加子级', 'Add Child', 'サブレベルを追加する', '添加子级', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 66, '2022-09-30 10:43:05', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('87050d72-b32a-414f-97c9-a139c8dd308d', 'placeholder', '33f25830-6bdb-4a22-839a-15562e446c3f', '请输入', 'Please enter', '入力してください', '請輸入', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 14:27:36', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('878435c7-d6e6-4122-9d0a-58f29ad8c8dc', 'org_id', '5ea52517-8c5e-419d-b59b-a923eb68f50e', '所属组织', 'Organization', '所属する組織', '所屬組織', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 16:22:42', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('88658d49-0f7c-4fde-bcc9-9d6ca658365e', 'en-US', '5245540c-dfe2-4375-9964-96864b07b6e7', '英文', 'English', '英文', '英文', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 14:07:00', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('899c5dba-3b9e-410e-83ba-cd3207c3c9ca', 'status', '9d9e17ad-e767-4d9a-9102-1866c2590f74', '状态', 'Status', '状态', '狀態', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 17:47:27', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('8b6a7e47-7752-40c2-b03a-9228defd30c3', 'secret', '69499142-5a66-4923-b1df-2397ad516149', '保密', 'secret', '秘密', '保密', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-11-25 10:53:22', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('8c5b3043-89c4-4266-b262-9002ad757b4b', 'change-password', '641f3543-8091-4202-9978-2423a66cb6c9', '修改密码', 'Change Password', 'パスワードを変更します', '修改密碼', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-12 16:33:51', '2023-01-12 16:33:51');
INSERT INTO `xmw_international` VALUES ('8c88ad4c-27cc-498a-b04b-c6805982d26a', 'avatar_url', '5ea52517-8c5e-419d-b59b-a923eb68f50e', '头像', 'Avatar', '顔', '頭像', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-10 14:43:01', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('8e99357f-c71f-47dc-a8d4-290fe40249b9', 'title', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '菜单', 'Menu', 'メニュー', '菜單', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 10:18:32', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('8eec5109-65ca-45ca-a247-3ff9a61667d0', 'layout', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '显示layout布局', 'Display Layout ', 'レイアウト表示', '顯示layout布局', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 18:08:33', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('8f96392e-461a-44e8-9a90-3d5c34d927dc', 'female', '69499142-5a66-4923-b1df-2397ad516149', '女', 'Female', '女', '女', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-10 15:22:34', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('8fa4e7ae-addb-4a29-a2f8-0e0a551a7581', 'password', '5ea52517-8c5e-419d-b59b-a923eb68f50e', '密码', 'Password', 'パスワード', '密碼', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 18:15:24', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('92b79458-f590-420b-8bef-be03e49e6208', 'title', '50d475a0-e2b8-4997-8426-a1e067b1db11', '组织', 'Organization', '組織', '組織', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 17:58:37', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('92e1670f-3d65-49a3-8b65-cffe529ad03e', 'edit', '9d8cdcd5-2151-43fe-8230-3ae610a9b3e3', '编辑', 'Edit', '編集', '編輯', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 77, '2022-09-30 10:42:31', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('954854fb-5d43-44e9-bb2b-1f21c955948b', 'tooltip', 'd5faf90d-a327-4f48-8143-a98e7de0783e', '不选默认为顶级', 'Do not select the default as top-level', 'デフォルトをトップに選ばない', '不選默認為頂級', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 14:20:56', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('9576f3c1-e5da-4d49-b796-5133185c5dbe', 'placeholder', '5967f54b-a258-4d88-a73b-5f142f16c306', '用户名:', 'User name:', 'ユーザー名:', '用戶名:', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:55:50', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('96138789-674c-4e00-9de4-6ebda0fab288', 'sort', '234ca5d3-d0e3-4525-9d39-e500745ba791', '排序', 'Sort', '序列', '排序', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 16:12:45', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('96330a0d-807e-479d-a12b-95b71874f104', 'footerRender', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '显示页脚', 'According to the footer', 'ページフットを表示する', '顯示頁腳', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 18:15:42', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('9d8634fa-55a3-4957-b706-c7c71a09023d', 'rules', 'ee435be2-a0a5-44a3-9a00-38708661b995', '手机号码格式不正确！', 'The format of mobile phone number is incorrect!', '携帯の番号のフォーマットが正しくありません!', '手機號碼格式不正確！', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-11 17:48:57', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('9d8cdcd5-2151-43fe-8230-3ae610a9b3e3', 'jobs-management', '0960fd86-7e79-496b-83aa-c4159e516d8c', '岗位管理', 'Jobs Management', '持ち場管理', '崗位管理', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 8, '2022-09-23 14:39:17', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('9d9e17ad-e767-4d9a-9102-1866c2590f74', 'global', NULL, NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 13:40:17', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('a3a86371-722b-4005-afa3-725de69da94a', 'failure', 'b4886664-cdd0-4108-ac7f-e0758cb14db2', '验证码错误！', 'Verification code error!', 'captchaエラーです!', '驗證碼錯誤！', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-12-13 15:12:10', '2022-12-13 15:12:10');
INSERT INTO `xmw_international` VALUES ('a3e5683c-c551-4f47-aa6e-15c64b69e01d', 'operation-log', '48ea12ef-201f-4738-8af8-066533179393', '操作日志', 'Operation Log', '操作ログ', '操作日誌', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:51:13', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('a54c782b-b087-4aa1-a56e-7fc4aec746a9', 'edit', 'fdaf8a23-8777-46ff-9142-f30eb3e4d8ee', '编辑', 'Edit', '編集', '編輯', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-30 10:43:56', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('a599be84-8074-448e-8251-d5dfd4fee091', 'last-time', '0adff35e-9313-4119-a4f6-80dc8cda5558', '距离您上次登录已是', 'It has been since your last login', '前回ログインしてからですが', '距離您上次登錄已是', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-12-13 14:49:33', '2022-12-13 14:49:33');
INSERT INTO `xmw_international` VALUES ('a6abdcb5-23d7-49de-a3b0-8b2a885c96f2', 'mobile', '5aaeba0a-4891-4bf5-9b09-cffbd8b36a86', '手机登录', 'Mobile Login', '携帯電話の登録', '手機登錄', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-11 17:43:00', '2022-11-30 10:54:08');
INSERT INTO `xmw_international` VALUES ('a9f86639-4d27-46c3-8f6a-bfb59ed1a061', 'required', '5967f54b-a258-4d88-a73b-5f142f16c306', '用户名是必填项！', 'User name is required!', 'ユーザー名は必須!', '用戶名是必填項！', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:56:45', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('aa2710b2-9faf-4369-aee3-ca7700d84e99', 'administrative', 'fd9a9de8-6044-42fc-a128-eba14bea123d', NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:58:23', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('aa940619-140c-4236-94aa-48425b68813e', 'error', '8c5b3043-89c4-4266-b262-9002ad757b4b', '原密码错误!', 'The old password is wrong!', '元パスワードエラーです!', '原密碼錯誤!', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-12 17:02:12', '2023-01-12 17:02:12');
INSERT INTO `xmw_international` VALUES ('adb1f6a2-c43c-4c56-88a8-eaa514dc7ea5', 'tooltip', '96138789-674c-4e00-9de4-6ebda0fab288', '排序越大，位置越靠前', 'The larger the order, the higher the position', '順位が大きいほど上位に位置する', '排序越大，位置越靠前', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 16:14:13', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('adf8c65a-240e-4255-9093-b82bead8bd3c', 'operation', '234ca5d3-d0e3-4525-9d39-e500745ba791', '操作', 'operation', '操作', '操作', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 13:47:57', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('afe8b7aa-7548-4ffd-8425-ec6570605393', 'rules', '8fa4e7ae-addb-4a29-a2f8-0e0a551a7581', '6-12位字符的密码', 'A password of 6 to 12 characters', '6桁から12桁のパスワードです', '6-12位字符的密碼', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-12 17:08:00', '2023-01-12 17:08:00');
INSERT INTO `xmw_international` VALUES ('b0b161a7-ec44-4944-9627-d277732fba43', 'file-siz-limit', '1261dcbe-628a-430b-ab40-89c55015fabb', '图片大小限制在2MB以内!', 'Image size is limited to 2MB!', '画像サイズは2MBまで!', '圖片大小限製在2MB以內!', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-11-23 16:05:03', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('b4886664-cdd0-4108-ac7f-e0758cb14db2', 'captcha', 'a6abdcb5-23d7-49de-a3b0-8b2a885c96f2', '验证码', 'Verification code', 'captcha', '驗證碼', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-11 17:51:18', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('b786f8b1-4111-4fda-b16a-70bc010fe892', 'org_type', '50d475a0-e2b8-4997-8426-a1e067b1db11', '组织类型', 'Organization types', '組織のタイプ', '組織類型', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 17:46:21', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('b7c06dcb-c744-4053-9d30-ae0461c6ed1e', 'confirm', 'cb2edc15-2e6d-4de6-ab92-14cfc727569e', '确认', 'Confirm', '确认', '確認', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-09 14:21:18', '2023-01-09 14:21:18');
INSERT INTO `xmw_international` VALUES ('b8e33966-e98d-4bfe-be52-c226fa675787', 'accountLogin', '44fe6614-f996-4c29-b06b-b41ca15a67f2', NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:53:26', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('bbeca07e-bef0-41e4-8700-116099451757', 'role_name', 'bf652ff9-7210-4fda-9ece-4c7fa3e5ae87', '角色名称', 'Role Name', '役名', '角色名稱', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-30 17:16:27', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('bce03c1b-ba73-495e-90fe-84af1851761e', 'error', '0f5ebfbf-bd14-4b5c-9bf5-67929e36f653', '密码错误', 'Password Error', 'パスワードの誤りです', '密碼錯誤', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-11 18:09:26', '2023-01-11 18:10:59');
INSERT INTO `xmw_international` VALUES ('bdbfee3e-cf52-4162-b2e2-82e0bef2fe35', 'tip', '0c075bb7-805c-47aa-9eff-03a49267a00a', '已绑定手机', 'Bound mobile phone', '携帯電話に結合されています', '已綁定手機', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-13 18:23:16', '2023-01-13 18:23:16');
INSERT INTO `xmw_international` VALUES ('bdcbe983-b255-4a6d-bf83-e5030a31a89f', 'org_name', '50d475a0-e2b8-4997-8426-a1e067b1db11', '组织名称', 'Organization name', '組織名', '組織名稱', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 17:44:13', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('be72ba21-a54c-4799-babc-cc25728275e4', 'email', '5ea52517-8c5e-419d-b59b-a923eb68f50e', '电子邮箱', 'Email', '電子メール', '電子郵箱', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 16:09:09', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('bf2ca4d5-cde9-46d4-930e-12a5aa95a1b6', 'operation-log', '251711b4-6fd3-4090-8a58-9cb67616e508', '操作日志', 'Operation Log', '操作ログ', '操作日誌', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:59:58', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('bf652ff9-7210-4fda-9ece-4c7fa3e5ae87', 'role-management', '251711b4-6fd3-4090-8a58-9cb67616e508', '角色管理', 'Role Management', '役割管理', '角色管理', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-30 17:01:09', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('c297ab65-e191-41d9-8160-0750f849daca', 'LockSleep', '52a9e710-b55c-4ee2-9e51-45bdc91ab118', NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-09 14:12:56', '2023-01-09 14:12:56');
INSERT INTO `xmw_international` VALUES ('c3d9ddc3-4a93-47bf-9977-d99797f8c214', 'motto', '5ea52517-8c5e-419d-b59b-a923eb68f50e', '座右铭', 'Motto', '座右の銘', '座右銘', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 18:02:01', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('c4084914-eece-4a6d-9617-4a9185f1eb1c', 'add', '51738317-f9fc-48e2-9ace-b418fdacf8e3', '新建', 'New', '新築', '新建', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-30 17:08:20', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('c4ac7699-af09-499e-aeb9-6a866609f99f', 'ExitFullScreen', '52a9e710-b55c-4ee2-9e51-45bdc91ab118', '退出全屏', 'ExitFullScreen', '全画面から退出します', '退出全屏', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-03 16:15:58', '2023-01-03 16:15:58');
INSERT INTO `xmw_international` VALUES ('c4d9c21d-f619-48eb-8ceb-537cb064247e', 'internationalization', '48ea12ef-201f-4738-8af8-066533179393', '国际化', 'Internationalization', '国際化', '國際化', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 6, '2022-09-17 11:50:35', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('c6271c0e-277f-4f81-b177-1c62ecc3d493', 'name', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '菜单名称', 'Menu Name', 'メニュー名', '菜單名稱', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 10:13:41', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('c6841f37-4bcd-4c8a-83d1-4b8c592cb62c', 'refresh', '1d0c376a-0d14-4699-ae9f-712696e977b1', '刷新', 'Refresh', '更新', '刷新', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-21 14:54:15', '2023-03-16 15:59:35');
INSERT INTO `xmw_international` VALUES ('c981b32d-1747-4a8b-9747-a604c52bd22b', 'age', '5ea52517-8c5e-419d-b59b-a923eb68f50e', '年龄', 'Age', '年齢', '年齡', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 17:31:56', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('ca93484f-9ac8-4b84-8d50-7821154cf3ea', 'jobs_id', '5ea52517-8c5e-419d-b59b-a923eb68f50e', '所属岗位', 'Their jobs', '所属部署', '所屬崗位', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 14:34:49', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('cb2edc15-2e6d-4de6-ab92-14cfc727569e', 'button', '9d9e17ad-e767-4d9a-9102-1866c2590f74', NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-09 14:20:20', '2023-01-09 14:20:20');
INSERT INTO `xmw_international` VALUES ('ccc0571a-c91b-42e3-aefd-86ac6973c9d9', 'navTheme', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '菜单主题', 'Menu Theme', 'メニューテーマ', '菜單主題', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 18:31:18', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('cd9dfbe3-b910-44be-a5d9-3ad008e61513', 'zh-TW', '5245540c-dfe2-4375-9964-96864b07b6e7', '繁体中文', 'Traditional Chinese', '繁体中国語', '繁體中文', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 14:08:30', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('ceca59e9-005c-42da-83e3-415fac994fac', 'dashboard', 'e8922ec5-d0d2-4911-a146-80c2efdd38b5', '指示面板', 'Dashboard', '指示パネル', '指示面板', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 10, '2022-09-17 10:12:45', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('cf1e2401-7736-493e-9a6a-1b531740add5', 'password', 'c297ab65-e191-41d9-8160-0750f849daca', '密码', 'Password', 'パスワード', '密碼', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-09 14:14:04', '2023-01-09 14:14:04');
INSERT INTO `xmw_international` VALUES ('d293b63b-ea08-42fa-afaa-056d0fcacec6', 'ja-JP', '5245540c-dfe2-4375-9964-96864b07b6e7', '日文', 'Japanese', '日本语', '日文', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 14:07:39', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('d3057a13-f4a2-4fbe-b17b-ace0fb86e44e', 'org_name', '2c90eea9-f0c8-48bb-a331-a9526c59f6a6', '所属组织', 'organisation', '所属する組織', '所屬組織', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-23 14:44:08', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('d3e5c1ea-5e39-4b29-ae36-4c5732256630', 'dir', 'f6136444-211c-4657-b241-b9074ea3a75c', '目录', 'Directory', 'リスト', '目錄', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-28 16:46:29', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('d5faf90d-a327-4f48-8143-a98e7de0783e', 'parent_id', '33f25830-6bdb-4a22-839a-15562e446c3f', '父级', 'Parent', '父級', '父級', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 14:20:19', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('da5a6bac-e8ba-4345-a604-0efcf5b50b2e', 'normal', '899c5dba-3b9e-410e-83ba-cd3207c3c9ca', '正常', 'Normal', '正常', '正常', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 17:48:20', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('daa7e0f8-f7dc-4a14-beae-227108a57041', 'permission', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '权限标识', 'Permission Identify', '権限表示', '權限標識', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 16:05:15', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('dc7e6d26-f9f3-4f37-9ad5-6ee60e1282d1', 'access', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '菜单权限', 'Menu Permissions', 'メニュー けんげん 権限', '菜單權限', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-12-08 15:27:18', '2022-12-08 15:27:18');
INSERT INTO `xmw_international` VALUES ('debf69a6-fd6e-42e6-a29c-fc257574e05f', 'rules', '3f56a8e8-4bc1-4e88-9fdf-4466446be2d8', '两次密码输入不一致！', 'The two passwords are not the same!', 'パスワードの入力が2回一致しません!', '兩次密碼輸入不一致！', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 18:28:38', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('decdc51b-a98a-40c3-a530-3f15d250742c', 'submit', 'cb2edc15-2e6d-4de6-ab92-14cfc727569e', '提交', 'Submit', '提出', '提交', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-12 16:46:25', '2023-01-12 16:46:25');
INSERT INTO `xmw_international` VALUES ('e059910f-1743-421d-9c9b-20061f9683ef', 'api_url', 'bf2ca4d5-cde9-46d4-930e-12a5aa95a1b6', '请求接口', 'Request interface', '要求インターフェースです', '請求接口', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-03-20 15:47:38', '2023-03-20 15:47:38');
INSERT INTO `xmw_international` VALUES ('e241e942-5aa1-41b4-b3e4-5031b1188736', 'title', 'c297ab65-e191-41d9-8160-0750f849daca', '长时间未操作,屏幕已锁定', 'If no operation is performed for a long time, the screen is locked', '長時間操作しておらず、画面がロックされています', '長時間未操作,屏幕已鎖定', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-09 14:19:12', '2023-01-09 14:19:12');
INSERT INTO `xmw_international` VALUES ('e2f610ce-62aa-4272-b950-9ef32095bd5b', 'ip', 'bf2ca4d5-cde9-46d4-930e-12a5aa95a1b6', 'IP', 'IP', 'IP', 'IP', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-03-20 15:45:47', '2023-03-20 15:45:47');
INSERT INTO `xmw_international` VALUES ('e5bbdadf-ead0-40c3-8043-50ba0461cf1c', 'tip', '4faea96a-a6ed-4509-90b4-f398e25f0ee0', '确认要退出系统？', 'Are you sure you want to exit the system?', 'システムをログアウトすることを かくにん 確認 しますか?', '確認要退出系統？', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-12-09 18:12:36', '2022-12-09 18:12:36');
INSERT INTO `xmw_international` VALUES ('e6a37372-6d5c-4bca-a0bf-82f8e0706b10', 'disable', '899c5dba-3b9e-410e-83ba-cd3207c3c9ca', '禁用', 'Disable', '禁止', '禁用', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 17:48:58', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('e8855cce-a0ae-49e8-8e29-3ef874f587bd', 'params', 'bf2ca4d5-cde9-46d4-930e-12a5aa95a1b6', '请求参数', 'Request params', 'パラメータを要求します', '請求參數', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-03-20 15:49:26', '2023-03-20 15:49:26');
INSERT INTO `xmw_international` VALUES ('e8922ec5-d0d2-4911-a146-80c2efdd38b5', 'menu', NULL, NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 10:11:59', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('e8a59f6d-74e5-4b9d-a6ce-4c418c605bc9', 'set-password', '5769baab-d018-4c98-8d60-05a98f46fb15', '设置密码', 'Set Password', 'パスワードを設定する', '設置密碼', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 18:19:03', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('e8bd2b00-56c9-4221-8d34-c69c40ff282e', 'content', '22b09a10-3417-4d53-9aed-b0f43927bb41', '删除后无法恢复，请谨慎操作', 'The deletion cannot be restored. Exercise caution when performing this operation', '削除しても元に戻りませんので、ご注意ください', '刪除後無法恢復，請謹慎操作', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-18 13:43:57', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('e8ca71aa-4c2b-42c2-ac80-63677e1d80d7', 'security-setting', '641f3543-8091-4202-9978-2423a66cb6c9', '安全设置', 'Security Setting', '安全設定です', '安全設置', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-13 17:33:25', '2023-01-13 17:33:25');
INSERT INTO `xmw_international` VALUES ('eb2596dd-d547-4fd8-bf62-958545b87dcf', 'address', '5ea52517-8c5e-419d-b59b-a923eb68f50e', '详细地址', 'Detailed Address', '詳しい住所', '詳細地址', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 17:53:52', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('eb4679cb-8761-42bd-94ed-c49717ad87fc', 'male', '69499142-5a66-4923-b1df-2397ad516149', '男', 'Male', '男', '男', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-10 15:21:25', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('ecb0971d-6ee4-4adc-8531-f479df0ccf13', 'rules', '6ce14350-b984-4405-ab87-ec0826948203', '用户名由4到16位（字母，数字，下划线，减号）组成', 'The user name contains 4 to 16 characters (letters, digits, underscores, and hyphens)', 'ユーザー名は4 ~ 16桁(アルファベット、数字、アンダーライン、マイナス)からなる', '用戶名由4到16位（字母，數字，下劃線，減號）組成', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-10 14:29:24', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('ed2bf05a-70a1-419a-adf3-b747d449f75a', 'dashboard', 'fd9a9de8-6044-42fc-a128-eba14bea123d', NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:57:56', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('ee435be2-a0a5-44a3-9a00-38708661b995', 'phone', 'a6abdcb5-23d7-49de-a3b0-8b2a885c96f2', '手机号', 'Mobile phone no', '携帯電話番号', '手機號', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-11 17:44:58', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('f2652f3b-b5bf-4397-b7aa-e15761b72b04', 'edit', '505ca506-6cdc-4c88-b24b-479d6456bbde', '编辑', 'Edit', '編集', '編輯', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 14:04:19', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('f49d670d-e00c-409c-bdf7-0088a367bb39', 'edit', '51738317-f9fc-48e2-9ace-b418fdacf8e3', '编辑', 'Edit', '編集', '編輯', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-30 17:07:25', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('f57f3b34-55f7-4aeb-9491-1dfc24a1327d', 'strong', '5964805c-222d-4412-8abc-c8ce93e7e97c', '强', 'Strong', 'ベスト', '強', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-12 18:12:48', '2023-01-12 18:12:48');
INSERT INTO `xmw_international` VALUES ('f5b542a1-a8a2-4900-9e98-0519e7654d9a', 'set-avatar', '5769baab-d018-4c98-8d60-05a98f46fb15', '设置头像', 'Set Avatar', 'プロフィール画像を設定します', '設置頭像', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-09 14:38:31', '2023-01-13 15:26:38');
INSERT INTO `xmw_international` VALUES ('f6136444-211c-4657-b241-b9074ea3a75c', 'menu_type', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '菜单类型', 'Menu Type', 'メニュータイプ', '菜單類型', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 11:02:24', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('f6a62672-85eb-4030-a079-bea938629568', 'city', '5ea52517-8c5e-419d-b59b-a923eb68f50e', '所属城市', 'City', '所属する都市', '所屬城市', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 17:41:21', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('f6c12984-b6ce-42ae-8072-11f7235b8450', 'required', '5f4057a8-db52-42c4-a4ca-5ca7761169e8', '密码是必填项！', 'Password is required!', 'パスワードは必須!', '密碼是必填項！', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:57:42', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('f6c475f1-fb20-4be9-a54d-b865644b087d', 'close', '1d0c376a-0d14-4699-ae9f-712696e977b1', '至少要保留一个窗口', 'Keep at least one window', '少なくとも1つは窓口を確保する', '至少要保留一個窗口', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-03-16 15:59:51', '2023-03-16 16:02:32');
INSERT INTO `xmw_international` VALUES ('f9e5a8db-da13-435f-a0e8-2bf9da2695c9', 'delete', 'fdaf8a23-8777-46ff-9142-f30eb3e4d8ee', '删除', 'Delete', '削除', '刪除', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-30 10:44:24', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('fad1bb10-a5d5-4497-aad9-53a0672a405f', 'very-strong', '5964805c-222d-4412-8abc-c8ce93e7e97c', '非常强', 'Very Strong', 'とても強いです', '非常強', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2023-01-12 18:13:30', '2023-01-12 18:13:30');
INSERT INTO `xmw_international` VALUES ('faeb561b-07ae-44a1-955f-437e72c2c65e', 'errorMessage', 'b8e33966-e98d-4bfe-be52-c226fa675787', '错误的用户名和密码(admin/ant.design)', 'Account Password Login', '誤ったidとパスワード(admin/ant.design)', '錯誤的用戶名和密碼(admin/ant.design)', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:53:53', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('fbe2e5d9-4707-4964-b6af-3521dbb586fb', 'headerRender', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '显示顶栏', 'According to the top bar', 'トップバーを表示する', '顯示頂欄', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 18:14:57', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('fd9a9de8-6044-42fc-a128-eba14bea123d', 'pages', NULL, NULL, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-17 11:52:43', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('fdaf8a23-8777-46ff-9142-f30eb3e4d8ee', 'organization', '0960fd86-7e79-496b-83aa-c4159e516d8c', '组织管理', 'Organization Management', '組織マネジメント', '組織管理', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 10, '2022-09-17 11:49:05', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('fe2307ed-fbba-415a-832a-a62ac3d59ed1', 'en_name', '5ea52517-8c5e-419d-b59b-a923eb68f50e', '英文名', 'En Name', '英語名', '英文名', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-10-08 14:15:09', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('fef753d1-25cb-4f3a-ba19-f506497c7a82', 'flatMenu', '1d9ddc96-9292-4f08-a359-0c1384ff5802', '子项往上提', 'The subterms go up', '子項を上にあげる', '子項往上提', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 18:18:42', '2022-11-30 10:54:09');
INSERT INTO `xmw_international` VALUES ('ff064818-b4c5-4b0b-9b4f-47c2e3fd33cb', 'tooltip', '70e7e9a0-159c-497d-8e68-a5308b84b675', '只在路劲为 URL 时生效', 'This parameter is valid only when the road jin is a URL', 'ロードパワーがURLの場合のみ有効', '只在路勁為 URL 時生效', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, '2022-09-27 16:21:07', '2022-11-30 10:54:09');

-- ----------------------------
-- Table structure for xmw_jobs
-- ----------------------------
DROP TABLE IF EXISTS `xmw_jobs`;
CREATE TABLE `xmw_jobs`  (
  `jobs_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '岗位id',
  `jobs_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '岗位名称',
  `org_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组织id',
  `parent_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '父级id',
  `describe` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '岗位描述',
  `sort` int NOT NULL COMMENT '排序',
  `leader` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '岗位负责人',
  `founder` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '创建人',
  `created_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次更新时间',
  PRIMARY KEY (`jobs_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xmw_jobs
-- ----------------------------
INSERT INTO `xmw_jobs` VALUES ('046aeaa4-f707-4981-8a30-6e4a8488eb52', '研发工程师', '79581210-60b7-4c66-b6ae-14b013c3661e', NULL, '研发工程师', 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2022-09-23 15:43:47', '2022-12-01 17:19:24');
INSERT INTO `xmw_jobs` VALUES ('1c5f752a-3482-4849-aff0-a6742c96bead', '运维工程师', '79a4a0d6-776a-4d82-a884-57c2b59e7e94', NULL, '运维工程师', 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2022-11-09 13:56:20', '2022-12-01 17:19:24');
INSERT INTO `xmw_jobs` VALUES ('236ac4ed-6b07-4172-bb05-9986cf976045', '中级设计师', 'bb074cdc-4aa2-42e4-a200-64bf83ed4ed5', 'ab7aabc3-7053-47bf-a6cf-75983c3b108b', '中级', 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2022-09-23 15:42:51', '2022-12-01 17:19:24');
INSERT INTO `xmw_jobs` VALUES ('6c93e5f3-f4e9-43be-9b00-9ba69677a2c2', '前端开发', 'f107862c-30bf-45cb-9957-5b5429e0ff20', '046aeaa4-f707-4981-8a30-6e4a8488eb52', '前端开发', 2, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2022-09-23 15:44:02', '2022-12-01 17:19:24');
INSERT INTO `xmw_jobs` VALUES ('71c3f4a3-ceb1-4644-b2c1-d1f872259cc3', '初级设计师', 'f107862c-30bf-45cb-9957-5b5429e0ff20', 'ab7aabc3-7053-47bf-a6cf-75983c3b108b', '初级', 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2022-09-23 15:42:33', '2022-12-01 17:19:24');
INSERT INTO `xmw_jobs` VALUES ('947ecd59-230f-420e-a4f9-fc561b9a5fa4', '产品经理', '9e0d462d-5254-41ba-b8f3-982a7cf588f0', NULL, '负责提高产品的用户体验', 1, '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2022-12-01 18:11:51', '2023-01-10 17:26:27');
INSERT INTO `xmw_jobs` VALUES ('ab7aabc3-7053-47bf-a6cf-75983c3b108b', 'UI 设计师', '79581210-60b7-4c66-b6ae-14b013c3661e', NULL, '“UI”的本义是用户界面，是英文User和interface的缩写。UI设计师简称UID（User Interface Designer），指从事对软件的人机交互、操作逻辑、界面美观的整体设计工作的人。', 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2022-09-23 15:42:06', '2022-12-01 17:19:24');
INSERT INTO `xmw_jobs` VALUES ('bfc580bd-bd03-46e4-92e6-71c804a1a237', '高级设计师', '79581210-60b7-4c66-b6ae-14b013c3661e', 'ab7aabc3-7053-47bf-a6cf-75983c3b108b', '高级', 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2022-09-23 15:43:32', '2022-12-01 17:19:24');
INSERT INTO `xmw_jobs` VALUES ('eab6c26a-4b2a-4aba-b95f-7f431600a03d', 'java 开发', 'f107862c-30bf-45cb-9957-5b5429e0ff20', '046aeaa4-f707-4981-8a30-6e4a8488eb52', 'java 开发', 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '2022-09-23 15:44:14', '2022-12-01 17:19:24');

-- ----------------------------
-- Table structure for xmw_logs
-- ----------------------------
DROP TABLE IF EXISTS `xmw_logs`;
CREATE TABLE `xmw_logs`  (
  `log_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '日志id',
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '用户id',
  `content` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '日志内容',
  `ip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'ip',
  `path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '前端路由',
  `user_agent` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '代理',
  `params` json NOT NULL COMMENT '请求参数',
  `method` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '请求方式',
  `api_url` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '请求地址',
  `created_time` datetime NOT NULL,
  `updated_time` datetime NOT NULL,
  PRIMARY KEY (`log_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of xmw_logs
-- ----------------------------
INSERT INTO `xmw_logs` VALUES ('1040ca32-e2a0-465e-80c3-7a30c6163a86', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '创建国际化：certified', '::ffff:127.0.0.1', 'http://localhost:8001/system/internationalization', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36', '{\"name\": \"certified\", \"sort\": 1, \"en-US\": \"Certified\", \"ja-JP\": \"認証済みです\", \"zh-CN\": \"已认证\", \"zh-TW\": \"已認證\", \"parent_id\": \"0a8078ee-a632-4dd8-a943-624541391743\"}', 'POST', '/v1/system/international', '2023-03-20 17:19:05', '2023-03-20 17:19:05');
INSERT INTO `xmw_logs` VALUES ('13a21123-8073-4607-8669-c548b53b2367', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '创建国际化：content', '::ffff:127.0.0.1', 'http://localhost:8001/system/internationalization', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36', '{\"name\": \"content\", \"sort\": 1, \"en-US\": \"Operation content\", \"ja-JP\": \"作業内容です\", \"zh-CN\": \"操作内容\", \"zh-TW\": \"操作內容\", \"parent_id\": \"bf2ca4d5-cde9-46d4-930e-12a5aa95a1b6\"}', 'POST', '/v1/system/international', '2023-03-20 15:44:54', '2023-03-20 15:44:54');
INSERT INTO `xmw_logs` VALUES ('27a688b5-0352-460d-9460-e569de351478', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '账户登录', '::ffff:127.0.0.1', 'http://localhost:8002/user/login?redirect=%2F', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36', '{\"type\": \"account\", \"password\": \"IqDDrMKzGqHgIOW7ya8cMQ==\", \"user_name\": \"admin\", \"verifyCode\": \"16\"}', 'POST', '/v1/auth/login', '2023-04-13 20:27:23', '2023-04-13 20:27:23');
INSERT INTO `xmw_logs` VALUES ('2c07fcfb-578b-46ea-a946-0a72ca6398b0', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '账户登录', '::ffff:127.0.0.1', 'http://localhost:8002/user/login?redirect=%2Fadministrative%2Forganization', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36', '{\"type\": \"account\", \"password\": \"IqDDrMKzGqHgIOW7ya8cMQ==\", \"user_name\": \"admin\", \"verifyCode\": \"8\"}', 'POST', '/v1/auth/login', '2023-04-13 20:36:59', '2023-04-13 20:36:59');
INSERT INTO `xmw_logs` VALUES ('46f58834-89fa-4078-89a2-aff598717bc9', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '创建国际化：user_agent', '::ffff:127.0.0.1', 'http://localhost:8001/system/internationalization', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36', '{\"name\": \"user_agent\", \"sort\": 1, \"en-US\": \"Agent\", \"ja-JP\": \"代理\", \"zh-CN\": \"代理\", \"zh-TW\": \"代理\", \"parent_id\": \"bf2ca4d5-cde9-46d4-930e-12a5aa95a1b6\"}', 'POST', '/v1/system/international', '2023-03-20 15:50:08', '2023-03-20 15:50:08');
INSERT INTO `xmw_logs` VALUES ('4869cf0f-fb97-4e24-b93a-618507f64b81', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '创建国际化：ip', '::ffff:127.0.0.1', 'http://localhost:8001/system/internationalization', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36', '{\"name\": \"ip\", \"sort\": 1, \"en-US\": \"IP\", \"ja-JP\": \"IP\", \"zh-CN\": \"IP\", \"zh-TW\": \"IP\", \"parent_id\": \"bf2ca4d5-cde9-46d4-930e-12a5aa95a1b6\"}', 'POST', '/v1/system/international', '2023-03-20 15:45:47', '2023-03-20 15:45:47');
INSERT INTO `xmw_logs` VALUES ('506bb3bc-4ca1-44c8-85e1-513236142d0e', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '创建国际化：path', '::ffff:127.0.0.1', 'http://localhost:8001/system/internationalization', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36', '{\"name\": \"path\", \"sort\": 1, \"en-US\": \"Path\", \"ja-JP\": \"共有\", \"zh-CN\": \"路由\", \"zh-TW\": \"路由\", \"parent_id\": \"bf2ca4d5-cde9-46d4-930e-12a5aa95a1b6\"}', 'POST', '/v1/system/international', '2023-03-20 15:46:39', '2023-03-20 15:46:39');
INSERT INTO `xmw_logs` VALUES ('5a85aebe-6edc-4124-b358-a627e3068644', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '创建国际化：api_url', '::ffff:127.0.0.1', 'http://localhost:8001/system/internationalization', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36', '{\"name\": \"api_url\", \"sort\": 1, \"en-US\": \"Request interface\", \"ja-JP\": \"要求インターフェースです\", \"zh-CN\": \"请求接口\", \"zh-TW\": \"請求接口\", \"parent_id\": \"bf2ca4d5-cde9-46d4-930e-12a5aa95a1b6\"}', 'POST', '/v1/system/international', '2023-03-20 15:47:38', '2023-03-20 15:47:38');
INSERT INTO `xmw_logs` VALUES ('66922ab6-2b42-408f-82ad-5c974dbfd919', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '创建国际化：method', '::ffff:127.0.0.1', 'http://localhost:8001/system/internationalization', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36', '{\"name\": \"method\", \"sort\": 1, \"en-US\": \"Request method\", \"ja-JP\": \"請求方法です\", \"zh-CN\": \"请求方式\", \"zh-TW\": \"請求方式\", \"parent_id\": \"bf2ca4d5-cde9-46d4-930e-12a5aa95a1b6\"}', 'POST', '/v1/system/international', '2023-03-20 15:48:39', '2023-03-20 15:48:39');
INSERT INTO `xmw_logs` VALUES ('71e2f17a-e2ab-44c0-9e96-4998cd69a9d7', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '创建国际化：params', '::ffff:127.0.0.1', 'http://localhost:8001/system/internationalization', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36', '{\"name\": \"params\", \"sort\": 1, \"en-US\": \"Request params\", \"ja-JP\": \"パラメータを要求します\", \"zh-CN\": \"请求参数\", \"zh-TW\": \"請求參數\", \"parent_id\": \"bf2ca4d5-cde9-46d4-930e-12a5aa95a1b6\"}', 'POST', '/v1/system/international', '2023-03-20 15:49:26', '2023-03-20 15:49:26');
INSERT INTO `xmw_logs` VALUES ('85429393-bccb-4d59-b39e-12a5c543080b', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '创建组织：字节跳动', '::ffff:127.0.0.1', 'http://localhost:8001/administrative/organization', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36', '{\"sort\": 1, \"leader\": \"bf75a509-f90e-4a29-8bf7-470b581550f6\", \"status\": 1, \"describe\": \"北京字节跳动科技有限公司，成立于2012年3月，是北京的一家信息科技公司。2021年全年的营业收入约为580亿美元， [93]  地址位于北京市海淀区知春路甲48号 [1]  。公司以建设“全球创作与交流平台”为愿景 [2]  。字节跳动的全球化布局始于2015年 [3]  ，“技术出海”是字节跳动全球化发展的核心战略 [4]  ，其旗下产品有今日头条、西瓜视频、抖音、头条百科、皮皮虾、懂车帝、悟\", \"org_code\": \"ZJTD888\", \"org_name\": \"字节跳动\", \"org_type\": \"company\"}', 'POST', '/v1/administrative/organization', '2023-03-20 15:41:00', '2023-03-20 15:41:00');
INSERT INTO `xmw_logs` VALUES ('95f81e4f-874a-4ea4-ada4-19c61c08b298', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '账户登录', '::ffff:127.0.0.1', 'http://localhost:8002/user/login', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36', '{\"type\": \"account\", \"password\": \"IqDDrMKzGqHgIOW7ya8cMQ==\", \"user_name\": \"admin\", \"verifyCode\": \"9\"}', 'POST', '/v1/auth/login', '2023-04-12 18:00:04', '2023-04-12 18:00:04');
INSERT INTO `xmw_logs` VALUES ('cc585b63-5028-4fbb-b0f2-181e7ea01ea7', 'bf75a509-f90e-4a29-8bf7-470b581550f6', '创建国际化：certification-realName', '::ffff:127.0.0.1', 'http://localhost:8001/system/internationalization', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36', '{\"name\": \"certification-realName\", \"sort\": 1, \"en-US\": \"Real-name authentication\", \"ja-JP\": \"実名認証です\", \"zh-CN\": \"实名认证\", \"zh-TW\": \"實名認證\", \"parent_id\": \"e8ca71aa-4c2b-42c2-ac80-63677e1d80d7\"}', 'POST', '/v1/system/international', '2023-03-20 17:12:55', '2023-03-20 17:12:55');

-- ----------------------------
-- Table structure for xmw_menu
-- ----------------------------
DROP TABLE IF EXISTS `xmw_menu`;
CREATE TABLE `xmw_menu`  (
  `menu_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '菜单id',
  `name` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '国际化对应的name',
  `menu_type` enum('dir','menu','button') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜单类型（dir:目录，menu:菜单,button:按钮）',
  `path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '路由url',
  `icon` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `component` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单对应的文件路径',
  `redirect` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '路由重定向地址',
  `parent_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '父级id',
  `target` enum('_blank','_self','_parent','_top') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '当path是一个url，点击新窗口打开',
  `permission` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单标识(页面按钮权限控制)',
  `layout` enum('side','top','mix') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '是否显示layout布局（side:侧边菜单，top:顶部菜单,mix:混合菜单）',
  `navTheme` enum('dark','light') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '导航菜单的主题（dark:暗黑风格，light:亮色风格）',
  `headerTheme` enum('dark','light') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '顶部导航的主题，mix 模式生效（dark:暗黑风格，light:亮色风格）',
  `hideChildrenInMenu` int NULL DEFAULT NULL COMMENT '是否隐藏子路由',
  `hideInMenu` int NULL DEFAULT NULL COMMENT '是否隐藏菜单，包括子路由',
  `hideInBreadcrumb` int NULL DEFAULT NULL COMMENT '是否在面包屑中隐藏',
  `headerRender` int NULL DEFAULT NULL COMMENT '是否显示顶栏',
  `footerRender` int NULL DEFAULT NULL COMMENT '是否显示页脚',
  `menuRender` int NULL DEFAULT NULL COMMENT '当前路由是否展示菜单',
  `menuHeaderRender` int NULL DEFAULT NULL COMMENT '当前路由是否展示菜单顶栏',
  `flatMenu` int NULL DEFAULT NULL COMMENT '子项往上提，只是不展示父菜单',
  `fixedHeader` int NULL DEFAULT NULL COMMENT '固定顶栏',
  `fixSiderbar` int NULL DEFAULT NULL COMMENT '固定菜单',
  `founder` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '创建人',
  `sort` int NOT NULL COMMENT '排序',
  `status` int NOT NULL COMMENT '菜单状态（0:禁用，1：正常）',
  `created_time` datetime NOT NULL,
  `updated_time` datetime NOT NULL,
  PRIMARY KEY (`menu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xmw_menu
-- ----------------------------
INSERT INTO `xmw_menu` VALUES ('00d37222-d6b6-43ab-a459-b15610fdcbf3', '4e17740d-5947-47cf-971c-fcadecbec940', 'button', NULL, NULL, NULL, NULL, '562d45f9-e8ca-4ca4-8862-b9a44a3443cd', NULL, 'system:menu-management:edit', NULL, NULL, NULL, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2022-10-27 16:55:28', '2022-10-27 16:55:28');
INSERT INTO `xmw_menu` VALUES ('062fada5-41b0-4a90-8632-49ef932ed354', '85501869-1929-406b-9084-e9cd709d21cc', 'button', NULL, NULL, NULL, NULL, '1acff778-5508-4724-b3a6-44b26396fd9e', NULL, 'system:internationalization:add', NULL, NULL, NULL, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2022-10-27 16:58:29', '2022-10-27 16:58:29');
INSERT INTO `xmw_menu` VALUES ('12373f1b-ae2a-48e7-ac06-ad4f15bb4975', 'ceca59e9-005c-42da-83e3-415fac994fac', 'dir', '/dashboard', 'icon-dashboard', NULL, NULL, NULL, NULL, 'dashboard', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1, 1, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 99, 1, '2022-10-27 15:42:56', '2022-11-09 10:21:42');
INSERT INTO `xmw_menu` VALUES ('1360556e-3106-48aa-a030-90edfd7073ea', '3b260bca-826a-4667-b1da-90bb185b8a61', 'button', NULL, NULL, NULL, NULL, 'dd8304e6-09e5-4fa8-8e56-bbefd4e69c0c', NULL, 'administrative:organization:add', NULL, NULL, NULL, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2022-10-27 16:37:44', '2022-10-27 16:37:44');
INSERT INTO `xmw_menu` VALUES ('17911862-bce9-4264-b541-7ee1d2c7ec13', '16ebb546-7843-465e-ab0f-214bf24d0f79', 'button', NULL, NULL, NULL, NULL, '7d221117-ec0b-407c-b0e3-af6372ac46cc', NULL, 'system:user-management:add', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1, 1, NULL, NULL, NULL, '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 1, 1, '2022-12-05 17:12:56', '2022-12-05 17:12:56');
INSERT INTO `xmw_menu` VALUES ('1acff778-5508-4724-b3a6-44b26396fd9e', 'c4d9c21d-f619-48eb-8ceb-537cb064247e', 'menu', '/system/internationalization', 'icon-internationalization', './System/Internationalization', NULL, 'adbc5cd2-b238-45b5-91a5-48324e8ae96b', '_blank', 'system:internationalization', 'side', 'light', 'light', 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 44, 1, '2022-10-27 16:57:08', '2022-10-27 16:57:08');
INSERT INTO `xmw_menu` VALUES ('22b1d1f4-2543-4fa9-8d45-c04d9d239c04', 'f2652f3b-b5bf-4397-b7aa-e15761b72b04', 'button', NULL, NULL, NULL, NULL, '7d221117-ec0b-407c-b0e3-af6372ac46cc', NULL, 'system:user-management:edit', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1, 1, NULL, NULL, NULL, '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 1, 1, '2022-12-05 17:12:25', '2022-12-05 17:12:25');
INSERT INTO `xmw_menu` VALUES ('255bcf4c-cfbd-4253-9c2d-0b03805e3ff0', '22a98b3b-704e-4de2-8c90-34c2a1387f68', 'dir', '/personal-center', 'icon-personal-center', NULL, NULL, NULL, NULL, 'personal-center', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1, 1, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 77, 1, '2023-01-12 15:28:35', '2023-01-12 15:28:35');
INSERT INTO `xmw_menu` VALUES ('27d31604-2266-4eea-ab61-5577c62df04f', '4ba5a363-c16e-4f8e-abbd-8d653066aa0d', 'menu', '/administrative/structure', 'icon-structure', './Administrative/Structure', NULL, 'ce451a62-2ac4-44de-8202-cd8b0a702840', '_blank', 'administrative:structure', 'side', 'light', 'light', 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2022-12-29 16:13:24', '2022-12-29 16:13:24');
INSERT INTO `xmw_menu` VALUES ('2e1d74aa-2356-4b26-8488-7c337ae306cc', '0ed7bafd-c469-4792-9698-05e03152ad9d', 'button', NULL, NULL, NULL, NULL, '6628e05a-876b-4fa1-80df-95f8becf5f7a', NULL, 'administrative:jobs-management:delete', NULL, NULL, NULL, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2022-10-27 16:50:34', '2022-10-27 16:50:34');
INSERT INTO `xmw_menu` VALUES ('3787908c-3fcc-415f-83a9-a9f3701269ef', '47eba309-b9b8-4943-9e6c-cf2296e41214', 'button', NULL, NULL, NULL, NULL, '6628e05a-876b-4fa1-80df-95f8becf5f7a', NULL, 'administrative:jobs-management:add', NULL, NULL, NULL, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2022-10-27 16:50:49', '2022-10-27 16:50:49');
INSERT INTO `xmw_menu` VALUES ('38788fd7-fcc2-4d0d-85ec-016bf5a90520', '80bc7545-1e34-4a39-a37a-b07ca74943b5', 'button', NULL, NULL, NULL, NULL, '562d45f9-e8ca-4ca4-8862-b9a44a3443cd', NULL, 'system:menu-management:add-child', NULL, NULL, NULL, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2022-10-27 16:54:58', '2022-10-27 16:54:58');
INSERT INTO `xmw_menu` VALUES ('40861c40-fa06-4675-bfc7-f9fd2f7d175f', '0960fd86-7e79-496b-83aa-c4159e516d8c', 'menu', '/administrative', NULL, NULL, '/administrative/organization', 'ce451a62-2ac4-44de-8202-cd8b0a702840', '_blank', NULL, 'side', 'light', 'light', 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 88, 1, '2022-10-27 16:31:29', '2022-10-27 16:31:40');
INSERT INTO `xmw_menu` VALUES ('4e70171f-a946-47e8-a471-d8cabd04c264', '51738317-f9fc-48e2-9ace-b418fdacf8e3', 'menu', '/system/role-management', 'icon-role-management', './System/RoleManagement', NULL, 'adbc5cd2-b238-45b5-91a5-48324e8ae96b', '_blank', 'system:role-management', 'side', 'light', 'light', 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 55, 1, '2022-12-05 17:13:55', '2022-12-08 09:24:55');
INSERT INTO `xmw_menu` VALUES ('53c62f3b-612d-4bd3-be2e-29d6c5998b0f', 'ceca59e9-005c-42da-83e3-415fac994fac', 'menu', '/dashboard', NULL, NULL, '/dashboard/work-bench', '12373f1b-ae2a-48e7-ac06-ad4f15bb4975', '_blank', NULL, 'side', 'light', 'light', 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 99, 1, '2022-10-27 15:44:53', '2022-10-27 16:31:53');
INSERT INTO `xmw_menu` VALUES ('562d45f9-e8ca-4ca4-8862-b9a44a3443cd', '32b547e4-e6a1-49bb-b801-cd377185ab43', 'menu', '/system/menu-management', 'icon-menu-management', './System/MenuManagement', NULL, 'adbc5cd2-b238-45b5-91a5-48324e8ae96b', '_blank', 'system:menu-management', 'side', 'light', 'light', 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 66, 1, '2022-10-27 16:54:33', '2022-10-27 16:54:33');
INSERT INTO `xmw_menu` VALUES ('59a27556-69e9-4ecf-879f-fdd943fd190c', '630b29a5-77d0-4c50-867c-226227ce6fd5', 'button', NULL, NULL, NULL, NULL, 'dd8304e6-09e5-4fa8-8e56-bbefd4e69c0c', NULL, 'administrative:organization:add-child', NULL, NULL, NULL, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2022-10-27 16:35:24', '2022-10-27 16:35:24');
INSERT INTO `xmw_menu` VALUES ('5bb63c89-e82a-4431-b80b-5c4e332a312e', '44182887-f08b-45b3-9291-5dfd4506a804', 'menu', '/dashboard/work-bench', 'icon-work-bench', './Dashboard/Workbench', NULL, '12373f1b-ae2a-48e7-ac06-ad4f15bb4975', '_blank', 'dashboard:work-bench', 'side', 'light', 'light', 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2022-10-27 15:46:32', '2022-10-27 15:46:32');
INSERT INTO `xmw_menu` VALUES ('5c33c1f0-eb05-4773-a61f-7bc773d4633a', '22a98b3b-704e-4de2-8c90-34c2a1387f68', 'menu', '/personal-center', NULL, NULL, '/personal-center/personal-information', '255bcf4c-cfbd-4253-9c2d-0b03805e3ff0', '_blank', NULL, 'side', 'light', 'light', 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 99, 1, '2023-01-12 15:30:42', '2023-01-12 15:30:42');
INSERT INTO `xmw_menu` VALUES ('6628e05a-876b-4fa1-80df-95f8becf5f7a', '9d8cdcd5-2151-43fe-8230-3ae610a9b3e3', 'menu', '/administrative/jobs-management', 'icon-jobs-management', './Aministrative/JobsManagement', NULL, 'ce451a62-2ac4-44de-8202-cd8b0a702840', '_blank', 'administrative:jobs-management', 'top', 'dark', 'dark', 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 66, 1, '2022-10-27 16:48:37', '2022-12-28 11:13:50');
INSERT INTO `xmw_menu` VALUES ('7688d4a8-7214-446e-96d7-b65088af0dbb', '08748ffe-5d33-4406-b786-cf61e3205a90', 'button', NULL, NULL, NULL, NULL, '4e70171f-a946-47e8-a471-d8cabd04c264', NULL, 'system:role-management:delete', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1, 1, NULL, NULL, NULL, '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 1, 1, '2022-12-05 17:14:32', '2022-12-05 17:14:32');
INSERT INTO `xmw_menu` VALUES ('7d221117-ec0b-407c-b0e3-af6372ac46cc', '505ca506-6cdc-4c88-b24b-479d6456bbde', 'menu', '/system/user-management', 'icon-user-management', './System/UserManagement', NULL, 'adbc5cd2-b238-45b5-91a5-48324e8ae96b', '_blank', 'system:user-management', 'top', 'dark', 'light', 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 88, 1, '2022-12-05 17:11:13', '2022-12-05 17:11:13');
INSERT INTO `xmw_menu` VALUES ('81abb19d-51f6-4256-a3d3-ed13a8cbd259', '0ca938ac-db88-4b99-8863-5bb3ae8a094c', 'menu', '/personal-center/personal-information', 'icon-personal-information', './PersonalCenter/PersonalInformation', NULL, '255bcf4c-cfbd-4253-9c2d-0b03805e3ff0', '_blank', 'personal-center:personal-information', 'side', 'light', 'light', 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 88, 1, '2023-01-12 15:32:11', '2023-01-12 15:34:27');
INSERT INTO `xmw_menu` VALUES ('81c3b5d3-6715-49d2-a7b1-b4e3ba6b3732', '1645fb99-80fa-45e5-a075-8296479afb6b', 'button', NULL, NULL, NULL, NULL, '1acff778-5508-4724-b3a6-44b26396fd9e', NULL, 'system:internationalization:edit', NULL, NULL, NULL, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2022-10-27 16:57:51', '2022-10-27 16:57:51');
INSERT INTO `xmw_menu` VALUES ('81d6e4a1-68e5-4b4e-bf3b-851a7adc2e03', '85eb76fb-5f11-45cb-85b5-ef8afa2ccf15', 'button', NULL, NULL, NULL, NULL, '6628e05a-876b-4fa1-80df-95f8becf5f7a', NULL, 'administrative:jobs-management:add-child', NULL, NULL, NULL, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2022-10-27 16:49:25', '2022-10-27 16:49:25');
INSERT INTO `xmw_menu` VALUES ('84baadf6-e32c-4b90-8537-353dc9b25adc', 'f49d670d-e00c-409c-bdf7-0088a367bb39', 'button', NULL, NULL, NULL, NULL, '4e70171f-a946-47e8-a471-d8cabd04c264', NULL, 'system:role-management:edit', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1, 1, NULL, NULL, NULL, '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 1, 1, '2022-12-05 17:14:19', '2022-12-05 17:14:19');
INSERT INTO `xmw_menu` VALUES ('88e28d3c-b444-4e08-ba6b-290aea688344', '48ea12ef-201f-4738-8af8-066533179393', 'menu', '/system', NULL, NULL, '/system/user-management', 'adbc5cd2-b238-45b5-91a5-48324e8ae96b', '_blank', NULL, 'side', 'light', 'light', 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 99, 1, '2022-10-27 16:53:30', '2022-12-08 09:53:01');
INSERT INTO `xmw_menu` VALUES ('981f9c37-8775-458a-983f-23e775eae472', '92e1670f-3d65-49a3-8b65-cffe529ad03e', 'button', NULL, NULL, NULL, NULL, '6628e05a-876b-4fa1-80df-95f8becf5f7a', NULL, 'administrative:jobs-management:edit', NULL, NULL, NULL, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2022-10-27 16:50:16', '2022-10-27 16:50:16');
INSERT INTO `xmw_menu` VALUES ('adbc5cd2-b238-45b5-91a5-48324e8ae96b', '48ea12ef-201f-4738-8af8-066533179393', 'dir', '/system', 'icon-system', NULL, NULL, NULL, NULL, 'system', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1, 1, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 66, 1, '2022-10-27 16:52:54', '2023-01-12 15:27:19');
INSERT INTO `xmw_menu` VALUES ('b074dbaa-03d5-4897-8d05-99f72969efd7', '3d280731-629d-449f-ba6c-ecd6f8a1617c', 'menu', '/personal-center/personal-setting', 'icon-personal-setting', './PersonalCenter/PersonalSetting', NULL, '255bcf4c-cfbd-4253-9c2d-0b03805e3ff0', '_blank', 'personal-center:personal-setting', 'side', 'light', 'light', 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 77, 1, '2023-01-12 15:32:56', '2023-01-12 15:34:35');
INSERT INTO `xmw_menu` VALUES ('b1945758-403e-4d90-a096-312b2b424ff3', 'a3e5683c-c551-4f47-aa6e-15c64b69e01d', 'menu', '/system/operation-log', 'icon-operation-log', './System/OperationLog', NULL, 'adbc5cd2-b238-45b5-91a5-48324e8ae96b', '_blank', 'system:operation-log', 'side', 'light', 'light', 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2023-03-17 16:38:17', '2023-03-17 16:50:37');
INSERT INTO `xmw_menu` VALUES ('b6b55595-9929-4036-bcd3-b6016a642f25', '2abb3cf1-a8a5-4979-bc8f-0d6ca312e362', 'button', NULL, NULL, NULL, NULL, '7d221117-ec0b-407c-b0e3-af6372ac46cc', NULL, 'system:user-management:delete', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1, 1, NULL, NULL, NULL, '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 1, 1, '2022-12-05 17:12:43', '2022-12-05 17:12:43');
INSERT INTO `xmw_menu` VALUES ('c1a6ef88-72b0-4ddd-8179-85f7f9dc9294', 'c4084914-eece-4a6d-9617-4a9185f1eb1c', 'button', NULL, NULL, NULL, NULL, '4e70171f-a946-47e8-a471-d8cabd04c264', NULL, 'system:role-management:add', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1, 1, NULL, NULL, NULL, '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 1, 1, '2022-12-05 17:14:44', '2022-12-05 17:14:44');
INSERT INTO `xmw_menu` VALUES ('ce451a62-2ac4-44de-8202-cd8b0a702840', '0960fd86-7e79-496b-83aa-c4159e516d8c', 'dir', '/administrative', 'icon-administrative', NULL, NULL, NULL, NULL, 'administrative', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1, 1, NULL, NULL, NULL, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 88, 1, '2022-10-27 16:30:36', '2022-10-27 16:52:19');
INSERT INTO `xmw_menu` VALUES ('d518e1bd-7440-4e15-b509-23353aec3205', 'f9e5a8db-da13-435f-a0e8-2bf9da2695c9', 'button', NULL, NULL, NULL, NULL, 'dd8304e6-09e5-4fa8-8e56-bbefd4e69c0c', NULL, 'administrative:organization:delete', NULL, NULL, NULL, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2022-10-27 16:37:34', '2022-10-27 16:37:34');
INSERT INTO `xmw_menu` VALUES ('d6cdf288-0d59-4da8-a270-a5a49006154b', 'a54c782b-b087-4aa1-a56e-7fc4aec746a9', 'button', NULL, NULL, NULL, NULL, 'dd8304e6-09e5-4fa8-8e56-bbefd4e69c0c', NULL, 'administrative:organization:edit', NULL, NULL, NULL, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2022-10-27 16:35:54', '2022-10-27 16:35:54');
INSERT INTO `xmw_menu` VALUES ('dd8304e6-09e5-4fa8-8e56-bbefd4e69c0c', 'fdaf8a23-8777-46ff-9142-f30eb3e4d8ee', 'menu', '/administrative/organization', 'icon-organization', './Administrative/Organization', NULL, 'ce451a62-2ac4-44de-8202-cd8b0a702840', '_blank', 'administrative:organization', 'mix', 'dark', 'dark', 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 77, 1, '2022-10-27 16:33:12', '2023-01-11 10:06:35');
INSERT INTO `xmw_menu` VALUES ('e6edc216-38b7-49cd-b097-6e996a7d8316', '5073be03-8237-4fbb-9517-a10a05e6abc0', 'button', NULL, NULL, NULL, NULL, '562d45f9-e8ca-4ca4-8862-b9a44a3443cd', NULL, 'system:menu-management:delete', NULL, NULL, NULL, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2022-10-27 16:55:55', '2022-10-27 16:55:55');
INSERT INTO `xmw_menu` VALUES ('ebb8abd4-3231-4e5b-a007-0f9103bf66e7', '3d3e87e0-1072-45e6-bec2-b1080e4646d8', 'button', NULL, NULL, NULL, NULL, '562d45f9-e8ca-4ca4-8862-b9a44a3443cd', NULL, 'system:menu-management:add', NULL, NULL, NULL, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2022-10-27 16:56:08', '2022-10-27 16:56:08');
INSERT INTO `xmw_menu` VALUES ('f1eb0226-8ed7-4f80-ab42-08c27ed3f176', '67761aaf-1f58-4afa-97be-613221d397f2', 'button', NULL, NULL, NULL, NULL, '1acff778-5508-4724-b3a6-44b26396fd9e', NULL, 'system:internationalization:add-child', NULL, NULL, NULL, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2022-10-27 16:57:39', '2022-10-27 16:57:39');
INSERT INTO `xmw_menu` VALUES ('f9f168a1-a31a-4105-b80d-9c38dcf0bd59', '83e02616-bb7a-4c02-97d4-bade828025f4', 'button', NULL, NULL, NULL, NULL, '1acff778-5508-4724-b3a6-44b26396fd9e', NULL, 'system:internationalization:delete', NULL, NULL, NULL, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '2022-10-27 16:58:06', '2022-10-27 16:58:06');

-- ----------------------------
-- Table structure for xmw_organization
-- ----------------------------
DROP TABLE IF EXISTS `xmw_organization`;
CREATE TABLE `xmw_organization`  (
  `org_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组织id',
  `org_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组织名称',
  `parent_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '父级id',
  `org_code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组织编码',
  `org_type` enum('company','unit','department','team') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组织类型（company:公司,unit:单位,department:部门,team:小组）',
  `leader` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组织负责人',
  `founder` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '创建人',
  `status` int NOT NULL COMMENT '组织状态（0:禁用，1：正常）',
  `sort` int NOT NULL COMMENT '排序',
  `describe` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组织描述',
  `created_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次更新时间',
  PRIMARY KEY (`org_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xmw_organization
-- ----------------------------
INSERT INTO `xmw_organization` VALUES ('7115340c-ff89-44d1-853d-90673055a24c', '百度智能', NULL, 'BD888', 'company', '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '智能AI的研究', '2022-12-12 11:11:34', '2022-12-28 14:36:26');
INSERT INTO `xmw_organization` VALUES ('739d9e0c-b570-4bfc-a75b-67c4be1b1af7', '招商银行', NULL, 'ZS001', 'company', 'a7e1d550-c351-4d19-8873-268912f73584', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 99, '财阀', '2022-12-01 18:21:22', '2022-12-01 18:21:22');
INSERT INTO `xmw_organization` VALUES ('79581210-60b7-4c66-b6ae-14b013c3661e', '阿里巴巴', NULL, 'Alibaba', 'company', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '阿里巴巴集团控股有限公司（简称：阿里巴巴集团）是马云带领下的18位创始人于1999年在浙江省杭州市创立的公司。', '2022-09-15 15:35:08', '2022-12-01 18:19:14');
INSERT INTO `xmw_organization` VALUES ('79a4a0d6-776a-4d82-a884-57c2b59e7e94', '飞猪', '79581210-60b7-4c66-b6ae-14b013c3661e', 'Feizhu', 'company', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '全称飞猪旅行，是阿里巴巴集团旗下的综合性旅游服务平台 [2]  [4]  ，旨在让天下没有难做的旅行生意 [3]  。飞猪旅行平台上提供国内外交通、酒店住宿、景区门票、目的地游玩等产品及旅游周边服务。', '2022-11-09 13:53:21', '2022-12-01 18:19:14');
INSERT INTO `xmw_organization` VALUES ('9e0d462d-5254-41ba-b8f3-982a7cf588f0', '腾讯控股', NULL, 'Tencent', 'company', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '深圳市腾讯计算机系统有限公司成立于1998年11月，由马化腾、张志东、许晨晔、陈一丹、曾李青五位创始人共同创立。', '2022-10-21 09:49:43', '2022-12-01 18:19:14');
INSERT INTO `xmw_organization` VALUES ('bb074cdc-4aa2-42e4-a200-64bf83ed4ed5', '天猫商城', '79581210-60b7-4c66-b6ae-14b013c3661e', 'Tmall', 'unit', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 2, '“天猫”（英文：Tmall，亦称淘宝商城、天猫商城）原名淘宝商城，是一个综合性购物网站。', '2022-09-15 15:36:46', '2022-12-01 18:19:14');
INSERT INTO `xmw_organization` VALUES ('c1921e5b-8a12-4ad0-88bd-c21355765596', '微信', '9e0d462d-5254-41ba-b8f3-982a7cf588f0', 'WX001', 'department', 'a7e1d550-c351-4d19-8873-268912f73584', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '微信（WeChat）是腾讯公司于2011年1月21日推出的一个为智能终端提供即时通讯服务的免费应用程序 [1]  ，由张小龙所带领的腾讯广州研发中心产品团队打造 [2]  。', '2022-12-28 13:52:52', '2022-12-28 13:52:52');
INSERT INTO `xmw_organization` VALUES ('cb71893e-94dc-4899-90ab-286d96c3ca84', 'QQ', '9e0d462d-5254-41ba-b8f3-982a7cf588f0', 'QQ001', 'unit', '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, 'QQ，是腾讯QQ的简称，是腾讯公司推出的一款基于互联网的即时通信软件', '2022-12-28 13:51:38', '2022-12-28 13:51:38');
INSERT INTO `xmw_organization` VALUES ('e0f1144f-5892-406d-b4f0-8f17ba6e9356', '字节跳动', NULL, 'ZJTD888', 'company', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '北京字节跳动科技有限公司，成立于2012年3月，是北京的一家信息科技公司。2021年全年的营业收入约为580亿美元， [93]  地址位于北京市海淀区知春路甲48号 [1]  。公司以建设“全球创作与交流平台”为愿景 [2]  。字节跳动的全球化布局始于2015年 [3]  ，“技术出海”是字节跳动全球化发展的核心战略 [4]  ，其旗下产品有今日头条、西瓜视频、抖音、头条百科、皮皮虾、懂车帝、悟', '2023-03-20 15:41:00', '2023-03-20 15:41:00');
INSERT INTO `xmw_organization` VALUES ('f107862c-30bf-45cb-9957-5b5429e0ff20', '淘宝', '79581210-60b7-4c66-b6ae-14b013c3661e', 'Taobao', 'company', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 1, 1, '淘宝网是亚太地区较大的网络零售、商圈，由阿里巴巴集团在2003年5月创立。', '2022-09-15 15:39:08', '2022-12-01 18:19:14');

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
INSERT INTO `xmw_permission` VALUES ('03838371-7d74-473f-9259-fb7cb585fae1', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', '5bb63c89-e82a-4431-b80b-5c4e332a312e', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('08064512-5f20-4d65-9f8d-46768022d0a3', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '22b1d1f4-2543-4fa9-8d45-c04d9d239c04', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('10a5e909-a83b-4d95-af86-ecd10eddd5fe', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', 'dd8304e6-09e5-4fa8-8e56-bbefd4e69c0c', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('19a9ef6f-ae52-4d02-81bc-3e73000ada12', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '062fada5-41b0-4a90-8632-49ef932ed354', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('1d007b60-a212-4e78-b621-36cbc1e3f7e4', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '255bcf4c-cfbd-4253-9c2d-0b03805e3ff0', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('20adcd80-818e-454b-bc75-2172a9d875b7', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '6628e05a-876b-4fa1-80df-95f8becf5f7a', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('2b08574d-17b2-484e-bd2e-d68fc0bf60ad', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'adbc5cd2-b238-45b5-91a5-48324e8ae96b', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('2e97244a-6466-4985-af23-c95bb193d055', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '7688d4a8-7214-446e-96d7-b65088af0dbb', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('370d2ece-8634-4070-9543-9bf2e56e7ece', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '4e70171f-a946-47e8-a471-d8cabd04c264', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('4e7e9698-2c8c-4419-affb-82a4f063af6f', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'ce451a62-2ac4-44de-8202-cd8b0a702840', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('54cb0702-a0fe-4bf8-8e6c-c70bc93fcd40', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', 'ce451a62-2ac4-44de-8202-cd8b0a702840', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('5aaca2b9-2813-46fe-9d0f-1c77626b6948', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '12373f1b-ae2a-48e7-ac06-ad4f15bb4975', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('5fb45053-4407-4032-960c-ce4e995b0923', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '81c3b5d3-6715-49d2-a7b1-b4e3ba6b3732', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('69bd47a8-78c0-4874-a1b5-61b498e40951', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'c1a6ef88-72b0-4ddd-8179-85f7f9dc9294', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('6a7b2b80-cd3a-4b58-bcd6-397465bbd625', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '1360556e-3106-48aa-a030-90edfd7073ea', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('6ad8d350-46df-4642-b24c-5eeeed0db629', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '00d37222-d6b6-43ab-a459-b15610fdcbf3', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('6cf37a1d-7788-4e66-b3ef-2e7875d54102', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', '2e1d74aa-2356-4b26-8488-7c337ae306cc', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('6d4ba79c-40f8-4d97-9390-5910cdb34ce1', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '59a27556-69e9-4ecf-879f-fdd943fd190c', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('6e389de0-0984-4b9f-96c3-fad004dff4ae', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', '59a27556-69e9-4ecf-879f-fdd943fd190c', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('8049e62f-9207-4226-8bee-cdfe6cc20796', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '5bb63c89-e82a-4431-b80b-5c4e332a312e', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('81d79669-324d-4ac9-8b10-ecf66f4ba0a6', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', '6628e05a-876b-4fa1-80df-95f8becf5f7a', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('84ce9c0b-ad40-4601-af1a-25b0c7abc7ad', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'ebb8abd4-3231-4e5b-a007-0f9103bf66e7', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('86850a53-2074-49c7-a260-9f9a1dec8c8c', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '27d31604-2266-4eea-ab61-5577c62df04f', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('98dbdf80-6b5b-4c9a-b7ab-9ec4dbbf91be', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '84baadf6-e32c-4b90-8537-353dc9b25adc', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('9961162e-a7f4-4bcc-b25d-79fc46f0924d', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'b6b55595-9929-4036-bcd3-b6016a642f25', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('9984260d-0134-4b14-a886-a143cc6cb29e', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '17911862-bce9-4264-b541-7ee1d2c7ec13', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('a7bb624f-3f8c-4a01-8fcf-45b6912ccf42', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'f1eb0226-8ed7-4f80-ab42-08c27ed3f176', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('a83cd672-aaca-468b-ac45-435f89342d0d', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', '3787908c-3fcc-415f-83a9-a9f3701269ef', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('a90577fa-b5ba-4aed-9829-7353351ad946', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'd518e1bd-7440-4e15-b509-23353aec3205', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('b0a04275-2fd2-4803-b995-ea5a9f46eda0', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', 'd518e1bd-7440-4e15-b509-23353aec3205', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('b1462a38-58e1-4a25-bc63-5092aa982c8c', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '562d45f9-e8ca-4ca4-8862-b9a44a3443cd', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('c3be9f3c-534d-4c3a-8ab8-6c9cf5027289', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'b1945758-403e-4d90-a096-312b2b424ff3', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('c48eb6d9-2516-4c2c-8313-4186a9779b4c', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '1acff778-5508-4724-b3a6-44b26396fd9e', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('c590b0f7-b08d-476c-bfa5-321d4b69e3f0', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', '12373f1b-ae2a-48e7-ac06-ad4f15bb4975', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('c92da45d-9f02-4558-8d5c-400005a5327e', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '81d6e4a1-68e5-4b4e-bf3b-851a7adc2e03', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('ceb22b1f-b85c-4b51-89c9-723238f0451e', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', 'd6cdf288-0d59-4da8-a270-a5a49006154b', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('d27a327e-0224-4ca3-90ca-b4dbf141ec01', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'dd8304e6-09e5-4fa8-8e56-bbefd4e69c0c', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('d3fd86c3-9e44-41ae-bc09-4ec3e52922d2', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', '81d6e4a1-68e5-4b4e-bf3b-851a7adc2e03', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('d9a54c39-00ba-4e32-b2b1-02ac3ce12ae3', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'd6cdf288-0d59-4da8-a270-a5a49006154b', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('de77dcb2-bafe-4765-b534-729b95aab266', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '81abb19d-51f6-4256-a3d3-ed13a8cbd259', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('df5d9cb4-17c5-4f20-b4d2-152ddead2f95', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', '981f9c37-8775-458a-983f-23e775eae472', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('e96d9238-c84c-4816-80aa-df4a826e45cd', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '38788fd7-fcc2-4d0d-85ec-016bf5a90520', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('ec691589-4dbb-44b3-af47-a2de606bb7e9', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'b074dbaa-03d5-4897-8d05-99f72969efd7', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('f2325bf2-ed18-4f85-bb70-3ab0959d844a', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '3787908c-3fcc-415f-83a9-a9f3701269ef', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('f68ebaed-c539-4814-b3ec-43889d58fb5a', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'e6edc216-38b7-49cd-b097-6e996a7d8316', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('fb1e671f-e3c5-4fca-9ab2-3228f665f36e', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '2e1d74aa-2356-4b26-8488-7c337ae306cc', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('fb7fa8bc-d88e-4fb9-940d-483b66e462a3', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '7d221117-ec0b-407c-b0e3-af6372ac46cc', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('fc05c28b-94f9-4643-915b-3e90a1de8eb6', 'c49aeeca-bc95-444e-a437-a2d36e79def4', 'f9f168a1-a31a-4105-b80d-9c38dcf0bd59', '2023-03-17 16:44:04', '2023-03-17 16:44:04');
INSERT INTO `xmw_permission` VALUES ('fe4bfce0-7402-44a7-a6af-75859ba59372', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', '1360556e-3106-48aa-a030-90edfd7073ea', '2022-12-08 09:57:32', '2022-12-08 09:57:32');
INSERT INTO `xmw_permission` VALUES ('fffa0ada-2574-4726-a7a8-a08f4752a80a', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '981f9c37-8775-458a-983f-23e775eae472', '2023-03-17 16:44:04', '2023-03-17 16:44:04');

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
INSERT INTO `xmw_role` VALUES ('c49aeeca-bc95-444e-a437-a2d36e79def4', '超级管理员', 'Super Admin', '拥有系统全部权限。', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 99, 1, '2022-11-08 10:54:45', '2023-03-17 16:44:04');
INSERT INTO `xmw_role` VALUES ('d1ed7af5-b776-4cb9-a441-4967ad815f4b', '普通管理员', 'Ordinary Admin', '拥有系统部分权限', 'bf75a509-f90e-4a29-8bf7-470b581550f6', 88, 1, '2022-11-08 10:56:38', '2022-12-28 15:36:31');

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
  `token` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'token',
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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of xmw_user
-- ----------------------------
INSERT INTO `xmw_user` VALUES ('0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 'meixi', 'MX001', 'IqDDrMKzGqHgIOW7ya8cMQ==', '梅西', 'MX', 35, NULL, '18888888887', 'http://127.0.0.1:6688/static/image/2022-11-29/1155a249-437a-47b3-bec8-abea2a1c01c3.jpeg', '2', 1, 1, '', NULL, '[\"足球巨星\"]', '[\"44\", \"4403\", \"440304\"]', '111', 'eab6c26a-4b2a-4aba-b95f-7f431600a03d', '7115340c-ff89-44d1-853d-90673055a24c', 'd1ed7af5-b776-4cb9-a441-4967ad815f4b', '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 36, '::ffff:127.0.0.1', '2023-01-12 18:21:09', '2022-11-25 11:01:52', '2023-01-12 18:22:07');
INSERT INTO `xmw_user` VALUES ('a7e1d550-c351-4d19-8873-268912f73584', 'lizhien', 'LZE001', '+eUwGEfC9+bY+NgU22Ol4g==', '李知恩', 'IU', 18, NULL, '18888888888', 'http://react-umi-xmw.oss-cn-shenzhen.aliyuncs.com/upload/20221125/8738e98e-3fe8-4d67-8f95-f4e0cece15de.jpeg', '0', 1, 1, NULL, '韩国女歌手', '[\"可爱\", \"漂亮\"]', '[\"13\", \"1303\", \"130304\"]', '珠穆朗玛峰', '236ac4ed-6b07-4172-bb05-9986cf976045', '79a4a0d6-776a-4d82-a884-57c2b59e7e94', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 0, NULL, NULL, '2022-11-25 10:59:35', '2022-11-25 10:59:35');
INSERT INTO `xmw_user` VALUES ('bf75a509-f90e-4a29-8bf7-470b581550f6', 'admin', 'XMW001', 'IqDDrMKzGqHgIOW7ya8cMQ==', '谢明伟', 'Cyan', 18, '843348394@qq.com', '15920157932', 'http://127.0.0.1:6688/static/image/2023-01-13/5d7453ad-477c-47b9-be6e-212227710033.gif', '1', 99, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInVzZXJfaWQiOiJiZjc1YTUwOS1mOTBlLTRhMjktOGJmNy00NzBiNTgxNTUwZjYiLCJpYXQiOjE2ODEzODk0MTl9.z7TM6Do9ENRXqjXdSrAZOk4XQehL0UbG-wupWRXYHgM', '我曾踏足山巅 也曾跌落低谷 二者都使我受益良多', '[\"高富帅\", \"有钱人\", \"阳光少年\", \"真的很棒\"]', '[\"44\", \"4403\", \"440304\"]', '沙头街道', '6c93e5f3-f4e9-43be-9b00-9ba69677a2c2', '79581210-60b7-4c66-b6ae-14b013c3661e', 'c49aeeca-bc95-444e-a437-a2d36e79def4', '0b0d4594-3ef6-4bc6-b5ce-b5fc81c27995', 297, '::ffff:127.0.0.1', '2023-04-13 20:36:59', '2022-11-30 09:42:15', '2023-04-13 20:36:59');

SET FOREIGN_KEY_CHECKS = 1;