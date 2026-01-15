/**
 * 小程序入口
 */
import { getClient } from '../src/index';

App({
  globalData: {
    client: null,
    userInfo: null,
    isConnected: false,
  },

  onLaunch() {
    this.initOpenIM();
  },

  initOpenIM() {
    const client = getClient({
      wsAddr: 'ws://your-server:10001',
      apiAddr: 'http://your-server:10002',
    });

    client.on('connectStatusChanged', (status) => {
      this.globalData.isConnected = status === 1;
    });

    client.on('kickedOffline', () => {
      wx.showModal({
        title: '提示',
        content: '您的账号在其他设备登录',
        showCancel: false,
        success: () => {
          wx.reLaunch({ url: '/pages/login/index' });
        },
      });
    });

    this.globalData.client = client;
  },

  getClient() {
    return this.globalData.client;
  },
});
