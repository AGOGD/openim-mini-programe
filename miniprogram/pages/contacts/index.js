/**
 * 通讯录页
 */
import { FriendManager, GroupManager } from '../../../src/modules';

const app = getApp();

Page({
  data: {
    friendList: [],
    friendRequestCount: 0,
  },

  friendMgr: null,

  onLoad() {
    const client = app.getClient();
    this.friendMgr = new FriendManager(client);
  },

  onShow() {
    this.loadFriends();
    this.loadFriendRequests();
  },

  async loadFriends() {
    try {
      const list = await this.friendMgr.getFriendList();
      this.setData({ friendList: list });
    } catch (err) {
      console.error('加载好友失败:', err);
    }
  },

  async loadFriendRequests() {
    try {
      const list = await this.friendMgr.getFriendApplicationListAsRecipient();
      const unhandled = list.filter((item) => item.handleResult === 0);
      this.setData({ friendRequestCount: unhandled.length });
    } catch (err) {
      console.error('加载好友申请失败:', err);
    }
  },

  onSearch(e) {
    const keyword = e.detail.value.trim().toLowerCase();
    if (!keyword) {
      this.loadFriends();
      return;
    }
    const filtered = this.data.friendList.filter((item) =>
      (item.nickname || '').toLowerCase().includes(keyword) ||
      (item.remark || '').toLowerCase().includes(keyword)
    );
    this.setData({ friendList: filtered });
  },

  onFriendTap(e) {
    const { item } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/chat/index?conversationID=si_${item.userID}&name=${item.remark || item.nickname}`,
    });
  },

  onNewFriendTap() {
    wx.navigateTo({ url: '/pages/friend-request/index' });
  },

  onGroupListTap() {
    wx.navigateTo({ url: '/pages/group-list/index' });
  },
});
