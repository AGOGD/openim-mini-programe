/**
 * 基础使用示例
 */

import { getClient, MessageType } from 'openim-mini-programe';
import { ConversationManager, MessageManager } from 'openim-mini-programe/modules';

// 配置
const config = {
  wsAddr: 'ws://your-server:10001',
  apiAddr: 'http://your-server:10002',
};

async function main() {
  // 1. 获取客户端实例
  const client = getClient(config);

  // 2. 初始化
  await client.init();

  // 3. 监听事件
  client.on('connectStatusChanged', (status) => {
    console.log('连接状态变化:', status);
  });

  client.on('newMessage', (msg) => {
    console.log('收到新消息:', msg);
  });

  client.on('kickedOffline', () => {
    console.log('被踢下线');
  });

  // 4. 登录
  await client.login({
    userID: 'user123',
    token: 'your-token',
  });

  // 5. 使用功能模块
  const conversationMgr = new ConversationManager(client);
  const messageMgr = new MessageManager(client);

  // 获取会话列表
  const conversations = await conversationMgr.getAllConversationList();
  console.log('会话列表:', conversations);

  // 发送文本消息
  const textMsg = await messageMgr.createTextMessage('Hello OpenIM!');
  await messageMgr.sendMessage(textMsg, 'targetUserID');

  // 6. 登出
  await client.logout();
}

main().catch(console.error);
