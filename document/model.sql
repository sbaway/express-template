-- 创建数据库
CREATE DATABASE `rok`;

-- 建表
-- 用户表
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) NOT NULL COMMENT '用户账号',
  `account_type` int(2) NOT NULL COMMENT '账号类型 1：邮箱  2：手机号',
  `status` int(2) NOT NULL DEFAULT '1' COMMENT '用户状态 -1：待验证账号 1：账号验证完成',
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

-- 管理员表
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL COMMENT '登录账号',
  `password` varchar(255) NOT NULL COMMENT '登录密码',
  `nickname` varchar(255) DEFAULT NULL COMMENT '用户昵称',
  `status` int(2) NOT NULL DEFAULT '1' COMMENT '1: 正常  0: 删除',
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

-- 注水表
CREATE TABLE `injection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `active_number` int(11) NOT NULL DEFAULT 0,
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

-- 新闻表
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(2) NOT NULL COMMENT '新闻类型枚举值 1:お知らせ 2:アップデート 3:メンテナンス 4:イベント',
  `title` varchar(255) NOT NULL COMMENT '新闻标题',
  `content` text NOT NULL COMMENT '新闻内容',
  `publisher` varchar(50) NOT NULL COMMENT '发布者',
  `isRecommend` boolean NOT NULL DEFAULT false COMMENT '是否推荐',
  `isTop` boolean NOT NULL DEFAULT false COMMENT '是否置顶',
  `status` int(2) NOT NULL DEFAULT '1' COMMENT '1: 正常  0: 删除',
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

-- banner表
CREATE TABLE `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) COMMENT '跳转url',
  `imgUrl` varchar(255) NOT NULL COMMENT '图片url',
  `title` varchar(255) NOT NULL COMMENT 'banner标题',
  `weight` int(11) NOT NULL COMMENT 'banner权重: 1-10',
  `status` int(2) NOT NULL DEFAULT '1' COMMENT '1: 正常  0: 删除',
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

-- 视频表
CREATE TABLE `video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) COMMENT '视频地址',
  `previewImgUrl` varchar(255) NOT NULL COMMENT '视频预览图片url',
  `title` varchar(255) NOT NULL COMMENT '视频标题',
  `weight` int(11) NOT NULL COMMENT '视频权重',
  `type` varchar(30) NOT NULL COMMENT '视频类型 indexTop:首页置顶视频 indexRecommend: 首页推荐视频',
  `status` int(2) NOT NULL DEFAULT '1' COMMENT '1: 正常  0: 删除',
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

-- 问答分类表
CREATE TABLE `faq_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '分类名称',
  `weight` int(11) NOT NULL COMMENT '分类权重',
  `status` int(2) NOT NULL DEFAULT '1' COMMENT '1: 正常  0: 删除',
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

-- 问答详情表
CREATE TABLE `faq` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryId` int(11) NOT NULL COMMENT '分类Id',
  `question` varchar(255) NOT NULL COMMENT '问题',
  `anwser` text NOT NULL COMMENT '回答',
  `status` int(2) NOT NULL DEFAULT '1' COMMENT '1: 正常  0: 删除',
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

-- 操作日志表
CREATE TABLE `operation_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `operator_id` int(4) NOT NULL COMMENT '操作人id',
  `operator_account` varchar(100) NOT NULL COMMENT '操作人账号',
  `module` varchar(50) NOT NULL COMMENT '操作功能模块: 新闻 问答 banner 视频',
  `type` varchar(30) NOT NULL COMMENT '操作类型 新增：ADD 更新：UPDATE 删除：DELETE',
  `data` text COMMENT '操作数据详情',
  `operate_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

