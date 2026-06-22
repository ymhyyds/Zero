# Vue2 Element UI 后台管理系统

一个可直接运行的 Vue2 + Element UI 后台管理系统示例，内置登录、路由守卫、角色权限、Dashboard 图表、用户管理 CRUD、Axios 二次封装和 Mock.js 模拟接口。

## 技术栈

- Vue2
- Vue Router
- Vuex
- Axios（二次封装）
- Element UI
- Mock.js
- ECharts

## 运行

```bash
npm install
npm run serve
```

## 测试账号

| 角色 | 用户名 | 密码 |
| --- | --- | --- |
| 管理员 | admin | 123456 |
| 编辑 | editor | 123456 |

## 项目目录结构

```text
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   ├── auth.js
│   │   └── user.js
│   ├── assets/
│   │   └── styles/
│   │       └── global.css
│   ├── layout/
│   │   ├── components/
│   │   │   ├── Navbar.vue
│   │   │   └── Sidebar.vue
│   │   └── index.vue
│   ├── mock/
│   │   ├── index.js
│   │   ├── auth.js
│   │   └── user.js
│   ├── router/
│   │   └── index.js
│   ├── store/
│   │   ├── index.js
│   │   └── modules/
│   │       └── user.js
│   ├── utils/
│   │   ├── auth.js
│   │   ├── permission.js
│   │   └── request.js
│   ├── views/
│   │   ├── dashboard/
│   │   │   └── index.vue
│   │   ├── login/
│   │   │   └── index.vue
│   │   └── users/
│   │       └── index.vue
│   ├── App.vue
│   └── main.js
├── babel.config.js
├── package.json
└── vue.config.js
```
