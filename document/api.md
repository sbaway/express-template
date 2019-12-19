### express-server 接口文档

> 接口说明 content-type: application-json

> 错误码 1001002：登录失效

#### 管理端

1.登录 `post` /api/admin/user/login

请求:

```json
{
  "username": String,
  "password": String
}
```

响应:

```json
{
  "data": null,
  "isSuccess": true,
  "code": 200
}
```

2.退出登录 `post` /api/admin/user/logout

响应:

```json
{
  "data": null,
  "isSuccess": true,
  "code": 200
}
```

3.注水 `post` /api/admin/backup/injection

请求:

```json
{
  "activeNumber": Number
}
```

响应:

```json
{
  "data": null,
  "isSuccess": true,
  "code": 200
}
```

4.获取注册人数列表 `get` /api/admin/register/list

请求:

```json
{
  "pageNum": Number,
  "pageSize": Number
}
```

响应:

```json
{
  "data": {
    "items": [
      {
        "id": Number,
        "email": String
      }
    ],
    "pageInfo": {
      "pageSize": Number,
      "pageNum": Number,
      "total": Number
    }
  },
  "isSuccess": true,
  "code": 200
}
```

5.获取注册数据 `get` /api/admin/register/count

```json
{
  "isSuccess": true,
  "code": 200,
  "data": {
    "realCount": 3, // 实际注册数
    "totalCount": 64 // 总注册数
  }
}
```

#### 前台

1.注册 `post` /api/c/user/register

请求:

```json
{
  "type": Enum, // 枚举值 1: 邮箱注册 2:手机号注册
  "account": String
}
```

响应:

```json
{
  "data": null,
  "isSuccess": true,
  "code": 200
}
```

2.获取注册人数 `get` /api/c/register/count

响应:

```json
{
  "data": {
    "count": Number // 注册人数
  },
  "isSuccess": true,
  "code": 200
}
```
