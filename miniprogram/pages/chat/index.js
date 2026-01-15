/**
 * 聊天页
 */
import { MessageManager, ConversationManager } from '../../../src/modules';
import { formatMessageTime } from '../../../src/utils';
import { MessageType } from '../../../src/constants';

const app = getApp();

Page({
  data: {
    conversationID: '',
    name: '',
    messageList: [],
    inputValue: '',
    scrollToMessage: '',
    showMore: false,
    isLoading: false,
    hasMore: true,
  },

  messageMgr: null,
  conversationMgr: null,

  onLoad(options) {
    const { conversationID, name } = options;
    this.setData({ conversationID, name });
    
    wx.setNavigationBarTitle({ title: name });

    const client = app.getClient();
    this.messageMgr = new MessageManager(client);
    this.conversationMgr = new ConversationManager(client);
    
    this.bindEvents(client);
    this.loadMessages();
    this.markAsRead();
  },

  onUnload() {
    this.markAsRead();
  },

  onUnload() {
    this.markAsRead();
    // 移除事件监听，避免内存泄漏
    const client = app.getClient();
    if (client && this._onNewMessage) {
      client.off('newMessage', this._onNewMessage);
    }
  },

  bindEvents(client) {
    // 保存引用以便移除
    this._onNewMessage = (msg) => {
      if (msg.conversationID === this.data.conversationID) {
        this.appendMessage(msg);
        this.markAsRead();
      }
    };
    client.on('newMessage', this._onNewMessage);
  },

  async loadMessages() {
    if (this.data.isLoading || !this.data.hasMore) return;
    
    this.setData({ isLoading: true });
    
    try {
      const list = this.data.messageList;
      const startMsgID = list.length > 0 ? list[0].clientMsgID : '';
      
      const res = await this.messageMgr.getAdvancedHistoryMessageList(
        this.data.conversationID,
        startMsgID,
        20
      );

      const newList = [...res.messageList.reverse(), ...list];
      this.setData({
        messageList: newList,
        hasMore: !res.isEnd,
        isLoading: false,
      });

      if (!startMsgID && newList.length > 0) {
        this.scrollToBottom();
      }
    } catch (err) {
      console.error('加载消息失败:', err);
      this.setData({ isLoading: false });
    }
  },

  appendMessage(msg) {
    const list = [...this.data.messageList, msg];
    this.setData({ messageList: list });
    this.scrollToBottom();
  },


  scrollToBottom() {
    const list = this.data.messageList;
    if (list.length > 0) {
      this.setData({ scrollToMessage: `msg-${list[list.length - 1].clientMsgID}` });
    }
  },

  markAsRead() {
    this.conversationMgr.markConversationMessageAsRead(this.data.conversationID);
  },

  onScrollToUpper() {
    this.loadMessages();
  },

  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },

  async onSend() {
    const text = this.data.inputValue.trim();
    if (!text) return;

    this.setData({ inputValue: '' });

    try {
      const msg = await this.messageMgr.createTextMessage(text);
      const recvID = this.data.conversationID.replace('si_', '').replace('g_', '');
      const groupID = this.data.conversationID.startsWith('g_') ? recvID : '';
      
      await this.messageMgr.sendMessage(msg, groupID ? '' : recvID, groupID);
    } catch (err) {
      wx.showToast({ title: '发送失败', icon: 'none' });
    }
  },

  onMoreTap() {
    this.setData({ showMore: !this.data.showMore });
  },

  async onChooseImage() {
    try {
      const res = await wx.chooseMedia({ count: 1, mediaType: ['image'] });
      if (res.tempFiles.length > 0) {
        const path = res.tempFiles[0].tempFilePath;
        const msg = await this.messageMgr.createImageMessage(path);
        const recvID = this.data.conversationID.replace('si_', '').replace('g_', '');
        const groupID = this.data.conversationID.startsWith('g_') ? recvID : '';
        await this.messageMgr.sendMessage(msg, groupID ? '' : recvID, groupID);
      }
    } catch (err) {
      if (err.errMsg && !err.errMsg.includes('cancel')) {
        wx.showToast({ title: '发送失败', icon: 'none' });
      }
    }
    this.setData({ showMore: false });
  },

  onImageTap(e) {
    const url = e.currentTarget.dataset.url;
    wx.previewImage({ urls: [url], current: url });
  },

  onVoiceTap(e) {
    const item = e.currentTarget.dataset.item;
    if (!item?.soundElem?.sourceUrl) return;
    
    // 销毁之前的播放实例
    if (this._audioContext) {
      this._audioContext.destroy();
    }
    
    this._audioContext = wx.createInnerAudioContext();
    this._audioContext.src = item.soundElem.sourceUrl;
    this._audioContext.play();
  },

  onResend(e) {
    const item = e.currentTarget.dataset.item;
    wx.showModal({
      title: '提示',
      content: '是否重新发送该消息？',
      success: (res) => {
        if (res.confirm) {
          // 重发逻辑
        }
      },
    });
  },
});
