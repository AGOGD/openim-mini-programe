/**
 * 会话管理模块
 */

class ConversationManager {
  constructor(client) {
    this.client = client;
  }

  get sdk() {
    return this.client.sdk;
  }

  /**
   * 获取所有会话列表
   */
  async getAllConversationList() {
    const res = await this.sdk.getAllConversationList();
    return JSON.parse(res.data);
  }

  /**
   * 分页获取会话列表
   */
  async getConversationListSplit(offset = 0, count = 20) {
    const res = await this.sdk.getConversationListSplit({ offset, count });
    return JSON.parse(res.data);
  }

  /**
   * 获取单个会话
   */
  async getOneConversation(sessionType, sourceID) {
    const res = await this.sdk.getOneConversation({ sessionType, sourceID });
    return JSON.parse(res.data);
  }

  /**
   * 根据会话ID获取会话
   */
  async getMultipleConversation(conversationIDList) {
    const res = await this.sdk.getMultipleConversation({ conversationIDList });
    return JSON.parse(res.data);
  }

  /**
   * 删除会话
   */
  async deleteConversationAndDeleteAllMsg(conversationID) {
    return await this.sdk.deleteConversationAndDeleteAllMsg({ conversationID });
  }

  /**
   * 设置会话置顶
   */
  async pinConversation(conversationID, isPinned) {
    return await this.sdk.pinConversation({ conversationID, isPinned });
  }

  /**
   * 设置会话免打扰
   */
  async setConversationRecvMessageOpt(conversationID, opt) {
    return await this.sdk.setConversationRecvMessageOpt({ conversationID, opt });
  }

  /**
   * 获取总未读数
   */
  async getTotalUnreadMsgCount() {
    const res = await this.sdk.getTotalUnreadMsgCount();
    return res.data;
  }

  /**
   * 标记会话已读
   */
  async markConversationMessageAsRead(conversationID) {
    return await this.sdk.markConversationMessageAsRead({ conversationID });
  }
}

export default ConversationManager;
