/**
 * 登录页
 */
const app = getApp();

Page({
  data: {
    userID: '',
    token: '',
    loading: false,
  },

  onUserIDInput(e) {
    this.setData({ userID: e.detail.value });
  },

  onTokenInput(e) {
    this.setData({ token: e.detail.value });
  },

  async onLogin() {
    const { userID, token } = this.data;

    if (!userID.trim()) {
      wx.showToast({ title: '请输入用户ID', icon: 'none' });
      return;
    }

    if (!token.trim()) {
      wx.showToast({ title: '请输入Token', icon: 'none' });
      return;
    }

    this.setData({ loading: true });

    try {
      const client = app.getClient();
      await client.init();
      await client.login({ userID: userID.trim(), token: token.trim() });

      // 保存登录信息
      wx.setStorageSync('loginInfo', { userID, token });

      wx.switchTab({ url: '/pages/conversation/index' });
    } catch (err) {
      console.error('登录失败:', err);
      wx.showToast({ title: err.message || '登录失败', icon: 'none' });
    } finally {
      this.setData({ loading: false });
    }
  },
});
