/**
 * OpenIM 小程序客户端模块
 * 提供即时通讯功能的封装，方便其他项目集成
 */

import OpenIMClient from './core/client';
import { MessageType, SessionType, MessageStatus } from './constants';
import * as utils from './utils';

// 导出客户端类
export { OpenIMClient };

// 导出常量
export { MessageType, SessionType, MessageStatus };

// 导出工具函数
export { utils };

// 默认导出客户端实例（单例模式）
let defaultClient = null;

export function getClient(config) {
  if (!defaultClient) {
    defaultClient = new OpenIMClient(config);
  }
  return defaultClient;
}

export function resetClient() {
  if (defaultClient) {
    defaultClient.logout();
    defaultClient = null;
  }
}

export default {
  OpenIMClient,
  getClient,
  resetClient,
  MessageType,
  SessionType,
  MessageStatus,
  utils,
};
