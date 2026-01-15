/**
 * 会话列表页
 */
import { ConversationManager } from '../../../src/modules';
import { formatMessageTime } from '../../../src/utils';
import { MessageType } from '../../../src/constants';

const app = getApp();

Page({
  data: {
    conversationList: [],
    loading: true,
  },

  conversationMgr: null,

  onLoad() {
    const client = app.getClient();
    this.conversationMgr = new ConversationManager(client);
    this.bindEvents(client);
  },

  onUnload() {
    // 移除事件监听
    const client = app.getClient();
    if (client) {
      if (this._onConversationChanged) {
        client.off('conversationChanged', this._onConversationChanged);
      }
      if (this._onNewConversation) {
        client.off('newConversation', this._onNewConversation);
      }
    }
  },

  onShow() {
    this.loadConversations();
  },

  bindEvents(client) {
    this._onConversationChanged = (list) => {
      this.updateConversations(list);
    };
    this._onNewConversation = () => {
      this.loadConversations();
    };
    
    client.on('conversationChanged', this._onConversationChanged);
    client.on('newConversation', this._onNewConversation);
  },

  async loadConversations() {
    try {
      const list = await this.conversationMgr.getAllConversationList();
      this.setData({
        conversationList: this.formatList(list),
        loading: false,
      });
    } catch (err) {
      console.error('加载会话失败:', err);
      this.setData({ loading: false });
    }
  },

  formatList(list) {
    return list.map((item) => ({
      ...item,
      latestMsgSendTimeStr: formatMessageTime(item.latestMsgSendTime),
      latestMsgContent: this.getMessagePreview(item.latestMsg),
    }));
  },

  getMessagePreview(msg) {
    if (!msg) return '';
    const typeMap = {
      [MessageType.TEXT]: msg.textElem?.content || '',
      [MessageType.IMAGE]: '[图片]',
      [MessageType.AUDIO]: '[语音]',
      [MessageType.VIDEO]: '[视频]',
      [MessageType.FILE]: '[文件]',
      [MessageType.LOCATION]: '[位置]',
    };
    return typeMap[msg.contentType] || '[消息]';
  },


  updateConversations(changedList) {
    const list = [...this.data.conversationList];
    changedList.forEach((item) => {
      const index = list.findIndex((c) => c.conversationID === item.conversationID);
      if (index > -1) {
        list[index] = { ...list[index], ...item };
      }
    });
    this.setData({ conversationList: this.formatList(list) });
  },

  onConversationTap(e) {
    const { item } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/chat/index?conversationID=${item.conversationID}&name=${item.showName}`,
    });
  },

  onConversationLongPress(e) {
    const { item } = e.currentTarget.dataset;
    wx.showActionSheet({
      itemList: [item.isPinned ? '取消置顶' : '置顶', '删除会话'],
      success: async (res) => {
        if (res.tapIndex === 0) {
          await this.conversationMgr.pinConversation(item.conversationID, !item.isPinned);
        } else if (res.tapIndex === 1) {
          await this.conversationMgr.deleteConversationAndDeleteAllMsg(item.conversationID);
          this.loadConversations();
        }
      },
    });
  },

  onSearch(e) {
    const keyword = e.detail.value.trim();
    if (!keyword) {
      this.loadConversations();
      return;
    }
    const filtered = this.data.conversationList.filter((item) =>
      item.showName.includes(keyword)
    );
    this.setData({ conversationList: filtered });
  },
});
