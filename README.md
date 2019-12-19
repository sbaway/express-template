## 部署说明文档

### 使用

#### 技术栈

```
node: v12.11.0
express: v4.16.3
```

#### 开发环境

```bash
  npm i
  npm start
```

#### 项目结构

```
- document 文档
---> api.md 接口文档
---> model.sql 建表语句
- src
---> c c端接口
---> admin 管理端接口
---> app.js 项目入口
```

#### 测试账号

测试环境管理端：admin / admin123

生产环境管理端：admin / admin123

#### 生产环境部署 NODE 接口

```bash
  # 1.上传文件到生产服务器
  rsync -r ./* --exclude node_modules root@207.246.104.207:/apps/***

  # 2.安装npm包
  npm i
  npm i pm2 -g

  # 3.NOTE 修改/process.json中环境配置

  # 修改node服务运行的端口
  "NODE_PORT": 6011

  # 修改生产环境redis配置
  "REDIS_URL": "redis://localhost:6379/0", // redis链接配置：redis://:密码@host:端口/数据库序号
  "REDIS_PREFIX": "rok:session:", // redis 数据分类

  # 修改生产环境的MYSQL数据库配置
  "MYSQL_HOST": "127.0.0.1", // mysql运行的机器ip
  "MYSQL_PORT": "3306", // 端口
  "MYSQL_USER": "root", // 用户名
  "MYSQL_PASSWORD": "fuck084614", // 密码
  "MYSQL_DATABASE": "rok" // 数据库

  # 4.配置项目域名，默认是 /
  "PROJECT_HOST": "/"

  # 5.建数据库、建表
  通过/document/model.sql中的sql语句建表

  # 6.在admin表中录入管理员账号

  # 7.启动多线程node服务
  # 通过process.json启动，使用node内置的cluster模块做负载均衡
  pm2 start process.json

  # 修改process.json配置后重启项目
  pm2 delete all
  pm2 restart process.json

  # pm2 停止运行
  pm2 stop all
```

#### 生产环境部署前端静态文件

##### 前台

```
  项目的入口文件是/index.html
  通过nginx配置静态文件代理，指向`前台-web`文件夹的根目录下的index.html文件和 /static 文件夹
```

##### 管理端

```
  项目的入口文件是/*.html
  通过nginx配置静态文件代理，指向`管理端-web`文件夹的根目录
```
