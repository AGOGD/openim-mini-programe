/**
 * 工具函数集合
 */

import EventEmitter from './eventEmitter';

/**
 * 格式化时间戳
 */
export function formatTime(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
  const date = new Date(timestamp);
  const map = {
    YYYY: date.getFullYear(),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    DD: String(date.getDate()).padStart(2, '0'),
    HH: String(date.getHours()).padStart(2, '0'),
    mm: String(date.getMinutes()).padStart(2, '0'),
    ss: String(date.getSeconds()).padStart(2, '0'),
  };
  
  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => map[match]);
}

/**
 * 格式化消息时间（聊天列表用）
 */
export function formatMessageTime(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const diff = now - date;
  
  // 1分钟内
  if (diff < 60 * 1000) {
    return '刚刚';
  }
  
  // 1小时内
  if (diff < 60 * 60 * 1000) {
    return `${Math.floor(diff / (60 * 1000))}分钟前`;
  }
  
  // 今天
  if (date.toDateString() === now.toDateString()) {
    return formatTime(timestamp, 'HH:mm');
  }
  
  // 昨天
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `昨天 ${formatTime(timestamp, 'HH:mm')}`;
  }
  
  // 今年
  if (date.getFullYear() === now.getFullYear()) {
    return formatTime(timestamp, 'MM-DD HH:mm');
  }
  
  return formatTime(timestamp, 'YYYY-MM-DD HH:mm');
}

/**
 * 生成唯一ID
 */
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 防抖
 */
export function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * 节流
 */
export function throttle(fn, delay = 300) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}

export { EventEmitter };

export default {
  formatTime,
  formatMessageTime,
  generateUUID,
  debounce,
  throttle,
  EventEmitter,
};
