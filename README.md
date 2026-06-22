# Vue2 + Element UI 后台管理系统

一个基于 Vue2 + Element UI 的后台管理系统 Demo,涵盖登录鉴权、路由守卫、角色权限控制、Dashboard 数据可视化、用户管理 CRUD、Axios 请求封装、Mock.js 接口模拟等中后台系统常见功能模块。

> 本项目为实习期间的练习项目,用于巩固 Vue2 全家桶（Vue Router / Vuex）、前后端权限设计、以及前端工程化（webpack 构建、Mock 数据驱动开发）相关知识。

##  功能特性

-  登录鉴权 + Token 持久化（localStorage）
-  路由守卫（导航前置守卫）+ 基于角色的页面权限控制
-  Dashboard 数据看板（ECharts 图表）
-  用户管理模块(列表查询 / 分页 / 新增 / 编辑 / 删除)
-  Axios 请求二次封装(统一拦截器、错误处理、401 自动登出)
-  Mock.js 模拟后端接口,无需后端即可本地完整跑通

##  技术栈

| 分类 | 技术 |
| --- | --- |
| 框架 | Vue2 |
| 路由 | Vue Router 3 |
| 状态管理 | Vuex 3 |
| UI 组件库 | Element UI |
| 请求库 | Axios |
| 图表 | ECharts |
| Mock 数据 | Mock.js |
| 构建工具 | Vue CLI 5（Webpack 5） |

##  快速开始

```bash
npm install
npm run serve
```

访问 https://ymhyyds.github.io/Zero/

### 测试账号

| 角色 | 用户名 | 密码 |
| --- | --- | --- |
| 管理员 | admin | 123456 |
| 编辑 | editor | 123456 |

##  项目目录结构

```text
├── public/
│   └── index.html
├── src/
│   ├── api/              # 接口定义
│   ├── assets/           # 静态资源
│   ├── layout/           # 整体布局（导航栏 + 侧边栏）
│   ├── mock/             # Mock.js 模拟接口
│   ├── router/           # 路由配置 + 导航守卫
│   ├── store/            # Vuex 状态管理
│   ├── utils/            # 工具函数（鉴权、权限、请求封装）
│   ├── views/            # 页面（登录 / Dashboard / 用户管理）
│   ├── App.vue
│   └── main.js
├── vue.config.js
└── package.json
```

##  开发过程中修复的问题（记录）

| 问题 | 原因 | 解决方案 |
| --- | --- | --- |
| 登录跳转时控制台报 `Redirected when going from "/login" to "/dashboard"` | 路由跳转的 `push`/`replace` 调用未捕获 vue-router 内部正常抛出的重定向错误 | 在 `router/index.js` 中重写 `push`/`replace`,统一捕获并忽略该类无害错误 |
| 登录成功后立即提示"登录已过期" | Mock.js 的 response 回调不会传入请求头(headers),导致 token 校验逻辑失效 | Mock 层改为直接从 `localStorage` 读取 token 进行校验 |
| 用户列表页报 `404` | Mock.js 对字符串 URL 做精确匹配,无法匹配带查询参数（分页）的请求地址 | 将接口 URL 改为正则匹配,兼容查询字符串 |
| Windows 下打包报 `Conflict: Multiple assets emit different content to the same filename index.html` | `CopyWebpackPlugin` 排除 `index.html` 的内部逻辑在 Windows 路径分隔符下失效 | 在 `vue.config.js` 中通过 `chainWebpack` 手动补充跨平台的排除规则 |

