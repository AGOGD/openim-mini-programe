/**
 * 群组管理模块
 */

class GroupManager {
  constructor(client) {
    this.client = client;
  }

  get sdk() {
    return this.client.sdk;
  }

  /**
   * 创建群组
   */
  async createGroup(groupInfo, memberUserIDs = []) {
    const res = await this.sdk.createGroup({
      groupInfo,
      memberUserIDs,
    });
    return JSON.parse(res.data);
  }

  /**
   * 获取已加入的群列表
   */
  async getJoinedGroupList() {
    const res = await this.sdk.getJoinedGroupList();
    return JSON.parse(res.data);
  }

  /**
   * 获取群信息
   */
  async getSpecifiedGroupsInfo(groupIDList) {
    const res = await this.sdk.getSpecifiedGroupsInfo({ groupIDList });
    return JSON.parse(res.data);
  }

  /**
   * 搜索群组
   */
  async searchGroups(keywordList, isSearchGroupID = true, isSearchGroupName = true) {
    const res = await this.sdk.searchGroups({
      keywordList,
      isSearchGroupID,
      isSearchGroupName,
    });
    return JSON.parse(res.data);
  }

  /**
   * 申请加入群组
   */
  async joinGroup(groupID, reqMsg = '', joinSource = 2) {
    return await this.sdk.joinGroup({ groupID, reqMsg, joinSource });
  }

  /**
   * 退出群组
   */
  async quitGroup(groupID) {
    return await this.sdk.quitGroup({ groupID });
  }

  /**
   * 解散群组
   */
  async dismissGroup(groupID) {
    return await this.sdk.dismissGroup({ groupID });
  }

  /**
   * 修改群信息
   */
  async setGroupInfo(groupID, groupInfo) {
    return await this.sdk.setGroupInfo({ groupID, ...groupInfo });
  }

  /**
   * 获取群成员列表
   */
  async getGroupMemberList(groupID, filter = 0, offset = 0, count = 20) {
    const res = await this.sdk.getGroupMemberList({
      groupID,
      filter,
      offset,
      count,
    });
    return JSON.parse(res.data);
  }

  /**
   * 获取指定群成员信息
   */
  async getSpecifiedGroupMembersInfo(groupID, userIDList) {
    const res = await this.sdk.getSpecifiedGroupMembersInfo({
      groupID,
      userIDList,
    });
    return JSON.parse(res.data);
  }

  /**
   * 邀请用户入群
   */
  async inviteUserToGroup(groupID, userIDList, reason = '') {
    return await this.sdk.inviteUserToGroup({ groupID, userIDList, reason });
  }

  /**
   * 踢出群成员
   */
  async kickGroupMember(groupID, userIDList, reason = '') {
    return await this.sdk.kickGroupMember({ groupID, userIDList, reason });
  }

  /**
   * 转让群主
   */
  async transferGroupOwner(groupID, newOwnerUserID) {
    return await this.sdk.transferGroupOwner({ groupID, newOwnerUserID });
  }

  /**
   * 获取收到的入群申请
   */
  async getGroupApplicationListAsRecipient() {
    const res = await this.sdk.getGroupApplicationListAsRecipient();
    return JSON.parse(res.data);
  }

  /**
   * 同意入群申请
   */
  async acceptGroupApplication(groupID, fromUserID, handleMsg = '') {
    return await this.sdk.acceptGroupApplication({ groupID, fromUserID, handleMsg });
  }

  /**
   * 拒绝入群申请
   */
  async refuseGroupApplication(groupID, fromUserID, handleMsg = '') {
    return await this.sdk.refuseGroupApplication({ groupID, fromUserID, handleMsg });
  }
}

export default GroupManager;
