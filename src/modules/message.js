/**
 * 消息管理模块
 */

import { MessageType } from '../constants';

class MessageManager {
  constructor(client) {
    this.client = client;
  }

  get sdk() {
    return this.client.sdk;
  }

  /**
   * 创建文本消息
   */
  async createTextMessage(text) {
    const res = await this.sdk.createTextMessage({ text });
    return JSON.parse(res.data);
  }

  /**
   * 创建图片消息
   */
  async createImageMessage(imagePath) {
    const res = await this.sdk.createImageMessageFromFullPath({ 
      imageFullPath: imagePath 
    });
    return JSON.parse(res.data);
  }

  /**
   * 创建语音消息
   */
  async createSoundMessage(soundPath, duration) {
    const res = await this.sdk.createSoundMessageFromFullPath({
      soundPath,
      duration,
    });
    return JSON.parse(res.data);
  }

  /**
   * 创建视频消息
   */
  async createVideoMessage(videoPath, videoType, duration, snapshotPath) {
    const res = await this.sdk.createVideoMessageFromFullPath({
      videoFullPath: videoPath,
      videoType,
      duration,
      snapshotFullPath: snapshotPath,
    });
    return JSON.parse(res.data);
  }

  /**
   * 创建自定义消息
   */
  async createCustomMessage(data, extension = '', description = '') {
    const res = await this.sdk.createCustomMessage({
      data: JSON.stringify(data),
      extension,
      description,
    });
    return JSON.parse(res.data);
  }

  /**
   * 创建@消息
   */
  async createAtTextMessage(text, atUserIDList, atUsersInfo) {
    const res = await this.sdk.createTextAtMessage({
      text,
      atUserIDList,
      atUsersInfo,
    });
    return JSON.parse(res.data);
  }

  /**
   * 创建引用消息
   */
  async createQuoteMessage(text, message) {
    const res = await this.sdk.createQuoteMessage({
      text,
      message: JSON.stringify(message),
    });
    return JSON.parse(res.data);
  }

  /**
   * 发送消息
   */
  async sendMessage(message, recvID, groupID = '', offlinePushInfo = null) {
    const params = {
      message: JSON.stringify(message),
      recvID,
      groupID,
    };
    
    if (offlinePushInfo) {
      params.offlinePushInfo = offlinePushInfo;
    }

    const res = await this.sdk.sendMessage(params);
    return JSON.parse(res.data);
  }

  /**
   * 获取历史消息
   */
  async getAdvancedHistoryMessageList(conversationID, startClientMsgID = '', count = 20) {
    const res = await this.sdk.getAdvancedHistoryMessageList({
      conversationID,
      startClientMsgID,
      count,
    });
    return JSON.parse(res.data);
  }

  /**
   * 撤回消息
   */
  async revokeMessage(conversationID, clientMsgID) {
    return await this.sdk.revokeMessage({ conversationID, clientMsgID });
  }

  /**
   * 删除消息
   */
  async deleteMessage(conversationID, clientMsgID) {
    return await this.sdk.deleteMessage({ conversationID, clientMsgID });
  }

  /**
   * 搜索本地消息
   */
  async searchLocalMessages(params) {
    const res = await this.sdk.searchLocalMessages(params);
    return JSON.parse(res.data);
  }

  /**
   * 获取消息类型描述
   */
  getMessageTypeText(contentType) {
    const typeMap = {
      [MessageType.TEXT]: '文本',
      [MessageType.IMAGE]: '[图片]',
      [MessageType.AUDIO]: '[语音]',
      [MessageType.VIDEO]: '[视频]',
      [MessageType.FILE]: '[文件]',
      [MessageType.AT_TEXT]: '@消息',
      [MessageType.LOCATION]: '[位置]',
      [MessageType.CARD]: '[名片]',
      [MessageType.CUSTOM]: '[自定义消息]',
      [MessageType.REVOKE]: '撤回了一条消息',
      [MessageType.QUOTE]: '[引用]',
    };
    return typeMap[contentType] || '[未知消息]';
  }
}

export default MessageManager;
