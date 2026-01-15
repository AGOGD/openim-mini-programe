/**
 * OpenIM 客户端核心类
 * 封装 SDK 的初始化、登录、消息收发等功能
 */

import { getSDK } from '@openim/client-sdk';
import EventEmitter from '../utils/eventEmitter';
import { ConnectStatus, PlatformType } from '../constants';

class OpenIMClient extends EventEmitter {
  constructor(config = {}) {
    super();
    this.sdk = null;
    this.config = {
      wsAddr: '',
      apiAddr: '',
      platformID: PlatformType.MINI_PROGRAM,
      ...config,
    };
    this.connectStatus = ConnectStatus.DISCONNECTED;
    this.loginInfo = null;
  }

  /**
   * 初始化 SDK
   */
  async init() {
    if (this.sdk) {
      console.warn('[OpenIM] SDK 已初始化');
      return this.sdk;
    }

    const { wsAddr, apiAddr, platformID } = this.config;
    
    if (!wsAddr || !apiAddr) {
      throw new Error('[OpenIM] wsAddr 和 apiAddr 不能为空');
    }

    this.sdk = getSDK({
      wsAddr,
      apiAddr,
      platformID,
    });

    this._bindListeners();
    return this.sdk;
  }

  /**
   * 绑定 SDK 事件监听
   */
  _bindListeners() {
    if (!this.sdk) return;

    // 连接状态变化
    this.sdk.on('onConnecting', () => {
      this.connectStatus = ConnectStatus.CONNECTING;
      this.emit('connectStatusChanged', ConnectStatus.CONNECTING);
    });

    this.sdk.on('onConnectSuccess', () => {
      this.connectStatus = ConnectStatus.CONNECTED;
      this.emit('connectStatusChanged', ConnectStatus.CONNECTED);
    });

    this.sdk.on('onConnectFailed', (err) => {
      this.connectStatus = ConnectStatus.DISCONNECTED;
      this.emit('connectStatusChanged', ConnectStatus.DISCONNECTED);
      this.emit('error', err);
    });

    this.sdk.on('onKickedOffline', () => {
      this.emit('kickedOffline');
    });

    this.sdk.on('onUserTokenExpired', () => {
      this.emit('tokenExpired');
    });

    // 消息相关
    this.sdk.on('onRecvNewMessage', (msg) => {
      this.emit('newMessage', JSON.parse(msg));
    });

    this.sdk.on('onRecvNewMessages', (msgs) => {
      this.emit('newMessages', JSON.parse(msgs));
    });

    // 会话相关
    this.sdk.on('onConversationChanged', (data) => {
      this.emit('conversationChanged', JSON.parse(data));
    });

    this.sdk.on('onNewConversation', (data) => {
      this.emit('newConversation', JSON.parse(data));
    });

    this.sdk.on('onTotalUnreadMessageCountChanged', (count) => {
      this.emit('unreadCountChanged', count);
    });
  }


  /**
   * 登录
   * @param {Object} params - 登录参数
   * @param {string} params.userID - 用户ID
   * @param {string} params.token - 用户token
   */
  async login({ userID, token }) {
    if (!this.sdk) {
      await this.init();
    }

    if (!userID || !token) {
      throw new Error('[OpenIM] userID 和 token 不能为空');
    }

    this.loginInfo = { userID, token };
    
    try {
      await this.sdk.login({ userID, token });
      return true;
    } catch (err) {
      this.loginInfo = null;
      throw err;
    }
  }

  /**
   * 登出
   */
  async logout() {
    if (!this.sdk) return;
    
    try {
      await this.sdk.logout();
    } finally {
      this.loginInfo = null;
      this.connectStatus = ConnectStatus.DISCONNECTED;
    }
  }

  /**
   * 获取当前登录用户信息
   */
  async getSelfUserInfo() {
    if (!this.sdk) throw new Error('[OpenIM] SDK 未初始化');
    const res = await this.sdk.getSelfUserInfo();
    return JSON.parse(res.data);
  }

  /**
   * 获取连接状态
   */
  getConnectStatus() {
    return this.connectStatus;
  }

  /**
   * 是否已登录
   */
  isLoggedIn() {
    return this.connectStatus === ConnectStatus.CONNECTED && this.loginInfo !== null;
  }

  /**
   * 销毁实例
   */
  destroy() {
    this.logout();
    this.removeAllListeners();
    this.sdk = null;
  }
}

export default OpenIMClient;
