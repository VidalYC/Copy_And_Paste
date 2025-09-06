export class EventBus {
  constructor() {
    this.events = new Map();
  }

  on(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(callback);
  }

  off(eventName, callback) {
    if (!this.events.has(eventName)) return;
    
    const callbacks = this.events.get(eventName);
    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }

  emit(eventName, data = {}) {
    if (!this.events.has(eventName)) return;
    
    this.events.get(eventName).forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error en event handler para ${eventName}:`, error);
      }
    });
  }

  clear(eventName) {
    if (eventName) {
      this.events.delete(eventName);
    } else {
      this.events.clear();
    }
  }
}