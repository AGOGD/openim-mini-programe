/**
 * 个人中心页
 */
const app = getApp();

Page({
  data: {
    userInfo: {},
  },

  onLoad() {
    this.loadUserInfo();
  },

  onShow() {
    this.loadUserInfo();
  },

  async loadUserInfo() {
    try {
      const client = app.getClient();
      const userInfo = await client.getSelfUserInfo();
      this.setData({ userInfo });
    } catch (err) {
      console.error('获取用户信息失败:', err);
    }
  },

  onUserInfoTap() {
    wx.navigateTo({ url: '/pages/user-info/index' });
  },

  onSettingTap() {
    wx.navigateTo({ url: '/pages/setting/index' });
  },

  onAboutTap() {
    wx.navigateTo({ url: '/pages/about/index' });
  },

  onLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            const client = app.getClient();
            await client.logout();
            wx.reLaunch({ url: '/pages/login/index' });
          } catch (err) {
            wx.showToast({ title: '退出失败', icon: 'none' });
          }
        }
      },
    });
  },
});
