/**
 * 简单的事件发射器
 * 用于组件间通信
 */

class EventEmitter {
  constructor() {
    this._events = new Map();
  }

  /**
   * 监听事件
   */
  on(event, listener) {
    if (!this._events.has(event)) {
      this._events.set(event, []);
    }
    this._events.get(event).push(listener);
    return this;
  }

  /**
   * 监听一次
   */
  once(event, listener) {
    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      listener.apply(this, args);
    };
    onceWrapper._originalListener = listener;
    return this.on(event, onceWrapper);
  }

  /**
   * 移除监听
   */
  off(event, listener) {
    if (!this._events.has(event)) return this;
    
    if (!listener) {
      this._events.delete(event);
      return this;
    }

    const listeners = this._events.get(event);
    const index = listeners.findIndex(
      (l) => l === listener || l._originalListener === listener
    );
    
    if (index !== -1) {
      listeners.splice(index, 1);
    }
    
    if (listeners.length === 0) {
      this._events.delete(event);
    }
    
    return this;
  }

  /**
   * 触发事件
   */
  emit(event, ...args) {
    if (!this._events.has(event)) return false;
    
    const listeners = this._events.get(event).slice();
    listeners.forEach((listener) => {
      try {
        listener.apply(this, args);
      } catch (err) {
        console.error(`[EventEmitter] Error in ${event} listener:`, err);
      }
    });
    
    return true;
  }

  /**
   * 移除所有监听
   */
  removeAllListeners(event) {
    if (event) {
      this._events.delete(event);
    } else {
      this._events.clear();
    }
    return this;
  }
}

export default EventEmitter;
