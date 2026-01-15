/**
 * 好友管理模块
 */

class FriendManager {
  constructor(client) {
    this.client = client;
  }

  get sdk() {
    return this.client.sdk;
  }

  /**
   * 获取好友列表
   */
  async getFriendList() {
    const res = await this.sdk.getFriendList();
    return JSON.parse(res.data);
  }

  /**
   * 获取指定好友信息
   */
  async getDesignatedFriendsInfo(userIDList) {
    const res = await this.sdk.getDesignatedFriendsInfo({ userIDList });
    return JSON.parse(res.data);
  }

  /**
   * 检查是否是好友
   */
  async checkFriend(userIDList) {
    const res = await this.sdk.checkFriend({ userIDList });
    return JSON.parse(res.data);
  }

  /**
   * 添加好友
   */
  async addFriend(toUserID, reqMsg = '') {
    return await this.sdk.addFriend({ toUserID, reqMsg });
  }

  /**
   * 获取收到的好友申请
   */
  async getFriendApplicationListAsRecipient() {
    const res = await this.sdk.getFriendApplicationListAsRecipient();
    return JSON.parse(res.data);
  }

  /**
   * 获取发出的好友申请
   */
  async getFriendApplicationListAsApplicant() {
    const res = await this.sdk.getFriendApplicationListAsApplicant();
    return JSON.parse(res.data);
  }

  /**
   * 同意好友申请
   */
  async acceptFriendApplication(toUserID, handleMsg = '') {
    return await this.sdk.acceptFriendApplication({ toUserID, handleMsg });
  }

  /**
   * 拒绝好友申请
   */
  async refuseFriendApplication(toUserID, handleMsg = '') {
    return await this.sdk.refuseFriendApplication({ toUserID, handleMsg });
  }

  /**
   * 删除好友
   */
  async deleteFriend(friendUserID) {
    return await this.sdk.deleteFriend({ friendUserID });
  }

  /**
   * 设置好友备注
   */
  async setFriendRemark(toUserID, remark) {
    return await this.sdk.setFriendRemark({ toUserID, remark });
  }

  /**
   * 添加黑名单
   */
  async addBlack(toUserID) {
    return await this.sdk.addBlack({ toUserID });
  }

  /**
   * 移除黑名单
   */
  async removeBlack(toUserID) {
    return await this.sdk.removeBlack({ toUserID });
  }

  /**
   * 获取黑名单列表
   */
  async getBlackList() {
    const res = await this.sdk.getBlackList();
    return JSON.parse(res.data);
  }
}

export default FriendManager;
