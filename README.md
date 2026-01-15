# OpenIM 小程序客户端

基于 `@openim/client-sdk` 封装的微信小程序即时通讯模块，提供完整的 UI 界面和功能封装。

## 功能特性

- 会话列表、聊天界面、通讯录、个人中心
- 支持文本、图片、语音、视频、位置等消息类型
- 好友管理、群组管理
- 消息已读、置顶、免打扰等功能

## 项目结构

```
openim-mini-programe/
├── src/                    # SDK 封装层（可独立使用）
│   ├── index.js            # 入口
│   ├── constants/          # 常量
│   ├── core/client.js      # 核心客户端
│   ├── modules/            # 功能模块
│   └── utils/              # 工具函数
├── miniprogram/            # 小程序 UI
│   ├── app.js/json/wxss    # 小程序入口
│   ├── pages/              # 页面
│   │   ├── login/          # 登录页
│   │   ├── conversation/   # 会话列表
│   │   ├── chat/           # 聊天页
│   │   ├── contacts/       # 通讯录
│   │   └── profile/        # 个人中心
│   └── components/         # 组件
│       └── message-item/   # 消息组件
└── project.config.json     # 小程序配置
```

## 使用方式

### 1. 完整小程序

1. 用微信开发者工具打开项目
2. 修改 `project.config.json` 中的 `appid`
3. 修改 `miniprogram/app.js` 中的服务器地址
4. 构建 npm 并运行

### 2. 仅使用 SDK 封装

```javascript
import { getClient, MessageType } from 'openim-mini-programe';
import { MessageManager } from 'openim-mini-programe/modules';

const client = getClient({
  wsAddr: 'ws://your-server:10001',
  apiAddr: 'http://your-server:10002',
});

await client.init();
await client.login({ userID: 'user123', token: 'your-token' });

client.on('newMessage', (msg) => console.log('新消息:', msg));
```

## 配置说明

在 `miniprogram/app.js` 中配置服务器地址：

```javascript
const client = getClient({
  wsAddr: 'ws://your-server:10001',   // WebSocket 地址
  apiAddr: 'http://your-server:10002', // API 地址
});
```
