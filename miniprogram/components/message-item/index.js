/**
 * 消息项组件
 */
Component({
  properties: {
    message: { type: Object, value: {} },
    selfUserID: { type: String, value: '' },
    selfFaceUrl: { type: String, value: '' },
    showName: { type: Boolean, value: false },
  },

  data: {
    playing: false,
  },

  computed: {},

  lifetimes: {
    attached() {
      this.audioContext = null;
    },
    detached() {
      if (this.audioContext) {
        this.audioContext.destroy();
      }
    },
  },

  methods: {
    onAvatarTap() {
      this.triggerEvent('avatarTap', { userID: this.data.message.sendID });
    },

    onImageTap() {
      const url = this.data.message.pictureElem?.sourcePicture?.url;
      if (url) {
        wx.previewImage({ urls: [url], current: url });
      }
    },

    onVoiceTap() {
      const soundElem = this.data.message.soundElem;
      if (!soundElem?.sourceUrl) return;

      if (this.audioContext) {
        this.audioContext.destroy();
      }

      this.audioContext = wx.createInnerAudioContext();
      this.audioContext.src = soundElem.sourceUrl;
      
      this.audioContext.onPlay(() => this.setData({ playing: true }));
      this.audioContext.onEnded(() => this.setData({ playing: false }));
      this.audioContext.onError(() => this.setData({ playing: false }));
      
      this.audioContext.play();
    },

    onVideoTap() {
      const videoElem = this.data.message.videoElem;
      if (videoElem?.videoUrl) {
        wx.previewMedia({
          sources: [{ url: videoElem.videoUrl, type: 'video' }],
        });
      }
    },

    onLocationTap() {
      const loc = this.data.message.locationElem;
      if (loc) {
        wx.openLocation({
          latitude: loc.latitude,
          longitude: loc.longitude,
          name: loc.description,
        });
      }
    },

    onLongPress() {
      this.triggerEvent('longPress', { message: this.data.message });
    },

    onResend() {
      this.triggerEvent('resend', { message: this.data.message });
    },
  },
});
