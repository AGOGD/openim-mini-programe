/**
 * OpenIM 常量定义
 */

// 消息类型
export const MessageType = {
  TEXT: 101,           // 文本消息
  IMAGE: 102,          // 图片消息
  AUDIO: 103,          // 语音消息
  VIDEO: 104,          // 视频消息
  FILE: 105,           // 文件消息
  AT_TEXT: 106,        // @消息
  MERGER: 107,         // 合并消息
  CARD: 108,           // 名片消息
  LOCATION: 109,       // 位置消息
  CUSTOM: 110,         // 自定义消息
  REVOKE: 111,         // 撤回消息
  QUOTE: 114,          // 引用消息
  FACE: 115,           // 表情消息
};

// 会话类型
export const SessionType = {
  SINGLE: 1,           // 单聊
  GROUP: 3,            // 群聊
  NOTIFICATION: 4,     // 通知
};

// 消息状态
export const MessageStatus = {
  SENDING: 1,          // 发送中
  SUCCESS: 2,          // 发送成功
  FAILED: 3,           // 发送失败
};

// 连接状态
export const ConnectStatus = {
  CONNECTING: 0,       // 连接中
  CONNECTED: 1,        // 已连接
  DISCONNECTED: 2,     // 已断开
  RECONNECTING: 3,     // 重连中
};

// 平台类型
export const PlatformType = {
  IOS: 1,
  ANDROID: 2,
  WINDOWS: 3,
  MAC: 4,
  WEB: 5,
  MINI_PROGRAM: 6,     // 小程序
  LINUX: 7,
};

export default {
  MessageType,
  SessionType,
  MessageStatus,
  ConnectStatus,
  PlatformType,
};
