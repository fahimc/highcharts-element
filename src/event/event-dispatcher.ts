export interface EventConfigItem {
  eventName: string;
  dispatchOnSubscribe: boolean;
}
export class EventDispatcher {
  private subscriptions: any[];
  constructor (eventConfig?: EventConfigItem[]) {
    this.subscriptions = eventConfig ? eventConfig.map((item) => {
      return {
        ...item,
        callbacks: [],
        dispatched: false,
        currentData: null
      };
    }) : [];
  }
  public getEvent (eventName: string) {
    return this.subscriptions.find(item => item.eventName === eventName);
  }
  public subscribe (eventName: string, callback: any) {
    const eventItem = this.subscriptions.find(item => item.eventName === eventName);
    if (!eventItem) return;
    eventItem.callbacks.push(callback);
    if (eventItem.dispatchOnSubscribe && eventItem.dispatched) {
      this.dispatch(eventName, eventItem.currentData);
    }
  }
  public dispatch (eventName: string, data?: any) {
    const eventItem = this.subscriptions.find(item => item.eventName === eventName);
    if (eventItem) {
      eventItem.callbacks.forEach(callback => callback(data));
      if (eventItem.dispatchOnSubscribe) {
        eventItem.dispatched = true;
        eventItem.currentData = data;
      }
    }
  }
  public unsubscribe (callback: any, eventName: string) {
    if (this.subscriptions[eventName] && this.subscriptions[eventName].includes(callback)) {
      this.subscriptions[eventName].forEach((c,index) => {
        if (callback === c) this.subscriptions[eventName].splice(index, 1);
      });
    }
  }
}
